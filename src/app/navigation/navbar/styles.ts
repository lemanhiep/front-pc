import {
  alpha,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import { colors } from "../../utils/color";
const drawerWidth = 240;
export const useNavBarStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    margin: {
      marginLeft: "5%",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
      color: "black",
      fontWeight: "bold",
      marginRight: "5%",
      fontSize: 16,
    },
    option: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
      color: "black",
      marginLeft: "1%",
      fontSize: 13,
    },
    button: {
      marginLeft: "2%",
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.black, 0.1),
      },
    },
    optionView: {
      flexDirection: "row",
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.black, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.black, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
      borderColor: "red",
    },
    appBar: {
      // zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor: "white",
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    hide: {
      display: "none",
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "black",
    },
    inputRoot: {
      color: "black",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      paddingLeft: theme.spacing(10) + 1,
      transition: theme.transitions.create("padding", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    contentActive: {
      paddingLeft: theme.spacing(32),
    },
    containerItemCart: {
      padding: 5,
      paddingRight: 20,
      paddingLeft: 10,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
    },
    buttonChangeQuantityCart: {
      width: 25,
      height: 25,
      borderColor: colors.grayC4,
      borderWidth: 0.8,
      borderRadius: 5,
      marginLeft: 5,
      marginRight: 5,
    },
    containerQuantity: {
      paddingLeft: 10,
      display: "flex",
    },
    containerInfoCart: {
      paddingLeft: 5,
      paddingRight: 5,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
    },
    textPriceCart: {
      color: colors.black,
      marginLeft: 5,
      fontStyle: "italic",
    },
    textNameProductCart: {
      fontWeight: "bold",
    },
    containerAdmin: {
      display: "flex",
      flexDirection: "row",
      
    },
  })
);
