import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import LoadingProgress from "../../../component/LoadingProccess";
import TextInputComponent from "../../../component/TextInputComponent";
import { TYPE_DIALOG } from "../../../contant/Contant";
import { CategoryAdmin, ResultApi } from "../../../contant/IntefaceContaint";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  CreateDto,
  requestPostCreateCategory,
  requestPutUpdateCategory,
  UpdateDto,
} from "../CategoryApi";
import {
  changeLoading,
  createCategory,
  createCategoryChilden,
  updateCategory,
  updateCategoryChilden,
} from "../slice/CategoryAdminSlice";
interface Props {
  open: any;
  handleClose: any;
  anchorElData?: { item: CategoryAdmin } | null;
  type: number;
  data: CategoryAdmin[];
  isParent?: boolean;
  category_parent_id?: number;
}
const validateCategory = Yup.object({});

interface PropsCreateCategory {
  name: string;
}
const initialValues: PropsCreateCategory = {
  name: "",
};
const FormDialog = (props: Props) => {
  const dispatch = useAppDispatch();
  const {
    handleClose,
    open,
    anchorElData,
    type,
    isParent,
    category_parent_id,
  } = props;
  const [category, setCategory] = useState<string | null>(
    category_parent_id ? `${category_parent_id}` : null
  );
  const { data, isLoading } = useAppSelector((state) => state.categoryAdmin);
  const onSubmitUpdate = async (data: { name: string }) => {
    const { name } = data;
    try {
      if (anchorElData) {
        dispatch(changeLoading(true));
        const item: UpdateDto = {
          id: anchorElData.item.id,
          categoryName: name,
          isDelete: anchorElData.item.isDeleted ?? false,
          categoryParentId: isParent ? 0 : Number(category),
          isActive: anchorElData.item.isActive,
        };
        const res: ResultApi<CategoryAdmin> = await requestPutUpdateCategory(
          item
        );
        if (isParent) dispatch(updateCategory({ item: res.data }));
        else
          dispatch(
            updateCategoryChilden({ item: res.data, id: category_parent_id })
          );
        handleClose();
      }
      dispatch(changeLoading(false));
    } catch (e) {
      dispatch(changeLoading(false));
    }
  };

  const onSubmitCreate = async (dataCreate: PropsCreateCategory) => {
    const { name } = dataCreate;

    try {
      dispatch(changeLoading(true));
      if (isParent) {
        const itemCreate: CreateDto = {
          categoryName: name,
          categoryParentId: 0,
        };
        const res: ResultApi<CategoryAdmin> = await requestPostCreateCategory(
          itemCreate
        );
        dispatch(createCategory({ item: res.data }));
      } else {
        const itemCreate: CreateDto = {
          categoryName: name,
          categoryParentId: category_parent_id ?? 0,
        };
        const res: ResultApi<CategoryAdmin> = await requestPostCreateCategory(
          itemCreate
        );
        dispatch(
          createCategoryChilden({ item: res.data, id: category_parent_id })
        );
      }
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
        {TYPE_DIALOG.CREATE === type ? "T???o m???i Category" : `C???p nh???t Category`}
      </DialogTitle>
      <Formik
        initialValues={
          type === TYPE_DIALOG.CREATE
            ? initialValues
            : {
                name: anchorElData?.item.categoryName ?? "",
              }
        }
        onSubmit={(data) => {
          type === TYPE_DIALOG.CREATE
            ? onSubmitCreate({ ...data })
            : onSubmitUpdate(data);
        }}
        validateOnChange
        validationSchema={validateCategory}
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
                C???p nh???t th??ng tin c???a Category, vui l??ng ??i???n t???t c??? th??ng tin
                c???n thi???t
              </DialogContentText>

              <TextInputComponent
                error={errors.name}
                touched={touched.name}
                value={values.name}
                label={"Name Category"}
                onChange={handleChange("name")}
                onBlur={handleBlur("name")}
                isRequire={true}
              />
              {!isParent && (
                <TextInputComponent
                  label="Category cha"
                  value={category}
                  onChange={(event: any) => {
                    const value = event.target.value;
                    setCategory(value);
                  }}
                  isSelected={true}
                  isRequire={true}
                  childrentSeleted={
                    <>
                      <option key={0} value={0}>
                        Ch??a ch???n
                      </option>
                      {data.map((option, index) => (
                        <option key={index} value={option.id}>
                          {option.categoryName}
                        </option>
                      ))}
                    </>
                  }
                />
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={() => handleSubmit()} color="primary">
                Submit
              </Button>
            </DialogActions>
          </>
        )}
      </Formik>
      {isLoading && <LoadingProgress />}
    </Dialog>
  );
};
export default FormDialog;
