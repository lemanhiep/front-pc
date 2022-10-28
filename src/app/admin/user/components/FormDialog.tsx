import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import LoadingProgress from "../../../component/LoadingProccess";
import TextInputComponent from "../../../component/TextInputComponent";
import {
  NAME_REGEX,
  PHONE_REGEX,
  REG_EMAIL,
  textValidate,
  TYPE_DIALOG,
} from "../../../contant/Contant";
import { ResultApi, UserAdmin } from "../../../contant/IntefaceContaint";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { changeLoading, createUser, updateUser } from "../slice/UserAdminSlice";
import {
  CreateDto,
  requestPostCreateUser,
  requestPutUpdateUser,
  UpdateDto,
} from "../UserApi";
interface Props {
  open: any;
  handleClose: any;
  anchorElData?: { item?: UserAdmin } | null;
  type: number;
  data: UserAdmin[];
}
const validateUser = Yup.object({
  phone: Yup.string()
    .min(10, textValidate.phone.error_validate)
    .max(11, textValidate.phone.error_validate)
    .matches(PHONE_REGEX, textValidate.phone.error_validate)
    .required()
    .trim(),
  email: Yup.string()
    .matches(REG_EMAIL, textValidate.email.error_validate)
    .required(textValidate.email.require)
    .trim(),
  fullname: Yup.string()
    .required(textValidate.full_name.require)
    .matches(NAME_REGEX, textValidate.full_name.error_validate)
    .trim(),
  password: Yup.string()
    .min(6, textValidate.pass.short)
    .max(25, textValidate.pass.long)
    .required(textValidate.pass.require)
    .trim(),
  userName: Yup.string().required(textValidate.user_name.require).trim(),
});

interface PropsCreateUser {
  email: string;
  phone: string;
  fullname: string;
  position: string;
  userName: string;
  password: string;
}
const initialValues: PropsCreateUser = {
  email: "1235name@gmail.com",
  phone: "0955656521",
  fullname: "le cu",
  position: "",
  password: "123456",
  userName: "lecu",
};
const FormDialog = (props: Props) => {
  const dispatch = useAppDispatch();
  const { handleClose, open, anchorElData, type, data } = props;
  const [position, setPosition] = useState("1");
  const [showPass, setShowPass] = useState(true);
  const { isLoading } = useAppSelector((state) => state.userAdmin);
  const onSubmit = async (data: {
    email: string;
    password: string;
    fullname: string;
  }) => {
    const { email, fullname, password } = data;
    if (anchorElData) {
      try {
        dispatch(changeLoading(true));
        const payload: UpdateDto = {
          email: email,
          fullName: fullname,
          id: anchorElData?.item?.id,
          isActive: anchorElData?.item?.isActive,
          password: password,
        };
        const res: ResultApi<UserAdmin> = await requestPutUpdateUser(payload);
        dispatch(updateUser({ item: res.data }));
        dispatch(changeLoading(false));
        handleClose();
      } catch (e) {
        dispatch(changeLoading(false));
      }
    }
  };

  const onSubmitCreate = async (dataCreate: PropsCreateUser) => {
    const { email, fullname, phone, password, userName } = dataCreate;
    try {
      dispatch(changeLoading(true));
      const payload: CreateDto = {
        email: email,
        fullName: fullname,
        password: password,
        phoneNumber: phone,
        username: userName,
        role: +position === 1 ? "Admin" : "User",
      };
      const res: ResultApi<UserAdmin> = await requestPostCreateUser(payload);
      dispatch(createUser({ item: res.data }));
      handleClose();
      dispatch(changeLoading(false));
    } catch (e) {
      dispatch(changeLoading(false));
    }
  };

  const handleChangeRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPosition((event.target as HTMLInputElement).value);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      style={{ width: "100%" }}
    >
      <DialogTitle id="form-dialog-title">
        {TYPE_DIALOG.CREATE === type ? "Tạo mới User" : `Cập nhật User`}
      </DialogTitle>
      <Formik
        initialValues={
          type === TYPE_DIALOG.CREATE
            ? initialValues
            : {
                email: anchorElData?.item?.email ?? "",
                phone: anchorElData?.item?.phoneNumber ?? "",
                fullname: anchorElData?.item?.fullName ?? "",
                password: "",
                userName: anchorElData?.item?.username ?? "",
              }
        }
        onSubmit={(data) => {
          type === TYPE_DIALOG.CREATE
            ? onSubmitCreate({ ...data, position: "Admin" })
            : onSubmit(data);
        }}
        validateOnChange
        validationSchema={validateUser}
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
                Cập nhật thông tin cá nhân của user, vui lòng điền tất cả thông
                tin cần thiết
              </DialogContentText>
              <TextInputComponent
                error={errors.email}
                touched={touched.email}
                value={values.email}
                label={"Email"}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                isRequire
              />
              <TextInputComponent
                error={errors.phone}
                touched={touched.phone}
                value={values.phone}
                label={"Số điện thoại"}
                onChange={handleChange("phone")}
                onBlur={handleBlur("phone")}
                disabled={TYPE_DIALOG.CREATE === type ? false : true}
                isRequire
              />
              <TextInputComponent
                error={errors.fullname}
                touched={touched.fullname}
                value={values.fullname}
                label={"Tên họ đầy đủ"}
                onChange={handleChange("fullname")}
                onBlur={handleBlur("fullname")}
                isRequire
              />
              <TextInputComponent
                error={errors.userName}
                touched={touched.userName}
                value={values.userName}
                label={"Tên đăng nhập"}
                onChange={handleChange("userName")}
                onBlur={handleBlur("userName")}
                disabled={TYPE_DIALOG.CREATE === type ? false : true}
                isRequire
              />
              <TextInputComponent
                error={errors.password}
                touched={touched.password}
                value={values.password}
                label={"Mật khẩu mới"}
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
                type={!showPass ? "text" : "password"}
                isRequire
              />
             <FormControl component="fieldset">
                <FormLabel component="legend">Role</FormLabel>
                <RadioGroup
                  aria-label="role"
                  name="role1"
                  value={position}
                  onChange={handleChangeRole}
                  row
                  defaultValue={position}
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Admin"
                    disabled={TYPE_DIALOG.CREATE === type ? false : true}
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="Customer"
                    disabled={TYPE_DIALOG.CREATE === type ? false : true}
                  />
                </RadioGroup>
              </FormControl>
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
      {isLoading && <LoadingProgress />}
    </Dialog>
  );
};
export default FormDialog;
