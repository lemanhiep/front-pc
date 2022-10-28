import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Logout from "@material-ui/icons/ExitToApp";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { updateSwitchRole } from "../admin/sliceSwitchRole/switchRoleSlice";
import { LIST_MENU_DRAWER, ROUTE } from "../contant/Contant";
import { useAppDispatch } from "../hooks";
import { getDrawer, setDrawer } from "../service/StorageService";
import { colors } from "../utils/color";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
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
    },
    menuItem: {
      "&:hover": {
        backgroundColor: "rgba(0,0,0,0.5)",
      },
    },
    borderCustome:{
      borderRightWidth: 0,
      borderRightColor:colors.white
    }
  })
);

interface Props {
  open: boolean;
  setOpen: any;
}
export default function MiniDrawer(props: Props) {
  const { open, setOpen } = props;
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleDrawerClose = () => {
    setOpen(!open);
  };
  const selected = getDrawer();
  return (
    <div className={classes.root}>
      {/* <CssBaseline /> */}
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
          paperAnchorDockedLeft: clsx(classes.borderCustome)
        }}
        
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <List style={{ paddingLeft: 5, paddingRight: 5 }}>
          {LIST_MENU_DRAWER.map((val, index) => {
            const Icon = val.icon;
            return (
              <ListItem
                button
                key={index}
                onClick={() => {
                  navigate(val.route);
                  setDrawer(`${index}`);
                }}
                style={{
                  backgroundColor:
                    Number(selected) === index
                      ? "rgba(0, 153, 255, 0.1)"
                      : colors.white,
                  borderRadius: 10,
                }}
              >
                <ListItemIcon>
                  <Icon
                    style={{
                      color:
                        Number(selected) === index
                          ? "rgb(0, 153, 255)"
                          : colors.gray59,
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={val.name}
                  style={{
                    color:
                      Number(selected) === index
                        ? "rgb(0, 153, 255)"
                        : colors.gray59,
                  }}
                />
              </ListItem>
            );
          })}

          <ListItem
            button
            onClick={() => {
              localStorage.clear();
              dispatch(updateSwitchRole(false));
              navigate(ROUTE.LOGIN);
              setDrawer(`${LIST_MENU_DRAWER.length + 1}`);
            }}
            style={{
              borderRadius: 10,
            }}
          >
            <ListItemIcon>
              <Logout
                style={{
                  color:
                    Number(selected) === LIST_MENU_DRAWER.length + 1
                      ? "rgb(0, 153, 255)"
                      : colors.grayC4,
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={"Đăng xuất"}
              style={{
                color:
                  Number(selected) === LIST_MENU_DRAWER.length + 1
                    ? colors.black
                    : colors.grayC4,
              }}
            />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
