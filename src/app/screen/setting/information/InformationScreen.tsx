import {
  createStyles,
  IconButton,
  makeStyles,
  Tooltip,
  Typography
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { useEffect } from "react";
import LoadingProgress from "../../../component/LoadingProccess";
import ProductItemComponent from "../../../component/product_item/ProductItemComponent";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getIdAccount } from "../../../service/StorageService";
import { colors } from "../../../utils/color";
import { getFavoritesInfo } from "../../favorite/slice/FavoritesSlice";
import { getUserInfo } from "../account/slice/AccountSlice";

const InformationScreen = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { data, isLoading } = useAppSelector((e) => e.userSlice);
  const favorites = useAppSelector((state) => state.favoritesSlice).data;
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    try {
      const idAccount = getIdAccount();
      await dispatch(getUserInfo(Number(idAccount)));
      await dispatch(getFavoritesInfo());
    } catch (e) {}
  };

  return (
    <div className={classes.container}>
      <div className={classes.containerInfo}>
        <div className={classes.containerTitle}>
          <Typography className={classes.textTitle}>Họ và tên:</Typography>
          <Typography className={classes.textTitle}>Số điện thoại:</Typography>
          <Typography className={classes.textTitle}>Email cá nhân:</Typography>
          <Typography className={classes.textTitle}>Tên đăng nhập</Typography>
        </div>
        <div>
          <Typography className={classes.textValue}>
            {data?.fullName ?? "..."}
          </Typography>
          <Typography className={classes.textValue}>
            {data?.phoneNumber ?? "..."}
          </Typography>
          <Typography className={classes.textValue}>
            {data?.email ?? "..."}
          </Typography>
          <Typography className={classes.textValue}>
            {data?.username ?? "..."}
          </Typography>
        </div>
        <div style={{ position: "absolute", right: 0 }}>
          <Tooltip title={"Chỉnh sửa"}>
            <IconButton>
              <Edit />
            </IconButton>
          </Tooltip>
        </div>
        {isLoading && <LoadingProgress />}
      </div>
      <div>
        <Typography className={classes.textLableTitle}>
          Các sản phẩm mua gần đây
        </Typography>
        <div className={classes.containerList}>
          {favorites.map((e, index) => {
            const image = e.image;
            if (index < 4)
              return (
                <ProductItemComponent item={e} key={index} image={image} />
              );
            else return <div key={index}></div>;
          })}
        </div>
      </div>
      <div>
        <Typography className={classes.textLableTitle}>
          Sản phẩm bạn yêu thích
        </Typography>
        <div className={classes.containerList}>
          {favorites.map((e, index) => {
            const image = e.image;
            if (index < 4)
              return (
                <ProductItemComponent item={e} key={index} image={image} />
              );
              else return <div key={index}></div>;
          })}
        </div>
      </div>
    </div>
  );
};
export default InformationScreen;
const useStyles = makeStyles(() =>
  createStyles({
    container: {
      width: "100%",
      paddingLeft: 10,
    },
    containerInfo: {
      display: "flex",
      position: "relative",
    },
    containerTitle: {
      marginRight: 20,
    },
    textTitle: {
      color: colors.gray59,
      fontWeight: "bold",
      fontSize: 16,
      paddingBottom: 10,
    },
    textValue: {
      color: colors.black,
      fontWeight: "lighter",
      fontSize: 16,
      paddingBottom: 10,
    },
    containerList: {
      flexWrap: "wrap",
      display: "flex",
      scrollBehavior: "auto",
    },
    textLableTitle: {
      borderBottomWidth: 0.5,
      marginTop: 20,
      color: colors.gray59,
      fontWeight: "bold",
      fontSize: 16,
      paddingBottom: 10,
    },
  })
);
