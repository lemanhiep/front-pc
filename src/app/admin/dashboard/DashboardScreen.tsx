import { createStyles, makeStyles, Paper, Theme } from "@material-ui/core";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import LoadingProgress from "../../component/LoadingProccess";
import { ResultApi } from "../../contant/IntefaceContaint";
import { requestGetOrderStatistic } from "../order/OrderApi";
import { requestGetUserStatistic } from "../user/UserApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const chartOption = (title: string) => {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Doanh thu",
      data: [0, 0, 0, 0, 0, 0, 0],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Doanh số",
      data: [0, 0, 0, 0, 0, 0, 0, 0],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export const dataBarChart = {
  labels,
  datasets: [
    {
      label: "Người dùng mua hàng",
      data: [0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Người dùng vào trang web",
      data: [0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export const dataBarChartOrder = {
  labels,
  datasets: [
    {
      label: "Tổng đơn hàng",
      data: [0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: "rgba(125, 200, 125, 0.5)",
    },
    {
      label: "Đơn hàng thành công",
      data: [0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Đơn hàng hoàn",
      data: [0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export const ColorData = [
  "rgba(125, 200, 125, 0.5)",
  "rgba(53, 162, 235, 0.5)",
  "rgba(255, 99, 132, 0.5)",
  "rgba(0, 165, 235, 0.5)",
];

interface DataSets {
  label: string;
  data: any[];
  backgroundColor: string;
  borderColor: string;
}

interface ChartDto {
  labels: string[];
  datasets: DataSets[];
}

interface ResultApiStatistic {
  name: string;
  labels: string[];
  data: any[];
}

const DashboardScreen = () => {
  const className = useStyles();
  const [loading, setLoading] = useState(false);
  const [userStatistic, setUserStatistic] = useState<ChartDto>({
    labels: [],
    datasets: [],
  });
  const [orderStatistic, setOrderStatistic] = useState<ChartDto>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const resultUser: ResultApi<ResultApiStatistic[]> =
        await requestGetUserStatistic();
      const resultOrder: ResultApi<ResultApiStatistic[]> =
        await requestGetOrderStatistic();
      let labelUser: string[] = resultUser.data[0].labels;
      let dataSetsUser: DataSets[] = resultUser.data.map((e, index) => {
        return {
          data: e.data,
          backgroundColor: ColorData[index],
          label: e.name,
          borderColor: ColorData[index],
        };
      });
      setUserStatistic({ labels: labelUser, datasets: dataSetsUser });
      let labelOrder: string[] = resultOrder.data[0].labels;
      let dataSetsOrder: DataSets[] = resultOrder.data.map((e, index) => {
        return {
          data: e.data,
          backgroundColor: ColorData[index],
          label: e.name,
          borderColor: ColorData[index],
        };
      });
      setOrderStatistic({ labels: labelOrder, datasets: dataSetsOrder });
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <div className={className.root}>
      <Paper className={className.root}>
        <Bar
          options={chartOption("Thống kê tài khoản")}
          data={
            userStatistic?.labels?.length > 0
              ? userStatistic
              : dataBarChartOrder
          }
          style={{ maxHeight: 400, width: "100%" }}
        />
      </Paper>
      <Paper className={className.root} style={{marginTop: 10}}>
        <Line
          options={chartOption("Thống kê đơn hàng")}
          data={
            orderStatistic?.labels?.length > 0
              ? orderStatistic
              : dataBarChartOrder
          }
          style={{ maxHeight: 400, width: "100%" }}
        />
      </Paper>
      {loading && <LoadingProgress />}
    </div>
  );
};
export default DashboardScreen;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 5,
      position: "relative",
    },
  })
);
