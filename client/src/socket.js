import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
} from "./store/conversations";
import { fetchConversations, addReadMessage } from "./store/utils/thunkCreators";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("new-message", (data) => {
    const { activeConversation } = store.getState()
    if (activeConversation === data.message.senderId) {
      store.dispatch(addReadMessage(data.message.conversationId))
      return;
    };
    store.dispatch(setNewMessage(data.message, data.sender));
  });
  socket.on("read-message", (conversationId) => {
    const currentState = store.getState();
    if (currentState.conversations.find(conversation => conversation.id === conversationId)) {
      store.dispatch(fetchConversations());
    }
  })
});

export default socket;
