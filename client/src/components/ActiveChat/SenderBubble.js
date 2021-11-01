import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: theme.spacing(1),
    fontWeight: "bold"
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px"
  },
  readMessageAvatar: {
    height: theme.spacing(2.5),
    width: theme.spacing(2.5),
    marginTop: theme.spacing(1)
  },
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, text, isRead, otherUser } = props;
  return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      <Box className={classes.bubble}>
        <Typography className={classes.text}>{text}</Typography>
      </Box>
      {isRead && <Avatar data-testid="read-avatar" alt={otherUser.username} src={otherUser.photoUrl} className={classes.readMessageAvatar} />}
    </Box>
  );
};

export default SenderBubble;
