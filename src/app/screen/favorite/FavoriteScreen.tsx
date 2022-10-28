import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { useEffect } from "react";
import R from "../../assets/R";
import ProductItemComponent from "../../component/product_item/ProductItemComponent";
import { ProductSkeleton } from "../../component/Skeleton";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getFavoritesInfo } from "./slice/FavoritesSlice";

const FavoriteScreen = () => {
  const classname = useStyles();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.favoritesSlice);
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getData = async () => {
    try {
      await dispatch(getFavoritesInfo());
    } catch (e) {}
  };
  return (
    <div className={classname.container}>
      {data.length > 0
        ? data.map((value, idx) => {
            return (
              <ProductItemComponent
                item={value}
                key={idx}
                width={"22%"}
                image={value?.productImage ?? R.images.img_product}
              />
            );
          })
        : [0, 1, 2].map((e) => {
            return <ProductSkeleton />;
          })}
    </div>
  );
};
export default FavoriteScreen;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
      scrollBehavior: "auto",
      display: "flex",
      flexWrap: "wrap",
    },
  })
);
