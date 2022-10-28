import { Route, Routes } from "react-router-dom";
import { PrivateRouteAdmin, PRIVATE_ROUTE_ADMIN } from "../../route/AdminRoute";
import {
  AuthRoute,
  AUTH_ROUTE,
  PrivateRoute,
  PRIVATE_ROUTE,
} from "../../route/DefineRoute";
import { useAppSelector } from "../hooks";

const MainApp = () => {
  const { data } = useAppSelector((state) => state.swicth);
  return (
    <Routes>
      {PRIVATE_ROUTE.map((e, index) => {
        return (
          <Route
            path={e.route}
            element={<PrivateRoute isAdmin={data}>{e.screen}</PrivateRoute>}
            key={index}
          />
        );
      })}
      {AUTH_ROUTE.map((e, index) => {
        return (
          <Route
            path={e.route}
            element={<AuthRoute isAdmin={data}>{e.screen}</AuthRoute>}
            key={index}
          />
        );
      })}
      {PRIVATE_ROUTE_ADMIN.map((e, index) => {
        return (
          <Route
            path={e.route}
            element={
              <PrivateRouteAdmin isAdmin={data}>{e.screen}</PrivateRouteAdmin>
            }
            key={index}
          />
        );
      })}
    </Routes>
  );
};
export default MainApp;
