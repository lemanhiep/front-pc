import {
  Avatar,
  createStyles,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import R from "../../../assets/R";
import { DEFINE_TYPE_ACCOUNT, TYPE_ACCOUNT } from "../../../contant/Contant";
import { colors } from "../../../utils/color";
import FavoriteScreen from "../../favorite/FavoriteScreen";
import OrderScreen from "../../order/OrderScreen";
import AddressUser from "../address/AddressUser";
import InformationScreen from "../information/InformationScreen";

const RenderScreen = (params: { index: number }) => {
  const { index } = params;
  switch (index) {
    case 0:
      return <InformationScreen />;
    case 1:
      return <AddressUser />;
    case 2:
      return <OrderScreen />;
    case 3:
      return <FavoriteScreen />;
    default:
      return <InformationScreen />;
  }
};
const AccountScreen = () => {
  const className = useStyles();
  const router: any = useLocation().state;
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (router && router.type) {
      setSelected(DEFINE_TYPE_ACCOUNT[router.type].index);
    }
  }, [router]);

  return (
    <div className={className.root}>
      <List className={className.containerTab}>
        <ListItem>
          <ListItemIcon
            style={{
              position: "relative",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src={R.images.img_product}
              style={{ width: 100, height: 100 }}
            />
            <IconButton
              style={{
                position: "absolute",
                bottom: 0,
                right: 10,
                backgroundColor: "rgba(0,0,0,0.1)",
                padding: 5,
                borderRadius: 20,
              }}
            >
              <PhotoCamera style={{ width: 20, height: 20 }} />
            </IconButton>
          </ListItemIcon>
        </ListItem>
        {Object.keys(TYPE_ACCOUNT).map((e, index) => {
          const Icon = DEFINE_TYPE_ACCOUNT[e].icon;
          return (
            <ListItem
              onClick={() => {
                setSelected(index);
              }}
              button
              key={index}
            >
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText
                primary={DEFINE_TYPE_ACCOUNT[e].name}
                style={{
                  color: selected === index ? colors.black : colors.gray59,
                }}
              />
            </ListItem>
          );
        })}
      </List>
      <div className={className.containerValue}>
        <RenderScreen index={selected} />
      </div>
    </div>
  );
};
export default AccountScreen;
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "space-between",
      flex: 1,
    },
    containerTab: {
      width: "20%",
    },
    containerValue: {
      width: "75%",
      paddingTop: 50,
    },
  })
);
