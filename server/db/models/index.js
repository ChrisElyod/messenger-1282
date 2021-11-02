const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const UserConversation = require("./user_conversation");

// associations

/**
 * For implementation of group conversations, it goes from a one to many to a many to many relationship.
 * 
 * Remove lines 17-19 and uncomment the belongsToMany methods below
 * 
 */
// Conversation.belongsToMany(User, { through: UserConversation })
// User.belongsToMany(Conversation, { through: UserConversation })

User.hasMany(Conversation);
Conversation.belongsTo(User, { as: "user1" });
Conversation.belongsTo(User, { as: "user2" });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

module.exports = {
  User,
  Conversation,
  Message,
  UserConversation
};
