import {
  Button,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { LIST_OPTION } from "../../../../contant/ContaintDataAdmin";
import { TYPE_DIALOG } from "../../../../contant/Contant";
import {
  DetailProductAdmin,
  ProductAdmin,
  ResultApi,
} from "../../../../contant/IntefaceContaint";
import { useAppDispatch } from "../../../../hooks";
import { getDifferenValue } from "../../../../utils/function";
import { createNotification } from "../../../../utils/MessageUtil";
import {
  CreateDto,
  requestPostCreateDetailProduct,
} from "../../ProductAdminApi";
import { changeLoading } from "../../slice/ProductAdminSlice";
import { DataOptionProduct } from "../DialogCreateProduct";
import RenderItemOption from "./components/ItemOptionComponent";
import ProductInfomation from "./components/ProductInfomationComponent";

interface Props {
  handleBack: () => void;
  handleNext: () => void;
  productItem: ProductAdmin | null;
  option: any[];
  setOption: any;
  setListProductDetail: any;
  type?: number;
  handleClose?: () => void;
  options?: DataOptionProduct;
}

const CreateProductDetail = (props: Props) => {
  const {
    handleNext,
    productItem,
    option,
    setOption,
    setListProductDetail,
    type,
    handleClose,
    options,
  } = props;

  const dispatch = useAppDispatch();
  const classes = useStyles();

  const [optionValues, setOptionValues] = useState<{
    colors: any[];
    sizes: any[];
  }>({
    colors: [],
    sizes: [],
  });

  useEffect(() => {
    autoChangeOption();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  const autoChangeOption = () => {
    if (options) {
      let arrayNew: any[] = [];
      let newOptionValues = { ...optionValues };
      if (options.colorList.length > 0) {
        const value = 1;
        arrayNew = arrayNew.concat([`${value}`]);
        const optionValuesNew: any[] = options.colorList.map((e) => e.id);
        newOptionValues = { ...newOptionValues, colors: optionValuesNew };
      }
      if (options.sizeList.length > 0) {
        const value = 2;
        arrayNew = arrayNew.concat([`${value}`]);
        const optionValuesNew: any[] = options.sizeList.map((e) => e.id);
        newOptionValues = { ...newOptionValues, sizes: optionValuesNew };
      }

      setOptionValues(newOptionValues);
      setOption(arrayNew);
    }
  };

  const handleChooseOption = () => {
    let m = getDifferenValue({ initList: LIST_OPTION, option: option });
    setOption(option.concat([`${m}`]));
  };

  const changeOptionValues = (keyNumber: number) => {
    if (Number(keyNumber) === 1) {
      let newValues: any = { ...optionValues, colors: [] };
      setOptionValues(newValues);
    } else if (Number(keyNumber) === 2) {
      let newValues: any = { ...optionValues, sizes: [] };
      setOptionValues(newValues);
    }
  };

  const handleDeleteOption = (number_key: number, item: any) => {
    const newRes = option.filter((e, idx) => idx !== number_key);
    setOption(newRes);
    changeOptionValues(item);
  };

  const handleSubmit = async () => {
    try {
      if (optionValues.colors.length === 0 || optionValues.sizes.length === 0) {
        createNotification({
          message: "Bạn cần chọn option cho sản phẩm",
          type: "warning",
        });
        return;
      }
      dispatch(changeLoading(true));
      if (type === TYPE_DIALOG.CREATE) {
        const payload: CreateDto = {
          colorIdList: optionValues.colors,
          priceExport: 0,
          priceImport: 0,
          productId: productItem?.id,
          quantity: 0,
          sizeIdList: optionValues.sizes,
        };
        const res: ResultApi<DetailProductAdmin[]> =
          await requestPostCreateDetailProduct(payload);
        setListProductDetail(res.data);
      } else if (type === TYPE_DIALOG.UPDATE) {
        const payload: CreateDto = {
          colorIdList: optionValues.colors,
          priceExport: 0,
          priceImport: 0,
          productId: productItem?.id,
          quantity: 0,
          sizeIdList: optionValues.sizes,
        };
        const res: ResultApi<DetailProductAdmin[]> =
          await requestPostCreateDetailProduct(payload);
        setListProductDetail(res.data);
      }
      handleNext();
      dispatch(changeLoading(false));
    } catch (e) {
      dispatch(changeLoading(false));
    }
  };

  return (
    <div className={classes.root}>
      <Typography
        style={{
          fontWeight: "bold",
          fontSize: 18,
          marginBottom: 20,
          marginLeft: 10,
        }}
      >
        Thông tin sản phẩm
      </Typography>
      <ProductInfomation item={productItem} />
      <Typography
        style={{
          marginTop: 15,
          fontWeight: "bold",
          fontSize: 18,
          marginBottom: 10,
          marginLeft: 10,
        }}
      >
        Thông tin option của sản phẩm
      </Typography>
      <div style={{ padding: 10, display: "flex", flexWrap: "wrap" }}>
        {option.map((e, index) => {
          let list: string[] = [];

          if (+e === 1) list = optionValues.colors;
          else if (+e === 2) list = optionValues.sizes;

          return (
            <RenderItemOption
              handleDeleteOption={() =>
                handleDeleteOption(index, option[index])
              }
              key={index}
              option={option}
              index={index}
              valueOption={option[index]}
              setOption={setOption}
              optionValues={optionValues}
              setOptionValues={setOptionValues}
              listIdSelectedOptionValues={list}
            />
          );
        })}
        {option.length < 2 && (
          <Button
            variant="outlined"
            onClick={handleChooseOption}
            style={{ height: 45 }}
          >
            Add option
          </Button>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {type === TYPE_DIALOG.UPDATE && (
          <Button
            onClick={handleClose}
            style={{ marginRight: 10 }}
            color="secondary"
          >
            Cancel
          </Button>
        )}
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Next
        </Button>
      </div>
    </div>
  );
};
export default CreateProductDetail;
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: 20,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
    },
  })
);
