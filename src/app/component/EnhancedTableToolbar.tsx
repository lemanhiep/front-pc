import {
  createStyles,
  IconButton,
  lighten,
  makeStyles,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import clsx from "clsx";
import { colors } from "../utils/color";
interface EnhancedTableToolbarProps {
  numSelected: number;
  onCreate: Function;
  onDelete: Function;
  label: string;
  isNonSearchTime?: boolean;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected, onDelete } = props;
  return (
    <div>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography
            className={classes.title}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} bản ghi
          </Typography>
        ) : (
          <Typography
            className={classes.title}
            variant="subtitle2"
            id="tableTitle"
            component="div"
          >
            Chưa chọn bản ghi nào
          </Typography>
        )}
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={() => onDelete()}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <div />
        )}
      </Toolbar>
    </div>
  );
};
export default EnhancedTableToolbar;
const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
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
      width: "60%",
      height: 100,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    textInput: {
      width: "40%",
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
