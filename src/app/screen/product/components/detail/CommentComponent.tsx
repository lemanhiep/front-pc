import {
  Avatar,
  Button,
  CardHeader,
  createStyles,
  IconButton,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { Reply } from "@material-ui/icons";
import { useState } from "react";
import { ItemComment } from "../../ProductDetailScreen";

interface Props {
  item: ItemComment;
  isSelected?: boolean;
  onSelected: (id: number) => void;
  onSubmit: (item: ItemComment, text: string) => void;
}

const CommentComponent = (props: Props) => {
  const classes = useCommentStyles();
  const { item, isSelected, onSelected, onSubmit } = props;
  const [text, setText] = useState("");
  const onChangeComment = (text: string) => {
    setText(text);
  };
  return (
    <div>
      <CardHeader
        avatar={
          <Avatar
            alt="Ted talk"
            src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
          />
        }
        action={
          <div>
            {!isSelected && (
              <IconButton
                aria-label="settings"
                onClick={() => onSelected(item.id)}
              >
                <Reply />
                <Typography style={{ marginLeft: 5 }}>Trả lời</Typography>
              </IconButton>
            )}
          </div>
        }
        title={"Ted"}
        subheader={`${item.value}`}
      />
      <div className={classes.containerListReply}>
        {item.children?.map((e, index) => {
          return (
            <CardHeader
              avatar={
                <Avatar
                  alt="Ted talk"
                  src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
                />
              }
              title={"Ted"}
              subheader={`${e.value}`}
              key={index}
            />
          );
        })}
        {isSelected && (
          <div className={classes.containerComment}>
            <TextField
              value={text}
              onChange={(event) => onChangeComment(event.target.value)}
              placeholder={"Trả lời..."}
              className={classes.inputStyle}
            />
            {text.length > 0 && (
              <div className={classes.containerButton}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    onSelected(0);
                    setText("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.containerComment}
                  onClick={() => {
                    onSubmit(item, text);
                    setText("");
                  }}
                >
                  Submit
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default CommentComponent;
export const useCommentStyles = makeStyles((theme: Theme) =>
  createStyles({
    containerListReply: {
      paddingLeft: 60,
    },
    containerComment: {
      marginLeft: 10,
    },
    inputStyle: {
      width: "100%",
    },
    containerButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      marginTop: 10,
    },
  })
);
