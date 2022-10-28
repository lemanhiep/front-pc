import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import LoadingProgress from "../../../component/LoadingProccess";
import TextInputComponent from "../../../component/TextInputComponent";
import { TYPE_DIALOG } from "../../../contant/Contant";
import { OptionColor, ResultApi } from "../../../contant/IntefaceContaint";
import { useAppDispatch } from "../../../hooks";
import {
  CreateColorDto,
  requestPostCreateColor,
  requestPutUpdateColor,
  UpdateColorDto,
} from "../OptionApi";
import {
  changeLoading,
  createColor,
  updateColor,
} from "../slice/OptionColorSlice";
interface Props {
  open: any;
  handleClose: any;
  anchorElData: any;
  type: number;
  data: OptionColor[];
  loading?: boolean;
}
const validateOptionColor = Yup.object({
  color_name: Yup.string().required("Vui lòng nhập").trim(),
});

interface PropsCreateColor {
  color_name: string;
}
const initialValues: PropsCreateColor = {
  color_name: "",
};
const FormDialogColor = (props: Props) => {
  const dispatch = useAppDispatch();
  const { handleClose, open, anchorElData, type, loading } = props;

  const onSubmit = async (data: PropsCreateColor) => {
    const { color_name } = data;
    try {
      dispatch(changeLoading(true));
      const item: UpdateColorDto = {
        ...anchorElData.item,
        colorName: color_name,
      };
      const res: ResultApi<OptionColor> = await requestPutUpdateColor(item);
      dispatch(updateColor({ item: res.data }));
      handleClose();
      dispatch(changeLoading(false));
    } catch (e) {
      dispatch(changeLoading(false));
    }
  };

  const onSubmitCreate = async (dataCreate: PropsCreateColor) => {
    const { color_name } = dataCreate;
    try {
      dispatch(changeLoading(true));
      const item: CreateColorDto = {
        colorName: color_name,
      };
      const res: ResultApi<OptionColor> = await requestPostCreateColor(item);
      dispatch(createColor({ item: res.data }));
      handleClose();
      dispatch(changeLoading(false));
    } catch (e) {
      dispatch(changeLoading(false));
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      style={{ width: "100%" }}
    >
      <DialogTitle id="form-dialog-title">
        {TYPE_DIALOG.CREATE === type ? "Tạo mới Color" : `Cập nhật Color`}
      </DialogTitle>
      <Formik
        initialValues={
          type === TYPE_DIALOG.CREATE
            ? initialValues
            : {
                color_name: anchorElData?.item.colorName ?? "",
              }
        }
        onSubmit={(data) => {
          type === TYPE_DIALOG.CREATE
            ? onSubmitCreate({ ...data })
            : onSubmit(data);
        }}
        validateOnChange
        validationSchema={validateOptionColor}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          touched,
        }) => (
          <>
            <DialogContent style={{ width: "100%" }}>
              <DialogContentText>
                Cập nhật thông tin cá nhân của Color, vui lòng điền tất cả thông
                tin cần thiết
              </DialogContentText>
              <TextInputComponent
                error={errors.color_name}
                touched={touched.color_name}
                value={values.color_name}
                label={"color name"}
                onChange={handleChange("color_name")}
                onBlur={handleBlur("color_name")}
                isRequire={true}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={() => handleSubmit()} color="primary">
                Subscribe
              </Button>
            </DialogActions>
          </>
        )}
      </Formik>
      {loading && <LoadingProgress />}
    </Dialog>
  );
};
export default FormDialogColor;
