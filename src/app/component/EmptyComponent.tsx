import R from "../assets/R";
import { colors } from "../utils/color";

const EmptyComponent = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 300,
        flexDirection: "column",
      }}
    >
      <img src={R.images.empty_list} style={{ width: 250 }} alt="" />
      <p style={{ color: colors.grayC4, marginTop: 10 }}>Danh sách rỗng</p>
    </div>
  );
};
export default EmptyComponent;
