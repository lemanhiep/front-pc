import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { useFormik } from "formik";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import R from "../assets/R";
import LoadingProgress from "../component/LoadingProccess";
import TextInputComponent from "../component/TextInputComponent";
import { NAME_REGEX, REG_EMAIL, ROUTE, textValidate } from "../contant/Contant";
import { ResultApi } from "../contant/IntefaceContaint";
import { setIdAccount, setToken } from "../service/StorageService";
import { colors } from "../utils/color";
import { createNotification } from "../utils/MessageUtil";
import { RegisterDto, requestPostRegister, ResultLogin } from "./AuthApi";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      position: "relative",
    },
    container: {
      flexFlow: "row",
      flexGrow: 1,
    },
    button: {
      height: 40,
      borderRadius: 8,
      marginTop: 20,
      width: "100%",
      borderColor: "black",
      color: "black",
    },
    textForgotPass: {
      color: "black",
      fontSize: 15,
      marginTop: 15,
    },
    textCreateAccount: {
      color: "black",
      fontSize: 15,
      marginTop: 15,
    },
    title: {
      textAlign: "left",
      fontSize: 40,
      fontWeight: "bold",
    },
    descriptionText: {
      fontSize: 15,
      color: colors.gray59,
    },
  })
);
interface RegisterInterface {
  email: string;
  password: string;
  re_password: string;
  code: string;
  fullname: string;
  username: string;
}
const initValuesRegister: RegisterInterface = {
  password: "",
  email: "",
  fullname: "",
  code: "",
  re_password: "",
  username: "",
};

const RegisterScreen = () => {
  const className = useStyles();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(true);
  const [showRePass, setShowRePass] = useState(true);
  const [loading, setLoading] = useState(false);
  const location = useLocation().state;

  const validateRegister = Yup.object({
    password: Yup.string()
      .min(6, textValidate.pass.short)
      .max(25, textValidate.pass.long)
      .required(textValidate.pass.require)
      .trim(),
    email: Yup.string()
      .matches(REG_EMAIL, textValidate.email.error_validate)
      .required(textValidate.email.require)
      .trim(),
    code: Yup.string()
      .required("Vui lòng nhập code")
      .length(6, "Gồm 6 ký tự")
      .trim(),
    fullname: Yup.string()
      .required(textValidate.full_name.require)
      .matches(NAME_REGEX, textValidate.full_name.error_validate)
      .trim(),
    username: Yup.string().required(textValidate.user_name.require).trim(),
    re_password: Yup.string()
      .min(6, textValidate.pass.short)
      .max(25, textValidate.pass.long)
      .required(textValidate.re_pass.require)
      .oneOf([Yup.ref("password")], textValidate.re_pass.not_found),
  });

  const formik = useFormik({
    initialValues: initValuesRegister,
    onSubmit: (value) => {
      handleSubmit(value);
    },
    validationSchema: validateRegister,
  });

  const handleSubmit = async (data: RegisterInterface) => {
    const state: any = location;
    if (state.code !== +data.code) {
      createNotification({
        type: "warning",
        message: "Mã xác nhận không đúng",
      });
      return;
    }
    try {
      setLoading(true);
      const payload: RegisterDto = {
        email: data.email,
        fullName: data.fullname,
        password: data.password,
        phoneNumber: state.phone,
        role: "User",
        username: data.username,
        code: state.code,
      };
      const res: ResultApi<ResultLogin> = await requestPostRegister(payload);
      setToken(res.data.token);
      setIdAccount(`${res.data.id}`);
      navigate(ROUTE.HOME);
      createNotification({ message: "Đăng ký thành công", type: "success" });
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <div className={className.root}>
      <Grid container spacing={1}>
        <div style={{ width: "50%" }}>
          <p className={className.title}>Đăng ký</p>
          <p className={className.descriptionText}>
            Hãy đăng ký để hưởng nhiều ưu đãi khác nhau của chúng tôi, AdamStore
          </p>
          <TextInputComponent
            error={formik.errors.email}
            touched={formik.touched.email}
            value={formik.values.email}
            label={"Email"}
            onChange={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
            isRequire
          />
          <TextInputComponent
            error={formik.errors.code}
            touched={formik.touched.code}
            value={formik.values.code}
            label={"Mã được gửi về thiết bị"}
            onChange={formik.handleChange("code")}
            onBlur={formik.handleBlur("code")}
            isRequire
          />
          <TextInputComponent
            error={formik.errors.username}
            touched={formik.touched.username}
            value={formik.values.username}
            label={"Tên đăng nhập"}
            onChange={formik.handleChange("username")}
            onBlur={formik.handleBlur("username")}
            isRequire
          />
          <TextInputComponent
            error={formik.errors.fullname}
            touched={formik.touched.fullname}
            value={formik.values.fullname}
            label={"Tên họ đầy đủ"}
            onChange={formik.handleChange("fullname")}
            onBlur={formik.handleBlur("fullname")}
            isRequire
          />
          <TextInputComponent
            error={formik.errors.password}
            touched={formik.touched.password}
            value={formik.values.password}
            label={"Mật khẩu"}
            onChange={formik.handleChange("password")}
            onBlur={formik.handleBlur("password")}
            type={!showPass ? "text" : "password"}
            isRequire
          />

          <TextInputComponent
            error={formik.errors.re_password}
            touched={formik.touched.re_password}
            value={formik.values.re_password}
            label={"Xác nhận mật khẩu"}
            onChange={formik.handleChange("re_password")}
            onBlur={formik.handleBlur("re_password")}
            type={!showRePass ? "text" : "password"}
            isRequire
          />

          <Button
            variant="outlined"
            color="primary"
            onClick={() => formik.handleSubmit()}
            className={className.button}
          >
            Đăng ký
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              navigate(ROUTE.LOGIN);
            }}
            className={className.button}
            style={{
              backgroundColor: colors.black,
              borderColor: colors.black,
              color: colors.white,
            }}
          >
            Quay lại đăng nhập
          </Button>
        </div>
        <div
          style={{
            paddingLeft: "3%",
            width: "50%",
            paddingTop: 20,
            alignSelf: "center",
            scrollBehavior: "auto",
          }}
        >
          <img
            style={{ width: "95%", minWidth: 500 }}
            src={R.images.img_banner_fashion}
            alt=""
          />
        </div>
      </Grid>
      {loading && <LoadingProgress />}
    </div>
  );
};
export default RegisterScreen;
