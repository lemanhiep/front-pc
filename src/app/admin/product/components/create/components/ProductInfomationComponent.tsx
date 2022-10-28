import { Chip, createStyles, makeStyles, Typography } from "@material-ui/core";
import R from "../../../../../assets/R";
import {
  Material,
  ProductAdmin,
  Tag,
} from "../../../../../contant/IntefaceContaint";
import { colors } from "../../../../../utils/color";

interface ProductAdminCustom extends ProductAdmin {
  materialList?: Material[];
  tagList?: Tag[];
}

const ProductInfomation = (props: { item: any | null }) => {
  const item: ProductAdminCustom = props.item;
  const classes = useStylesInfo();
  return (
    <div style={{ display: "flex", justifyContent: "flex-start" }}>
      <div>
        <img
          alt=""
          src={item.image ? item.image : R.images.img_product}
          style={{ width: 150, marginRight: 20 }}
        />
      </div>
      <div>
        <Typography className={classes.containerItem}>
          Name: <p className={classes.textValue}>{item?.productName}</p>
        </Typography>
        <Typography className={classes.containerItem}>
          Category:{" "}
          <p className={classes.textValue}>{item?.category.categoryName}</p>
        </Typography>

        {item?.tagList && (
          <Typography className={classes.containerItem}>
            Tag:{" "}
            {item?.tagList?.length > 0 &&
              item?.tagList?.map((e, index) => {
                return (
                  <Chip key={index} label={e.tagName} style={{ margin: 2 }} />
                );
              })}
          </Typography>
        )}
        {item?.materialList && (
          <Typography className={classes.containerItem}>
            Material:{" "}
            {item?.materialList?.length > 0 &&
              item?.materialList?.map((e, index) => {
                return (
                  <Chip
                    key={index}
                    label={e.materialName}
                    style={{ margin: 2 }}
                  />
                );
              })}
          </Typography>
        )}

        <p style={{ color: colors.gray59 }}>{item?.description}</p>
      </div>
    </div>
  );
};
export default ProductInfomation;

const useStylesInfo = makeStyles(() =>
  createStyles({
    containerItem: {
      display: "flex",
      color: colors.grayC4,
      fontSize: 14,
      marginBottom: 10,
      alignItems: "center",
    },
    textTitle: {
      color: colors.grayC4,
      fontSize: 14,
    },
    textValue: {
      color: colors.black,
      fontSize: 16,
      fontWeight: "bold",
    },
  })
);
