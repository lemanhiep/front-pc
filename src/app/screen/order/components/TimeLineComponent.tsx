import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import Timeline from "@material-ui/lab/Timeline";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import { colors } from "../../../utils/color";
import { History } from "../slice/OrderSlice";
import { DEFINE_ORDER } from "./ItemOrderComponent";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));
interface Props {
  list?: History[];
}
export default function TimeLineComponent(props: Props) {
  const { list } = props;
  const classes = useStyles();

  return (
    <Timeline align="alternate">
      {list?.map((e, index) => {
        return (
          <TimelineItem key={index}>
            <TimelineOppositeContent>
              <Typography variant="body2" color="textSecondary">
                {e.updateTime}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot>
                <FastfoodIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={2} className={classes.paper}>
                <p style={{ fontSize: 15 }}>{DEFINE_ORDER[e.status].title}</p>
                <p style={{ color: colors.gray59, fontSize: 13 }}>
                  {DEFINE_ORDER[e.status].description}
                </p>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
}
