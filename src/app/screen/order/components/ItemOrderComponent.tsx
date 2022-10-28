import { Button } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { LocationOn } from "@material-ui/icons";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import R from "../../../assets/R";
import { ItemCart } from "../../../contant/Contant";
import { colors } from "../../../utils/color";
import { formatPrice } from "../../../utils/function";
import { OrderDto } from "../slice/OrderSlice";
import TimeLineComponent from "./TimeLineComponent";

interface Props {
  item: OrderDto;
  handleCancel?: Function
}

export const TYPE_ORDER = {
  PENDING: 1,
  CONFIRM: 2,
  DELIVETY: 7,
  RECEIVED: 3,
  DONE: 6,
  CANCEL: 0,
  DELAY: 4,
  CHECKING: 5,
  PAYBACK: -1,
};

export const DEFINE_ORDER = {
  [TYPE_ORDER.PENDING]: {
    title: "Đang chờ",
    icon: R.images.ic_voucher,
    description: "Đơn của bạn đang đợi nhân viên xác nhận",
    color: colors.gray59,
  },
  [TYPE_ORDER.CONFIRM]: {
    title: "Đã xác nhận",
    icon: R.images.ic_voucher,
    description: "Đơn của bạn đang đợi nhân viên xác nhận",
    color: colors.green,
  },
  [TYPE_ORDER.DELIVETY]: {
    title: "Đang vận chuyển",
    icon: R.images.ic_voucher,
    description: "Đơn của bạn đang đợi nhân viên xác nhận",
    color: colors.green,
  },
  [TYPE_ORDER.DONE]: {
    title: "Thành công",
    icon: R.images.ic_voucher,
    description: "Đơn của bạn đang đợi nhân viên xác nhận",
    color: colors.green,
  },
  [TYPE_ORDER.CANCEL]: {
    title: "Huỷ",
    icon: R.images.ic_voucher,
    description: "Đơn của bạn đang đợi nhân viên xác nhận",
    color: colors.red,
  },
  [TYPE_ORDER.DELAY]: {
    title: "Đơn trả",
    icon: R.images.ic_voucher,
    description: "Đơn của bạn đã được hoàn trả",
    color: colors.orange,
  },
  [TYPE_ORDER.RECEIVED]: {
    title: "Đã đến nơi",
    icon: R.images.ic_voucher,
    description: "Đơn hàng của bạn đã đến nơi",
    color: colors.green,
  },
  [TYPE_ORDER.CHECKING]: {
    title: "Kiểm tra đơn hàng",
    icon: R.images.ic_voucher,
    description: "Kiểm tra đơn hàng",
    color: colors.red,
  },
  [TYPE_ORDER.PAYBACK]: {
    title: "Đổi trả hàng",
    icon: R.images.ic_voucher,
    description: "Đổi trả hàng",
    color: colors.red,
  },
};

export const ItemProduct = (props: { item?: ItemCart; inList?: boolean }) => {
  const { item, inList } = props;
  const classes = useStyles();
  return (
    <div
      style={{
        marginTop: 10,
        padding: 10,
        display: "flex",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
        }}
      >
        <img alt="" src={R.images.img_product} style={{ width: 50 }} />
        <div style={{ flex: 1, paddingLeft: 20 }}>
          <Typography className={classes.heading}>
            {item?.detailProduct.product.productName}
          </Typography>
          <Typography
            className={classes.secondaryHeading}
            style={{ display: "flex" }}
          >
            Price:
            <Typography className={classes.heading}>
              {formatPrice(item?.detailProduct.priceExport ?? 0)}đ
            </Typography>
          </Typography>
          <Typography
            className={classes.secondaryHeading}
            style={{ display: "flex" }}
          >
            Total price:
            <Typography className={classes.heading}>
              {formatPrice(item?.totalPrice ?? 0)}đ
            </Typography>
          </Typography>
        </div>
      </div>
      {inList && <p>x{item?.quantity}</p>}
    </div>
  );
};

export default function ItemOrderComponent(props: Props) {
  const { item ,handleCancel} = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className={classes.root}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <div style={{ width: "100%" }}>
            <div
              style={{
                width: "100%",
                paddingTop: 10,
                paddingBottom: 5,
                borderBottomColor: colors.grayC4,
                borderBottomWidth: 0.7,
                borderTopColor: colors.grayC4,
                borderTopWidth: 0.7,
                marginBottom: 5,

                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography className={classes.heading}>
                {`${item.orderCode}`.slice(0, 10)}
              </Typography>
              <Typography className={classes.secondaryHeading}>
                {item.createDate}
              </Typography>
            </div>
            <div style={{ paddingLeft: 20 }}>
              {item.cartItems?.map((e, index) => {
                return (
                  <Typography
                    key={index}
                    className={classes.secondaryHeading}
                    style={{ fontSize: 14 }}
                  >
                    {e.detailProduct.product.productName} |{" "}
                    {formatPrice(e.detailProduct.priceExport)}đ | x{e.quantity}
                  </Typography>
                );
              })}
            </div>
            <Typography className={classes.heading}>
              Tổng tiền: {formatPrice(item.totalPrice)}đ
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.detailInformation}>
          <TimeLineComponent list={item.historyOrders} />
          <div style={{ paddingTop: 10 }}>
            <div style={{ display: "flex", paddingTop: 5 }}>
              <LocationOn />
              <div style={{ paddingLeft: 15 }}>
                <Typography className={classes.heading}>
                  {item.fullName} | {item.phoneNumber}
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  {`${item.addressDetail} | ${item.address.ward.name} | ${item.address.district.name} | ${item.address.province.name}`}
                </Typography>
              </div>
            </div>
          </div>
          <div className={classes.containerListProducts}>
            {item.cartItems?.map((e, index) => {
              return <ItemProduct item={e} key={index} inList={true} />;
            })}
          </div>
          <div style={{ display: "flex" }}>
            <div>
              <Typography className={classes.heading}>
                Tổng tiền hàng
              </Typography>
              <Typography className={classes.heading}>Giảm giá</Typography>
              <Typography className={classes.heading}>Thành tiền</Typography>
            </div>
            <div style={{ paddingLeft: 20 }}>
              <Typography className={classes.secondaryHeading}>
                {formatPrice(item.amountPrice)}đ
              </Typography>
              <Typography className={classes.secondaryHeading}>
                {formatPrice(item.salePrice)}đ
              </Typography>
              <Typography className={classes.secondaryHeading}>
                {formatPrice(item.totalPrice)}đ
              </Typography>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              alignItems: "flex-end",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Button variant="outlined" color="secondary" onClick={()=>{
              handleCancel && handleCancel()
            }}>
              Huỷ
            </Button>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      marginTop: 10,
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: "bold",
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    detailInformation: {
      borderTopWidth: 0.5,
      borderTopColor: colors.grayC4,
      display: "flex",
      flexDirection: "column",
      paddingLeft: 40,
    },
    containerListProducts: {
      display: "flex",
      flexDirection: "column",
      padding: 15,
      paddingLeft: 30,
    },
  })
);
