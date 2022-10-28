import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React from "react";
import { useAppSelector } from "../../hooks";
import { colors } from "../../utils/color";
import { TYPE_ORDER } from "./components/ItemOrderComponent";
import ListOrderComponent from "./components/ListOrderComponent";

function TabPanel(props: {
  [x: string]: any;
  children: any;
  value: any;
  index: any;
}) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index: number) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  containerCountTab: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: colors.grayC4,
    borderRadius: 30,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.gray59,
  },
}));

export default function OrderScreen() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  };

  const dataOrder = useAppSelector((state) => state.orderUser);

  return (
    <div className={classes.root}>
      <Typography className={classes.heading}>Đơn hàng của bạn</Typography>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label={<div>Chờ xác nhận</div>} {...a11yProps(0)} />
          <Tab label={<div>Đã xác nhận</div>} {...a11yProps(1)} />
          <Tab label={<div>Đang vận chuyển</div>} {...a11yProps(2)} />
          <Tab label={<div>Đã tới nơi</div>} {...a11yProps(3)} />
          <Tab label={<div>Thành công</div>} {...a11yProps(4)} />
          <Tab label={<div>Huỷ</div>} {...a11yProps(5)} />
          <Tab label={<div>Đơn hoàn lại</div>} {...a11yProps(6)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ListOrderComponent
          data={dataOrder.pedding.data}
          status={TYPE_ORDER.PENDING}
          loading={dataOrder.pedding.isLoading}
          value={value}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ListOrderComponent
          data={dataOrder.confirm.data}
          status={TYPE_ORDER.CONFIRM}
          loading={dataOrder.confirm.isLoading}
          value={value}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ListOrderComponent
          data={dataOrder.delivery.data}
          status={TYPE_ORDER.DELIVETY}
          loading={dataOrder.delivery.isLoading}
          value={value}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ListOrderComponent
          data={dataOrder.adrived.data}
          status={TYPE_ORDER.RECEIVED}
          loading={dataOrder.adrived.isLoading}
          value={value}
        />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <ListOrderComponent
          data={dataOrder.done.data}
          status={TYPE_ORDER.DONE}
          loading={dataOrder.done.isLoading}
          value={value}
        />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <ListOrderComponent
          data={dataOrder.cancel.data}
          status={TYPE_ORDER.CANCEL}
          loading={dataOrder.cancel.isLoading}
          value={value}
        />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <ListOrderComponent
          data={dataOrder.roll_back.data}
          status={TYPE_ORDER.DELAY}
          loading={dataOrder.roll_back.isLoading}
          value={value}
        />
      </TabPanel>
    </div>
  );
}
