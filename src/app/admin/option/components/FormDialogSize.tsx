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
import { OptionSize, ResultApi } from "../../../contant/IntefaceContaint";
import { useAppDispatch } from "../../../hooks";
import {
  CreateSizeDto,
  requestPostCreateSize,
  requestPutUpdateSize,
  UpdateSizeDto,
} from "../OptionApi";
import {
  changeLoading,
  createSize,
  updateSize,
} from "../slice/OptionSizeSlice";
interface Props {
  open: any;
  handleClose: any;
  anchorElData: any;
  type: number;
  data: OptionSize[];
  loading?: boolean;
}
const validateOptionSize = Yup.object({
  Size_name: Yup.string().required("Vui lòng nhập").trim(),
});

interface PropsCreateSize {
  Size_name: string;
}
const initialValues: PropsCreateSize = {
  Size_name: "",
};
const FormDialogSize = (props: Props) => {
  const dispatch = useAppDispatch();
  const { handleClose, open, anchorElData, type, loading } = props;

  const onSubmit = async (data: PropsCreateSize) => {
    const { Size_name } = data;
    try {
      dispatch(changeLoading(true));
      const payload: OptionSize = {
        ...anchorElData,
        sizeName: Size_name,
      };
      const result: ResultApi<OptionSize> = await requestPutUpdateSize(payload);
      dispatch(updateSize({ item: result.data }));
      handleClose();
      dispatch(changeLoading(false));
    } catch (e) {
      dispatch(changeLoading(false));
    }
  };

  const onSubmitCreate = async (dataCreate: PropsCreateSize) => {
    const { Size_name } = dataCreate;
    try {
      dispatch(changeLoading(true));
      const payload: CreateSizeDto = {
        sizeName: Size_name,
      };
      const result: ResultApi<OptionSize> = await requestPostCreateSize(
        payload
      );
      dispatch(createSize({ item: result.data }));
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
        {TYPE_DIALOG.CREATE === type ? "Tạo mới Size" : `Cập nhật Size`}
      </DialogTitle>
      <Formik
        initialValues={
          type === TYPE_DIALOG.CREATE
            ? initialValues
            : {
                Size_name: anchorElData?.item.sizeName ?? "",
              }
        }
        onSubmit={(data) => {
          type === TYPE_DIALOG.CREATE
            ? onSubmitCreate({ ...data })
            : onSubmit(data);
        }}
        validateOnChange
        validationSchema={validateOptionSize}
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
                Cập nhật thông tin cá nhân của Size, vui lòng điền tất cả thông
                tin cần thiết
              </DialogContentText>
              <TextInputComponent
                error={errors.Size_name}
                touched={touched.Size_name}
                value={values.Size_name}
                label={"Size name"}
                onChange={handleChange("Size_name")}
                onBlur={handleBlur("Size_name")}
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
export default FormDialogSize;
