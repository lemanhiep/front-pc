import { IconButton, makeStyles } from "@material-ui/core";
import { LocalActivity, LocationOn } from "@material-ui/icons";
import { colors } from "../../../../utils/color";
import { DataAddress } from "../slice/AddressSlice";
interface Prop {
  item: DataAddress;
  onClick: Function;
}
const ItemAddress = (props: Prop) => {
  const { item, onClick } = props;
  const className = useStyles();
  const renderAddress = (item: DataAddress) => {
    let detail = item.addressDetail;
    let ward = item.ward ? " - " + item.ward.name : "";
    let district = item.district ? " - " + item.district.name : "";
    let province = item.province ? " - " + item.province.name : "";
    return detail + ward + district + province;
  };
  return (
    <div className={className.root}>
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <LocationOn color="secondary" />
        </div>
        <div style={{ marginLeft: 10 }}>
          <p style={{ color: colors.black, fontWeight: "bold" }}>
            {renderAddress(item)}
          </p>
          {/* <p style={{ color: colors.gray59 }}>
            {item.name} | {item.phone}
          </p> */}
        </div>
      </div>
      <div>
        <IconButton
          onClick={() => {
            onClick();
          }}
        >
          <LocalActivity color={item.isDefault ? "secondary" : "inherit"} />
        </IconButton>
      </div>
    </div>
  );
};
export default ItemAddress;

const useStyles = makeStyles({
  root: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    paddingTop: 10,
    borderColor: colors.grayC4,
    borderRadius: 5,
    borderWidth: 0.8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
});
