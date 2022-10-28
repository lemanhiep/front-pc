import {
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { ArrowForwardIos } from "@material-ui/icons";
import { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import LoadingProgress from "../../component/LoadingProccess";
import ProductItemComponent from "../../component/product_item/ProductItemComponent";
import { ProductSkeleton } from "../../component/Skeleton";
import {
  LIST_IMAGE_BANNER,
  LIST_IMAGE_BANNER_SECOND,
} from "../../contant/Contant";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { colors } from "../../utils/color";
import { incrementAsyncHome } from "./slice/HomeSlice";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
      scrollBehavior: "auto",
      position: "relative",
    },
    image_banner: {
      width: "100%",
    },
    listImage: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 20,
      maxHeight: 500,
      minHeight: 450,
    },
    textTitle: {
      paddingTop: 5,
      paddingBottom: 10,
      fontWeight: "bold",
      fontSize: 24,
      textAlign: "left",
      fontFamily: ["sans-serif"].join(","),
      color: colors.gray59,
    },
    root: {
      position: "absolute",
      backgroundColor: "rgba(0,0,0,0.5)",
      width: "100%",
      height: "100%",
      top: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    containerTitle: {
      borderBottomColor: colors.grayC4,
      borderBottomWidth: 0.5,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  })
);

const HomeScreen = () => {
  const className = useStyles();
  const dispatch = useAppDispatch();
  const { isLoading, data } = useAppSelector((state) => state.home);
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    try {
      await dispatch(incrementAsyncHome());
    } catch (e) {}
  };
  return (
    <div className={className.container}>
      <div style={{ width: "100%" }}>
        <Carousel
          autoPlay
          animation="fade"
          timeout={500}
          IndicatorIcon={<div />}
        >
          {LIST_IMAGE_BANNER.map((e, index) => {
            return (
              <img
                src={e.url}
                alt=""
                style={{ width: "100%", minWidth: 1000 }}
                key={index}
              />
            );
          })}
        </Carousel>
      </div>
      {data?.listBestSale && data?.listBestSale.length > 0 && (
        <div
          style={{
            width: "100%",
            padding: 10,
            scrollbarWidth: "auto",
            marginTop: 10,
          }}
        >
          <div className={className.containerTitle}>
            <p className={className.textTitle}>Sản phẩm bán chạy</p>
            <IconButton>
              <Typography color="inherit">Xem thêm</Typography>
              <ArrowForwardIos
                style={{ width: 15, height: 15, marginLeft: 5 }}
              />
            </IconButton>
          </div>
          <Carousel
            autoPlay
            animation="slide"
            timeout={500}
            IndicatorIcon={<div />}
            cycleNavigation
            reverseEdgeAnimationDirection
            interval={6000}
          >
            {[1, 2].map((e) => {
              const list =
                e === 1
                  ? data?.listBestSale.slice(0, 5)
                  : data?.listBestSale.slice(5, data?.listBestSale.length);
              return (
                <div className={className.listImage}>
                  {list.map((value, idx) => {
                    return (
                      <ProductItemComponent
                        item={value}
                        key={idx}
                        image={value.image}
                      />
                    );
                  })}
                </div>
              );
            })}
          </Carousel>
        </div>
      )}
      <div
        style={{
          width: "100%",
          paddingTop: 20,
        }}
      >
        <Carousel
          autoPlay
          animation="fade"
          timeout={500}
          IndicatorIcon={<div />}
          interval={7000}
        >
          {LIST_IMAGE_BANNER_SECOND.map((e, index) => {
            return (
              <img src={e.url} alt="" style={{ width: "100%" }} key={index} />
            );
          })}
        </Carousel>
      </div>
      <div style={{ width: "100%" }}>
        <div className={className.containerTitle}>
          <p className={className.textTitle}>Sản phẩm mới</p>
          <IconButton>
            <Typography color="inherit">Xem thêm</Typography>
            <ArrowForwardIos style={{ width: 15, height: 15, marginLeft: 5 }} />
          </IconButton>
        </div>
        <Carousel
          autoPlay
          animation="slide"
          timeout={500}
          IndicatorIcon={<div />}
          cycleNavigation
          reverseEdgeAnimationDirection
          interval={6000}
        >
          {data?.listNewProduct.length > 0 ? (
            [1, 2].map((e) => {
              const list =
                e === 1
                  ? data?.listNewProduct.slice(0, 5)
                  : data?.listNewProduct.slice(5, data?.listNewProduct.length);
              return (
                <div className={className.listImage}>
                  {list.map((value, idx) => {
                    return (
                      <ProductItemComponent
                        item={value}
                        key={idx}
                        image={value.image}
                      />
                    );
                  })}
                </div>
              );
            })
          ) : (
            <div className={className.listImage}>
              {[0, 1, 2, 3, 4].map((e) => {
                return <ProductSkeleton height={400} />;
              })}
            </div>
          )}
        </Carousel>
      </div>
      {isLoading && <LoadingProgress />}
    </div>
  );
};
export default HomeScreen;
