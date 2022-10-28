import {
  Button,
  createStyles,
  lighten,
  makeStyles,
  Paper,
  Theme,
} from "@material-ui/core";
import { colors } from "../utils/color";
interface EnhancedTableToolbarProps {
  onCreate: Function;
  label: string;
  textFilter?: string;
  setTextFilter?: any;
}
const EnhancedTableToolbarHeder = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { onCreate, setTextFilter, textFilter } = props;
  return (
    <Paper style={{ paddingTop: 10, paddingBottom: 15 }}>
      <div className={classes.filter}>
        <div className={classes.containerFilter}>
          <input
            value={textFilter ?? ""}
            className={classes.textInput}
            onChange={(event) => {
              setTextFilter && setTextFilter(event.target.value);
            }}
            placeholder="Search..."
          />
        </div>
        <div className={classes.containerButton}>
          <Button
            variant="contained"
            style={{
              marginLeft: 10,
              backgroundColor: colors.gradiantBluePosition,
              color: colors.gradiantBlue,
            }}
            onClick={() => onCreate()}
          >
            Tạo mới thông tin
          </Button>
        </div>
      </div>
    </Paper>
  );
};
export default EnhancedTableToolbarHeder;
const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: "1 1 100%",
      color: colors.grayC4,
    },
    containerFilter: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    textInput: {
      width: "100%",
      borderColor: colors.grayC4,
      borderWidth: 0.5,
      height: 40,
      borderRadius: 5,
      marginTop: 10,
      paddingLeft: 10,
      paddingRight: 10,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: "15%",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    containerDate: {
      minWidth: "30%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    dateInput: {
      borderColor: colors.grayC4,
      borderWidth: 0.5,
      padding: 5,
    },
    containerButton: {
      width: "40%",
      height: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    filter: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingLeft: 15,
      paddingRight: 10,
    },
  })
);
