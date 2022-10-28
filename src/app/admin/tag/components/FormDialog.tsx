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
import { ResultApi, Tag } from "../../../contant/IntefaceContaint";
import { useAppDispatch } from "../../../hooks";
import { changeLoading, createTag, updateTag } from "../slice/TagAdminSlice";
import {
  CreateDto,
  requestPostCreateTag,
  requestPutUpdateTag,
  UpdateDto,
} from "../TagApi";
interface Props {
  open: any;
  handleClose: any;
  anchorElData: any;
  type: number;
  data: Tag[];
}
const validateTag = Yup.object({
  tag_name: Yup.string()
    .required("Vui lòng nhập")

    .trim(),
});

interface PropsCreateTag {
  tag_name: string;
}
const initialValues: PropsCreateTag = {
  tag_name: "",
};
const FormDialog = (props: Props) => {
  const dispatch = useAppDispatch();
  const { handleClose, open, anchorElData, type } = props;

  const onSubmit = async (data: PropsCreateTag) => {
    const { tag_name } = data;
    const item: UpdateDto = {
      ...anchorElData.item,
      tagName: tag_name,
    };
    try {
      dispatch(changeLoading(true));
      const res: ResultApi<Tag> = await requestPutUpdateTag(item);
      dispatch(updateTag({ item: res.data }));
      handleClose();
      dispatch(changeLoading(false));
    } catch (e) {
      dispatch(changeLoading(false));
    }
  };

  const onSubmitCreate = async (dataCreate: PropsCreateTag) => {
    const { tag_name } = dataCreate;
    const itemCreate: CreateDto = {
      tagName: tag_name,
    };
    try {
      dispatch(changeLoading(true));
      const res: ResultApi<Tag> = await requestPostCreateTag(itemCreate);
      dispatch(createTag({ item: res.data }));
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
        {TYPE_DIALOG.CREATE === type ? "Tạo mới Tag" : `Cập nhật Tag`}
      </DialogTitle>
      <Formik
        initialValues={
          type === TYPE_DIALOG.CREATE
            ? initialValues
            : {
                tag_name: anchorElData?.item.tagName ?? "",
              }
        }
        onSubmit={(data) => {
          type === TYPE_DIALOG.CREATE
            ? onSubmitCreate({ ...data })
            : onSubmit(data);
        }}
        validateOnChange
        validationSchema={validateTag}
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
                Cập nhật thông tin cá nhân của Tag, vui lòng điền tất cả thông
                tin cần thiết
              </DialogContentText>
              <TextInputComponent
                error={errors.tag_name}
                touched={touched.tag_name}
                value={values.tag_name}
                label={"tag name"}
                onChange={handleChange("tag_name")}
                onBlur={handleBlur("tag_name")}
                isRequire
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
