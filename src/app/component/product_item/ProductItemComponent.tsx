import {
  createStyles,
  makeStyles,
  Paper,
  Theme,
  Typography
} from "@material-ui/core";
import clsx from "clsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import R from "../../assets/R";
import { ROUTE } from "../../contant/Contant";
import { ProductAdmin } from "../../contant/IntefaceContaint";
import { colors } from "../../utils/color";
import { formatPrice } from "../../utils/function";
import "./product.css";
export interface ItemProduct {
  id: number;

  name: string;
  price: number;

  discountPersent?: number;
  descriptionDiscount?: string;
  url_image: any;
}

interface Props {
  item: ProductAdmin;
  width?: number | string;
  image?: any;
}

const ProductItemComponent = (props: Props) => {
  const className = useStyles();
  const navigate = useNavigate();
  const { item, width, image } = props;
  const [show, setShow] = useState(false);

  return (
    <Paper
      elevation={show ? 3 : 0}
      className={clsx(className.container)}
      style={{ width: width }}
    >
      <button
        onMouseEnter={() => {
          setShow(true);
        }}
        onMouseLeave={() => {
          setShow(false);
        }}
        style={{
          minWidth: 170,
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
        onClick={() => {
          navigate(ROUTE.PRODUCT_DETAIL, { state: { item: item } });
        }}
      >
        <img
          src={image ? image : R.images.img_product}
          alt=""
          className={className.image_banner}
          style={{
            objectFit: "contain",
          }}
        />

        <div className={className.containerInfo}>
          <Typography
            variant="body1"
            component={"p"}
            className={className.textName}
          >
            {item.productName}
          </Typography>
          <p className={className.textPrice}>
            {formatPrice(item?.minPrice ?? 0)} đ
          </p>
        </div>
      </button>
    </Paper>
  );
};
export default ProductItemComponent;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginRight: `${(100 - 32 * 3) / 3}%`,
      marginTop: 15,
      position: "relative",
      minWidth: 170,
      maxWidth: "20%",
      display: "flex",
      flexDirection: "column",
      padding: 2,
      alignItems: "center",
      "&:hover": {
        animation: `$spin-exist 1s ${theme.transitions.easing.sharp}`,
        marginTop: -5,
      },
    },

    "@keyframes spin-exist": {
      "0%": {
        transform: "translateY(0px)",
      },
      "100%": {
        transform: "translateY(0px)",
      },
      "50%": {
        transform: "translateY(-5px)",
      },
    },
    image_banner: {
      minWidth: 170,
      minHeight: 300,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      maxWidth: "100%",
    },
    textDiscount: {
      color: colors.black,
      fontSize: 14,
    },
    containerInfo: {
      padding: 10,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      minWidth: 170,
    },
    textName: {
      color: colors.gray59,
      fontWeight: "bold",
      marginTop: 5,
      textAlign: "left",
      wordWrap: "break-word",
      overflow: "hidden",
      textOverflow: "ellipsis",
      WebkitLineClamp: 1,
      WebkitBoxOrient: "vertical",
    },
    textPrice: {
      color: colors.black,
      fontStyle: "italic",
      fontWeight: "bold",
    },
    positionContainer: {
      position: "absolute",
      backgroundColor: "rgba(0,0,0,0.5)",
      width: "100%",
      height: "100%",
      top: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      backgroundColor: colors.gray59,
      color: colors.white,
    },
  })
);
