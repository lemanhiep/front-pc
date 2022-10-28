import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import MaterialAdminSlice from "./admin/material/slice/MaterialAdminSlice";
import OptionAdminSlice from "./admin/option/slice/OptionSizeSlice";
import OptionColorSlice from "./admin/option/slice/OptionColorSlice";
import switchRoleSlice from "./admin/sliceSwitchRole/switchRoleSlice";
import TagAdminSlice from "./admin/tag/slice/TagAdminSlice";
import userAdminReducer from "./admin/user/slice/UserAdminSlice";
import VoucherAdminSlice from "./admin/voucher/slice/VoucherAdminSlice";
import cartReducer from "./screen/cart/slice/CartSlice";
import homeReducer from "./screen/home/slice/HomeSlice";
import OrderSlice from "./screen/order/slice/OrderSlice";
import ProductCustomerSlice from "./screen/product/slice/ProductCustomerSlice";
import FilterValueSlice from "./screen/product/slice/FilterValueSlice";
import CategoryAdminSlice from "./admin/category/slice/CategoryAdminSlice";
import ProductAdminSlice from "./admin/product/slice/ProductAdminSlice";
import AddressSlice from "./screen/setting/address/slice/AddressSlice";
import ProvinceSlice from "./screen/setting/address/slice/ProvinceSlice";
import AccountSlice from "./screen/setting/account/slice/AccountSlice";
import OrderAdminSlice from "./admin/order/slice/OrderAdminSlice";
import FavoritesSlice from "./screen/favorite/slice/FavoritesSlice";

export const store = configureStore({
  reducer: {
    home: homeReducer,
    cart: cartReducer,
    userAdmin: userAdminReducer,
    categoryAdmin: CategoryAdminSlice,
    swicth: switchRoleSlice,
    voucherAdmin: VoucherAdminSlice,
    addressUser: AddressSlice,
    orderUser: OrderSlice,
    materialAdmin: MaterialAdminSlice,
    tagAdmin: TagAdminSlice,
    optionAdmin: OptionAdminSlice,
    productAdmin: ProductAdminSlice,
    colorAdmin: OptionColorSlice,
    productCustomer: ProductCustomerSlice,
    filterCustomer: FilterValueSlice,
    provinceSlice: ProvinceSlice,
    userSlice: AccountSlice,
    orderAdmin: OrderAdminSlice,
    favoritesSlice: FavoritesSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
