import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { colors } from "../../utils/color";

const FooterComponent = () => {
  const className = useStyles();
  return (
    <div className={className.root}>
      <div className={className.containerInfoCompany}>
        <p className={className.textStore}>ADAM STORE</p>
        <p className={className.textDescription}>

        </p>
        <p className={className.textDescription}>
          24/7, tất cả các ngày trong tuần
        </p>
        <p style={{ fontWeight: "bold", marginTop: 5 }}>
          Địa chỉ văn phòng:{" "}
          <p
            style={{ fontSize: 15, color: colors.gray59, fontWeight: "normal" }}
          >
          Số 23, ngách 22/127, đường Khuyến Lương, phường Trần Phú, quận Hoàng Mai, Hà Nội, 
          </p>
        </p>
      </div>
      <div
        className={className.containerInfoCompany}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: "48%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <p className={className.textTitle}>Giới thiệu</p>
          <button className={className.button}>Giới thiệu</button>
          <button className={className.button}>Hệ thống cửa hàng</button>
          <button className={className.button}>Liên hệ</button>
          <button className={className.button}>Chính sách bảo mật</button>
        </div>
        <div
          style={{
            width: "48%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <p className={className.textTitle}>Chính sách</p>
          <button className={className.button}>Chính sách thành toán</button>
          <button className={className.button}>Hướng dẫn chọn đồ</button>
          <button className={className.button}>Hướng dẫn thanh toán</button>
          <button className={className.button}>Chính sách vận chuyển</button>
        </div>
      </div>
      <div className={className.containerInfoCompany}>
        {/* <p className={className.textStore}>ADAM STORE</p> */}
      </div>
    </div>
  );
};
export default FooterComponent;
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      padding: 10,
      marginTop: 100,
      paddingLeft: "10%",
      paddingRight: "10%",
      paddingTop: 20,
      paddingBottom: 40,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "rgba(0,0,0,0.03)",
    },
    containerInfoCompany: {
      width: "30%",
      height: "100%",
    },
    textStore: {
      fontSize: 35,
      fontWeight: "bold",
      fontStyle: "italic",
      color: colors.black,
    },
    textTitle: {
      fontSize: 20,
      color: colors.black,
      paddingBottom: 10,
      fontWeight: "bold",
    },
    textDescription: {
      fontWeight: "bold",
    },
    button: {
      fontSize: 14,
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 5,
      width: "100%",
      borderRadius: 5,
      "&:hover": {
        backgroundColor: "rgba(0,0,0,0.1)",
      },
      textAlign: "left",
    },
  })
);
