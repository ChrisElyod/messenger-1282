// const Sequelize = require("sequelize");
const { Op, DataTypes } = require("sequelize");
const db = require("../db");
const Message = require("./message");

const Conversation = db.define("conversation", {
  name: {
    type: DataTypes.STRING,
  }
});

// find conversation given two user Ids

Conversation.findConversation = async function (user1Id, user2Id) {
  const conversation = await Conversation.findOne({
    where: {
      user1Id: {
        [Op.or]: [user1Id, user2Id]
      },
      user2Id: {
        [Op.or]: [user1Id, user2Id]
      }
    }
  });

  // return conversation or null if it doesn't exist
  return conversation;
};

Conversation.findConversationWithId = async (convoId, userId) => {
  const conversation = await Conversation.findOne({
    where: {
      id: convoId,
      [Op.or]: [
        {
          user1Id: userId
        },
        {
          user2Id: userId
        }
      ]
    }
  });

  return conversation;
}

Conversation.updateConversation = async (convoId, userId) => {
  const updatedMessages = await Message.update({ isRead: true }, {
    where: {
      conversationId: convoId,
      senderId: {
        [Op.not]: userId
      },
      isRead: false
    },
    returning: true,
  });

  return updatedMessages;
}

module.exports = Conversation;
