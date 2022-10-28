import { makeStyles } from "@material-ui/core";
import { Check } from "@material-ui/icons";
import clsx from "clsx";
import R from "../../../assets/R";
import { VoucherAdmin } from "../../../contant/IntefaceContaint";
import { colors } from "../../../utils/color";

interface Props {
  item: VoucherAdmin;
  onPress: Function;
  isSelected: boolean;
  inList?: boolean;
  style?: any;
}

const ComponentVoucher = (props: Props) => {
  const classes = useStyles();
  const { item, onPress, isSelected, inList, style } = props;
  return (
    <button
      className={clsx(classes.root, style)}
      onClick={() => {
        onPress();
      }}
    >
      <div className={classes.containerInfo}>
        <p className={classes.textTitle}>{item.eventName}</p>
        <p className={classes.textDescrition}>{item.description}</p>
        {inList && (
          <div className={classes.containerTime}>
            <div>
              <p>start time</p>
              <p className={classes.textTime}>{item.startTime}</p>
            </div>
            {"-->"}
            <div>
              <p>end time</p>
              <p className={classes.textTime}>{item.endTime}</p>
            </div>
          </div>
        )}
        {/* <p className={classes.textDiscountPercent}>
          Discount: {item.discountPersent} %
        </p> */}
      </div>
      <div>
        {isSelected ? (
          <Check style={{ color: "green" }} />
        ) : (
          <img alt="" src={R.images.ic_voucher} style={{ width: 80 }} />
        )}
      </div>
    </button>
  );
};
export default ComponentVoucher;

const useStyles = makeStyles({
  root: {
    padding: 15,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: colors.grayC4,
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
    alignItems: "center",
  },
  textDiscountPercent: {
    color: colors.gray59,
    fontWeight: "bold",
    fontSize: 18,
  },
  containerInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  textTitle: {
    fontWeight: "bold",
    fontSize: 17,
  },
  textDescrition: {
    fontSize: 14,
    color: colors.gray59,
  },
  textTime: {
    fontWeight: "bold",
    fontSize: 14,
  },
  containerTime: {
    display: "flex",
  },
});
