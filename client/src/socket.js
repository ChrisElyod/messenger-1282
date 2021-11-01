import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  setMessagesRead
} from "./store/conversations";
import { addReadMessage } from "./store/utils/thunkCreators";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("new-message", async (data) => {
    store.dispatch(setNewMessage(data.message, data.sender));

    const { activeConversation } = store.getState();
    if (activeConversation === data.message.senderId) {
      store.dispatch(addReadMessage(data.message.conversationId, data.message.senderId))
      return;
    };
    
  });
  socket.on("read-message", (data) => {
    const currentState = store.getState();
    if (currentState.conversations.find(conversation => conversation.id === data.conversationId)) {
      store.dispatch(setMessagesRead(data.conversationId, data.userId));
    }
  })
});

export default socket;
