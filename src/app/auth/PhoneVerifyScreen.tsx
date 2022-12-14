import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import LoadingProgress from "../component/LoadingProccess";
import TextInputComponent from "../component/TextInputComponent";
import { PHONE_REGEX, ROUTE, textValidate } from "../contant/Contant";
import { ResultApi } from "../contant/IntefaceContaint";
import { colors } from "../utils/color";
import { createNotification } from "../utils/MessageUtil";
import { requestVerifyPhone } from "./AuthApi";
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
      width: "50%",
      borderColor: colors.black,
      color: colors.black,
      fontWeight: "bold",
    },
    textForgotPass: {
      color: colors.gray59,
      fontSize: 16,
      marginTop: 15,
      textAlign: "left",
      fontWeight: "bolder",
      flex: 1,
      alignSelf: "center",
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
interface LoginInterface {
  phone: string;
}
const initValuesLogin: LoginInterface = {
  phone: "",
};

const PhoneVerifyScreen = () => {
  const className = useStyles();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const validateLogin = Yup.object({
    phone: Yup.string()
      .matches(PHONE_REGEX, textValidate.phone.error_validate)
      .min(10, "Mininum 2 characters")
      .max(10, "Maximum 10 characters")
      .required("Required!"),
  });

  const formik = useFormik({
    initialValues: initValuesLogin,
    onSubmit: (value) => {
      handleSubmit(value);
    },
    validationSchema: validateLogin,
  });

  const handleSubmit = async (data: LoginInterface) => {
    try {
      setLoading(true);
      const resultCode: ResultApi<any> = await requestVerifyPhone({
        phone: `+84${Number(data.phone)}`,
      });
      createNotification({
        type: "success",
        message: "S??? ??i???n tho???i ???? ????ng",
      });
      navigate(ROUTE.REGISTER, {
        state: { phone: data.phone, code: resultCode.data },
        replace: true,
      });
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <div className={className.root}>
      <div style={{ width: "100%" }}>
        <p className={className.title}>????ng k?? m???i t??i kho???n</p>
        <div>
          <p className={className.descriptionText}>
            Vui l??ng nh???p s??? ??i???n tho???i
          </p>
          <TextInputComponent
            error={formik.errors.phone}
            touched={formik.touched.phone}
            value={formik.values.phone}
            label={"S??? ??i???n tho???i"}
            onChange={formik.handleChange("phone")}
            onBlur={formik.handleBlur("phone")}
            isRequire
          />

          <Grid container>
            <p className={className.textForgotPass}>
              <button
                onClick={() => {
                  navigate(ROUTE.LOGIN);
                }}
              >
                Quay l???i
              </button>
            </p>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                formik.handleSubmit();
              }}
              className={className.button}
              style={{
                backgroundColor: colors.black,
                borderColor: colors.black,
                color: colors.white,
                marginLeft: "10%",
              }}
            >
              Ti???p t???c ????ng k??
            </Button>
          </Grid>
        </div>
      </div>
      {loading && <LoadingProgress />}
    </div>
  );
};
export default PhoneVerifyScreen;
