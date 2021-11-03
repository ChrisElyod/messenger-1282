const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const UserConversation = require("./user_conversation");
const UserReadMessage = require("./read_messages")

// associations

/**
 * For implementation of group conversations, it goes from a one to many to a many to many relationship.
 * 
 * Remove lines 17-19 and uncomment the belongsToMany methods below
 * 
 */
// Conversation.belongsToMany(User, { through: UserConversation, foreignKey: "fk_userConversation" })
// User.belongsToMany(Conversation, { through: UserConversation, foreignKey: "fk_conversationUser" })

User.hasMany(Conversation);
Conversation.belongsTo(User, { as: "user1" });
Conversation.belongsTo(User, { as: "user2" });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

/**
 * The below one to many relationship would be created due to addition of user_read_message table/model.
 * This would eliminate the need for each message to have an array in a column, and would only result 
 * in data when there is the relative rows present in the user_read_message table
 */
// UserReadMessage.belongsTo(Message);
// Message.hasMany(UserReadMessage);

module.exports = {
  User,
  Conversation,
  Message,
  UserConversation,
  UserReadMessage
};
