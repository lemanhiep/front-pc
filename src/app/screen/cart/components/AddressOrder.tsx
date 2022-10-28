import {
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { EditLocationOutlined } from "@material-ui/icons";
import { colors } from "../../../utils/color";
import { DataAddress } from "../../setting/address/slice/AddressSlice";
interface Props {
  address: DataAddress | null;
  onChoose?: Function;
}
const AddressOrder = (props: Props) => {
  const { address, onChoose } = props;
  const classes = useStyles();
  const renderAddress = (item: DataAddress) => {
    let detail = item.addressDetail;
    let ward = item.ward ? " - " + item.ward.name : "";
    let district = item.district ? " - " + item.district.name : "";
    let province = item.province ? " - " + item.province.name : "";
    return detail + ward + district + province;
  };
  return (
    <div className={classes.container}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography>Địa chỉ nhận hàng: </Typography>
        <p className={classes.textAddress}>
          {address ? renderAddress(address) : "Chưa có địa chỉ, vui lòng chọn!"}
        </p>
        <IconButton
          onClick={() => {
            onChoose && onChoose();
          }}
        >
          <EditLocationOutlined color="action" />
        </IconButton>
      </div>
    </div>
  );
};
export default AddressOrder;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
      paddingTop: 20,
      paddingBottom: 10,
      borderBottomWidth: 0.8,
      borderBottomColor: colors.grayC4,
      marginBottom: 10,
    },
    textAddress: {
      color: colors.gray59,
      fontSize: 16,
      fontStyle: "italic",
      marginLeft: "1%",
    },
  })
);
