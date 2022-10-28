import {
  createStyles,
  Dialog,
  DialogTitle,
  makeStyles,
  Step,
  StepLabel,
  Stepper,
  Theme,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import LoadingProgress from "../../../component/LoadingProccess";
import { TYPE_DIALOG } from "../../../contant/Contant";
import {
  DetailProductAdmin,
  Material,
  OptionColor,
  OptionSize,
  ProductAdmin,
  ResultApi,
  Tag,
} from "../../../contant/IntefaceContaint";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { requestGetProductDetailByIdProduct } from "../../../screen/product/ProductCustomerApi";
import { incrementAsyncCategoryAdmin } from "../../category/slice/CategoryAdminSlice";
import { incrementAsyncMaterialAdmin } from "../../material/slice/MaterialAdminSlice";
import { incrementAsyncOptionColor } from "../../option/slice/OptionColorSlice";
import { incrementAsyncOptionSize } from "../../option/slice/OptionSizeSlice";
import { incrementAsyncTagAdmin } from "../../tag/slice/TagAdminSlice";
import { requestGetOptionById } from "../ProductAdminApi";
import ComponentFormCreate from "./create/ComponentFormCreate";
import CreateProductDetail from "./create/CreateProductDetail";
import ListProductDetail from "./create/ListProductDetail";
interface Props {
  open: any;
  handleClose: any;
  anchorElData: { item: ProductAdmin | null };
  type: number;
  data: ProductAdmin[];
  activeStep: number;
  setActiveStep: any;
}

export interface DataOptionProduct {
  colorList: OptionColor[];
  sizeList: OptionSize[];
  tagList: Tag[];
  materialList: Material[];
}

const validateProduct = Yup.object({
  product_name: Yup.string().required("Vui lòng nhập").trim(),
  description: Yup.string().required("Vui lòng nhập").trim(),
});

export interface PropsCreateProduct {
  product_name: string;
  description: string;
}
const initialValues: PropsCreateProduct = {
  product_name: "",
  description:
    "Cấu hình mạnh chạy khỏe trên mọi nền tảng.",
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      position: "relative",
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);

function getSteps() {
  return ["Product information", "Product detail", "Custome product"];
}

const FormDialogProductCreate = (props: Props) => {
  const dispatch = useAppDispatch();
  const { handleClose, open, anchorElData, type, activeStep, setActiveStep } =
    props;

  const [dataOption, setDataOption] = useState<DataOptionProduct | undefined>(
    undefined
  );
  const [loadingCurrent, setLoadingCurrent] = useState(false);
  const [dataProduct, setDataProduct] = useState<ProductAdmin | null>(
    anchorElData.item
  );
  const [listProductDetail, setListProductDetail] = useState<
    DetailProductAdmin[]
  >([]);

  const [option, setOption] = useState<any[]>([]);

  useEffect(() => {
    setDataProduct(anchorElData.item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchorElData.item?.id]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getData = async () => {
    await dispatch(incrementAsyncMaterialAdmin());
    await dispatch(incrementAsyncTagAdmin());
    await dispatch(incrementAsyncCategoryAdmin());
    await dispatch(incrementAsyncOptionColor());
    await dispatch(incrementAsyncOptionSize());
  };

  useEffect(() => {
    getDataOption();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataProduct]);

  const getDataOption = async () => {
    if (dataProduct) {
      try {
        setLoadingCurrent(true);
        const res: ResultApi<DataOptionProduct> = await requestGetOptionById({
          id: dataProduct?.id,
        });
        const resListDetail: ResultApi<DetailProductAdmin[]> =
          await requestGetProductDetailByIdProduct({
            product_id: dataProduct.id ?? 7,
          });
        setListProductDetail(resListDetail.data);
        setDataOption(res.data);
        setLoadingCurrent(false);
      } catch (e) {
        setLoadingCurrent(false);
      }
    }
  };

  const loadingTags = useAppSelector((state) => state.tagAdmin).isLoading;
  const loadingMaterials = useAppSelector(
    (state) => state.materialAdmin
  ).isLoading;
  const loadingCategories = useAppSelector(
    (state) => state.categoryAdmin
  ).isLoading;
  const loadingProducts = useAppSelector(
    (state) => state.productAdmin
  ).isLoading;

  const onClose = () => {
    handleReset();
    handleClose();
  };

  const onSubmit = (data: ProductAdmin) => {
    setDataProduct(data);
    handleNext();
  };

  const classes = useStyles();

  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setDataProduct(null);
  };

  function getStepContent(stepIndex: number) {
    switch (stepIndex) {
      case 0:
        return (
          <ComponentFormCreate
            handleClose={onClose}
            initialValues={initialValues}
            steps={steps}
            onSubmit={onSubmit}
            validateProduct={validateProduct}
            dataProduct={dataProduct}
            options={dataOption}
            type={type}
            setDataProduct={setDataProduct}
          />
        );
      case 1:
        return (
          <CreateProductDetail
            handleBack={handleBack}
            handleNext={handleNext}
            productItem={dataProduct}
            option={option}
            setOption={setOption}
            options={dataOption}
            setListProductDetail={setListProductDetail}
            type={type}
            handleClose={handleClose}
          />
        );
      case 2:
        return (
          <ListProductDetail
            onSubmit={() => {
              onClose();
            }}
            listDetail={listProductDetail}
            dataProduct={dataProduct}
            type={type}
            handleClose={() => {
              onClose();
            }}
          />
        );
      default:
        return "Unknown stepIndex";
    }
  }
  return (
    <Dialog open={open} onClose={() => {}} maxWidth="lg">
      <DialogTitle id="form-dialog-title">
        {TYPE_DIALOG.CREATE === type ? "Tạo mới Product" : `Cập nhật Product`}
      </DialogTitle>
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label,index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div style={{ width: 1200 }}>
          <div>{getStepContent(activeStep)}</div>
        </div>
        {(loadingCategories ||
          loadingMaterials ||
          loadingTags ||
          loadingProducts ||
          loadingCurrent) && <LoadingProgress />}
      </div>
    </Dialog>
  );
};
export default FormDialogProductCreate;
