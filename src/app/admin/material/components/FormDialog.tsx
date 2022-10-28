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
import TextInputComponent from "../../../component/TextInputComponent";
import { TYPE_DIALOG } from "../../../contant/Contant";
import { Material, ResultApi } from "../../../contant/IntefaceContaint";
import { useAppDispatch } from "../../../hooks";
import {
  CreateDto,
  requestPostCreateMaterial,
  requestPutUpdateMaterial,
  UpdateDto,
} from "../MaterialApi";
import {
  changeLoading,
  createMaterial,
  updateMaterial,
} from "../slice/MaterialAdminSlice";
interface Props {
  open: any;
  handleClose: any;
  anchorElData: any;
  type: number;
  data: Material[];
}
const validateMaterial = Yup.object({
  materialName: Yup.string()
    .required("Vui lòng nhập")

    .trim(),
});

interface PropsCreateMaterial {
  materialName: string;
}
const initialValues: PropsCreateMaterial = {
  materialName: "",
};
const FormDialog = (props: Props) => {
  const dispatch = useAppDispatch();
  const { handleClose, open, anchorElData, type, data } = props;

  const onSubmit = async (data: PropsCreateMaterial) => {
    const { materialName } = data;
    const item: UpdateDto = {
      ...anchorElData.item,
      materialName: materialName,
    };
    try {
      dispatch(changeLoading(true));
      const res: ResultApi<Material> = await requestPutUpdateMaterial(item);
      dispatch(updateMaterial({ item: res.data }));
      handleClose();
      dispatch(changeLoading(false));
    } catch (e) {
      dispatch(changeLoading(false));
    }
  };

  const onSubmitCreate = async (dataCreate: PropsCreateMaterial) => {
    const { materialName } = dataCreate;
    const item: CreateDto = {
      materialName: materialName,
    };
    try {
      dispatch(changeLoading(true));
      const res: ResultApi<Material> = await requestPostCreateMaterial(item);
      dispatch(createMaterial({ item: res.data }));
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
        {TYPE_DIALOG.CREATE === type ? "Tạo mới Material" : `Cập nhật Material`}
      </DialogTitle>
      <Formik
        initialValues={
          type === TYPE_DIALOG.CREATE
            ? initialValues
            : {
                materialName: anchorElData?.item.materialName ?? "",
              }
        }
        onSubmit={(data) => {
          type === TYPE_DIALOG.CREATE
            ? onSubmitCreate({ ...data })
            : onSubmit(data);
        }}
        validateOnChange
        validationSchema={validateMaterial}
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
                Cập nhật thông tin cá nhân của Material, vui lòng điền tất cả
                thông tin cần thiết
              </DialogContentText>
              <TextInputComponent
                error={errors.materialName}
                touched={touched.materialName}
                value={values.materialName}
                label={"Material name"}
                onChange={handleChange("materialName")}
                onBlur={handleBlur("materialName")}
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
    </Dialog>
  );
};
export default FormDialog;
