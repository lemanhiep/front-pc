import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";
import LoadingProgress from "../component/LoadingProccess";
import TextInputComponent from "../component/TextInputComponent";
import { ROUTE, textValidate } from "../contant/Contant";
import { colors } from "../utils/color";
import { createNotification } from "../utils/MessageUtil";
import { ForgotPassword, requestForgotPassword } from "./AuthApi";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      paddingLeft: "30%",
      paddingRight: "30%",
      paddingTop: 100,
    },
    button: {
      height: 40,
      borderRadius: 8,
      marginTop: 20,
      width: "100%",
      borderColor: colors.black,
      color: colors.black,
      fontWeight: "bold",
    },
    title: {
      textAlign: "left",
      fontSize: 30,
      fontWeight: "bold",
    },
    descriptionText: {
      fontSize: 15,
      color: colors.gray59,
      textAlign: "left",
      marginBottom: 20,
    },
  })
);
interface ChangePassInterface {
  password: string;
  re_password: string;
  code: number;
}
const initValuesLogin: ChangePassInterface = {
  password: "",
  re_password: "",
  code: 0,
};

const ForgotPasswordScreen = () => {
  const className = useStyles();
  const locationValue = useLocation().state;
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(true);
  const [showRePass, setShowRePass] = useState(true);
  const [loading, setLoading] = useState(false);
  const validateLogin = Yup.object({
    password: Yup.string()
      .min(6, textValidate.pass.short)
      .max(25, textValidate.pass.long)
      .required(textValidate.pass.require)
      .trim(),
    re_password: Yup.string()
      .min(6, textValidate.pass.short)
      .max(25, textValidate.pass.long)
      .required(textValidate.re_pass.require)
      .oneOf([Yup.ref("password")], textValidate.re_pass.not_found),
    code: Yup.string()
      .required("Vui lòng nhập code")
      .length(6, "Gồm 6 ký tự")
      .trim(),
  });

  const formik = useFormik({
    initialValues: initValuesLogin,
    onSubmit: (value) => {
      handleSubmit(value);
    },
    validationSchema: validateLogin,
  });

  const handleSubmit = async (data: ChangePassInterface) => {
    const state: any = locationValue;
    const { phone, code } = state;
    if (state.code !== +data.code) {
      createNotification({
        type: "warning",
        message: "Mã xác nhận không đúng",
      });
      return;
    }
    try {
      setLoading(true);
      const payload: ForgotPassword = {
        code: code,
        phone_number: `+84${Number(phone)}`,
        password: data.password,
        confirm: data.re_password,
      };
      await requestForgotPassword(payload);
      createNotification({
        type: "success",
        message: "Đã đổi mật khẩu thành công, vui lòng đăng nhập lại!",
      });
      navigate(ROUTE.LOGIN);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <div className={className.root}>
      <div style={{ width: "100%", position: "relative" }}>
        <p className={className.title}>Đổi mật khẩu</p>
        <div>
          <p className={className.descriptionText}>
            Vui lòng nhập mật khẩu mới và xác nhận
          </p>
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
            error={formik.errors.password}
            touched={formik.touched.password}
            value={formik.values.password}
            label={"Mật khẩu"}
            onChange={formik.handleChange("password")}
            onBlur={formik.handleBlur("password")}
            rightIcon={showPass ? <Visibility /> : <VisibilityOff />}
            type={!showPass ? "text" : "password"}
            onRightIcon={() => {
              setShowPass(!showPass);
            }}
            isRequire
          />
          <TextInputComponent
            error={formik.errors.re_password}
            touched={formik.touched.re_password}
            value={formik.values.re_password}
            label={"Xác nhận mật khẩu"}
            onChange={formik.handleChange("re_password")}
            onBlur={formik.handleBlur("re_password")}
            rightIcon={showRePass ? <Visibility /> : <VisibilityOff />}
            type={!showRePass ? "text" : "password"}
            onRightIcon={() => {
              setShowRePass(!showRePass);
            }}
            isRequire
          />

          <Grid container>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => formik.handleSubmit()}
              className={className.button}
              style={{
                backgroundColor: colors.black,
                borderColor: colors.black,
                color: colors.white,
              }}
            >
              Đổi mật khẩu
            </Button>
          </Grid>
        </div>
      </div>
      {loading && <LoadingProgress />}
    </div>
  );
};
export default ForgotPasswordScreen;
