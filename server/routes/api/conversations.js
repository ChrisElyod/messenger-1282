const router = require("express").Router();
const { User, Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");
const onlineUsers = require("../../onlineUsers");

// get all conversations for a user, include latest message text for preview, and all messages
// include other user model so we have info on username/profile pic (don't include current user info)
router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: {
          user1Id: userId,
          user2Id: userId,
        },
      },
      attributes: ["id", "updatedAt"],
      include: [
        { model: Message },
        {
          model: User,
          as: "user1",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
        {
          model: User,
          as: "user2",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
      ],
      order: [
        ["updatedAt", "DESC"],
        [Message, "createdAt"]
      ],
    });

    for (let i = 0; i < conversations.length; i++) {
      const convo = conversations[i];
      const convoJSON = convo.toJSON();

      // set a property "otherUser" so that frontend will have easier access
      if (convoJSON.user1) {
        convoJSON.otherUser = convoJSON.user1;
        delete convoJSON.user1;
      } else if (convoJSON.user2) {
        convoJSON.otherUser = convoJSON.user2;
        delete convoJSON.user2;
      }

      // set property for online status of the other user
      if (onlineUsers.includes(convoJSON.otherUser.id)) {
        convoJSON.otherUser.online = true;
      } else {
        convoJSON.otherUser.online = false;
      }

      // gets the number of unread messages for initial render
      convoJSON.unreadMessages = convoJSON.messages.reduce((previousValue, currentMessage) => {
        const shouldAdd = currentMessage.isRead || currentMessage.senderId === userId ? 0 : 1;
        return previousValue + shouldAdd;
      }, 0);

      // set properties for notification count and latest message preview
      convoJSON.latestMessageText = convoJSON.messages[convoJSON.messages.length - 1].text;
      conversations[i] = convoJSON;
    }

    res.json(conversations);
  } catch (error) {
    next(error);
  }
});

// Updates a message by conversation ID where the sender is not the person that's viewed the message 
router.patch("/:convoId", async (req, res, next) => {
  if (!req.user) {
    return res.sendStatus(401);
  }

  try {
    const { convoId } = req.params;

    if (!convoId) {
      res.status(400).send({ message: "convoId is required" });
    }

    const userId = req.user.id;

    const updatedMessages = await Message.update({ isRead: true }, {
      where: {
        conversationId: convoId,
        senderId: {
          [Op.not]: userId
        },
        isRead: false
      },
      returning: true,
    })

    res.json({ updatedMessages: updatedMessages[0] });
  } catch(error) {
    next(error);
  }
});

module.exports = router;
