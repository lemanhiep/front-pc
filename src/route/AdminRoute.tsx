import { Navigate } from "react-router";
import CategoryScreen from "../app/admin/category/CategoryScreen";
import DashboardScreen from "../app/admin/dashboard/DashboardScreen";
import MaterialScreen from "../app/admin/material/MaterialScreen";
import OptionScreen from "../app/admin/option/OptionScreen";
import OrderScreen from "../app/admin/order/OrderScreen";
import ProductAdminScreen from "../app/admin/product/ProductAdminScreen";
import TagScreen from "../app/admin/tag/TagScreen";
import UserScreen from "../app/admin/user/UserScreen";
import VoucherScreen from "../app/admin/voucher/VoucherScreen";
import { ROUTE, ROUTE_ADMIN } from "../app/contant/Contant";
import { getAdmin, getToken } from "../app/service/StorageService";

export const PRIVATE_ROUTE_ADMIN = [
  {
    route: ROUTE_ADMIN.DASHBOARD,
    screen: <DashboardScreen />,
  },
  {
    route: ROUTE_ADMIN.USER,
    screen: <UserScreen />,
  },
  {
    route: ROUTE_ADMIN.PRODUCT,
    screen: <ProductAdminScreen />,
  },
  {
    route: ROUTE_ADMIN.CATEGORY,
    screen: <CategoryScreen />,
  },
  {
    route: ROUTE_ADMIN.VOUCHER,
    screen: <VoucherScreen />,
  },
  {
    route: ROUTE_ADMIN.MATERIAL,
    screen: <MaterialScreen />,
  },
  {
    route: ROUTE_ADMIN.ORDER,
    screen: <OrderScreen />,
  },
  {
    route: ROUTE_ADMIN.TAG,
    screen: <TagScreen />,
  },
  {
    route: ROUTE_ADMIN.OPTION,
    screen: <OptionScreen />,
  },
];

export function PrivateRouteAdmin(props: { children: any; isAdmin?: boolean }) {
  const { children } = props;
  const token = getToken();
  const admin = getAdmin();
  return token && admin ? children : <Navigate replace to={ROUTE.LOGIN} />;
}
