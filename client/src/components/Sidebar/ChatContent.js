import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: theme.spacing(2.5),
    flexGrow: 1,
  },
  username: {
    fontWeight: theme.typography.fontWeightBold,
    letterSpacing: -0.2,
  },
  previewText: (props) => ({
    fontSize: 12,
    color: props.color,
    fontWeight: props.fontWeight,
    letterSpacing: -0.17,
  }),
}));

const ChatContent = (props) => {
  const { conversation } = props;
  const { latestMessageText, otherUser } = conversation;

  const theme = useTheme();

  const isUnreadMessages = conversation.unreadMessages > 0;
  const unreadMessageProps = {
    color: isUnreadMessages ? theme.palette.common.black : "#9CADC8",
    fontWeight: isUnreadMessages ? theme.typography.fontWeightBold : theme.typography.fontWeightRegular
  }

  const classes = useStyles(unreadMessageProps);

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={`${classes.previewText}`}>
          {latestMessageText}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatContent;
