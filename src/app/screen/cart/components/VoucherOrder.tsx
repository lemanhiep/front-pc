import { makeStyles } from "@material-ui/core";
import R from "../../../assets/R";
import { VoucherAdmin } from "../../../contant/IntefaceContaint";
import { colors } from "../../../utils/color";
import { formatPrice } from "../../../utils/function";
import ComponentVoucher from "./ComponentVoucher";
interface Props {
  itemVoucher?: VoucherAdmin | null;
  onPress: Function;
  total: number;
}
const VoucherOrder = (props: Props) => {
  const className = useStyles();
  const { itemVoucher, onPress, total } = props;

  return (
    <button
      className={className.root}
      style={{
        borderWidth: itemVoucher ? 0 : 0.5,
        padding: itemVoucher ? 0 : 5,
      }}
      onClick={() => {
        onPress();
      }}
    >
      {itemVoucher ? (
        <ComponentVoucher
          isSelected={false}
          item={itemVoucher}
          onPress={() => {}}
        />
      ) : (
        <div
          style={{
            color: colors.grayC4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <img alt="" src={R.images.ic_voucher} style={{ width: 50 }} />
          <p style={{ marginLeft: 10 }}>Không có khuyến mãi nào được chọn</p>
        </div>
      )}
    </button>
  );
};
export default VoucherOrder;
const useStyles = makeStyles({
  root: {
    borderRadius: 5,
    marginTop: 10,
    borderColor: colors.grayC4,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    marginBottom: 20,
  },
  containerItem: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
  },
});
