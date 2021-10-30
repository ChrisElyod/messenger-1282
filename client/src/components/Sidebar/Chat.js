import React from "react";
import { Badge } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";
import { addReadMessage } from "../../store/utils/thunkCreators";
import { styled } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.spacing(1),
    height: theme.spacing(10),
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: theme.spacing(1.25),
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab"
    }
  }
}));

const StyledBadge = styled(Badge)(({theme}) => ({
  '& > .MuiBadge-badge': {
    top: theme.spacing(5),
    right: theme.spacing(3)
  }
}));

const Chat = (props) => {
  const classes = useStyles();
  const { conversation, setActiveChat, addReadMessage } = props;
  const { otherUser } = conversation;

  const handleClick = async (conversation) => {
    await setActiveChat(conversation.otherUser.id);
    conversation.id && await addReadMessage(conversation.id);
  };

  return (
      <StyledBadge
        badgeContent={conversation.unreadMessages}
        color="primary"
        className={classes.root}
        onClick={() => handleClick(conversation)}
      >
        <BadgeAvatar
          photoUrl={otherUser.photoUrl}
          username={otherUser.username}
          online={otherUser.online}
          sidebar={true}
        />
        <ChatContent conversation={conversation} />
      </StyledBadge>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    addReadMessage: (conversationId) => {
      dispatch(addReadMessage(conversationId));
    }
  };
};

export default connect(null, mapDispatchToProps)(Chat);
