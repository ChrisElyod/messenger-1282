const Sequelize = require("sequelize");
const User = require("./user");
const Conversation = require("./conversation");
const db = require("../db");

const UserConversation = db.define("user_conversation", {
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "id"
    }
  },
  conversationId: {
    type: Sequelize.INTEGER,
    references: {
      model: Conversation,
      key: "id"
    }
  }
});

module.exports = UserConversation;