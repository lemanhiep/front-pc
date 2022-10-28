import { Button, Checkbox, IconButton } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Delete from "@material-ui/icons/Delete";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import LoadingProgress from "../../component/LoadingProccess";
import { LIST_VOUCHER } from "../../contant/ContaintDataAdmin";
import { ItemCart, ROUTE, TYPE_ACCOUNT } from "../../contant/Contant";
import { VoucherAdmin } from "../../contant/IntefaceContaint";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getIdAccount } from "../../service/StorageService";
import { colors } from "../../utils/color";
import { formatPrice, FunctionUtil } from "../../utils/function";
import { createNotification } from "../../utils/MessageUtil";
import { CreateOrderDto, requestPostCreateOrder } from "../order/OrderApi";
import { getAddressInfo } from "../setting/address/slice/AddressSlice";
import {
  requestDeleteCart,
  requestPutUpdateCart,
  UpdateCartDto
} from "./CartApi";
import AddressOrder from "./components/AddressOrder";
import FormDialogAddress from "./components/FormDialogAddress";
import FormDialogVoucher from "./components/FormDialogVoucher";
import {
  changeLoading,
  deleteItemCart,
  deleteMoreCart,
  incrementAsyncCart,
  updateQuantity
} from "./slice/CartSlice";

const useStyles = makeStyles({
  table: {
    minWidth: "80%",
  },
  buttonQuantity: {
    width: 25,
    height: 25,
    borderColor: colors.grayC4,
    borderWidth: 0.8,
    borderRadius: 5,
    marginRight: 10,
    marginLeft: 10,
  },
});

function subtotal(items: ItemCart[]) {
  return items
    .map(({ detailProduct, quantity }) => detailProduct.priceExport * quantity)
    .reduce((sum: any, i: any) => sum + i, 0);
}

const CartScreen = () => {
  const classes = useStyles();
  const [selected, setSelected] = React.useState<string[]>([]);
  const isSelected = (name: string) => selected.indexOf(name) !== -1;
  const { data, isLoading } = useAppSelector((state) => state.cart);
  const address = useAppSelector((state) => state.addressUser);

  const [openVoucher, setOpenVoucher] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<VoucherAdmin | null>(
    null
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const accountId = getIdAccount();

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    dispatch(getAddressInfo(Number(accountId)));
    dispatch(incrementAsyncCart());
  };

  const checkTotal = () => {
    let array: ItemCart[] = [];
    selected.forEach((a) => {
      const exist = data.find((e) => e.id === Number(a));
      if (exist) array = array.concat([exist]);
    });
    return subtotal(array);
  };

  const checkDiscount = () => {
    return 0;
  };

  const handlePayment = async () => {
    const idAccount = getIdAccount();
    const payload: CreateOrderDto = {
      accountId: Number(idAccount),
      addressDetail: address.dataSelected?.addressDetail,
      addressId: address.dataSelected?.id,
      cartItemIdList: selected.map((e) => Number(e)),
      fullName: address.dataSelected?.fullName,
      phoneNumber: address.dataSelected?.phoneNumber,
    };
    try {
      dispatch(changeLoading(true));
      await requestPostCreateOrder(payload);
      createNotification({
        type:"success",
        message: "Tạo mới đơn hàng thành công"
      })
      navigate(ROUTE.ACCOUNT, { state: { type: TYPE_ACCOUNT.ORDER } });
      dispatch(changeLoading(false));
    } catch (e) {
      dispatch(changeLoading(false));
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <AddressOrder
        address={address.dataSelected}
        onChoose={() => {
          setOpenAddress(!openAddress);
        }}
      />
      {/* <VoucherOrder
        onPress={() => {
          setOpenVoucher(!openVoucher);
        }}
        itemVoucher={selectedVoucher}
        total={checkTotal()}
      /> */}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" align="center">
                {selected.length > 0 && (
                  <IconButton
                    onClick={() => {
                      dispatch(deleteMoreCart({ array: selected }));
                      setSelected([]);
                      if (selected.length === data.length) {
                        navigate(ROUTE.PRODUCT);
                      }
                    }}
                  >
                    <Delete color="secondary" fontSize="small" />
                  </IconButton>
                )}
              </TableCell>

              <TableCell align="center" colSpan={4}>
                Details
              </TableCell>
              <TableCell align="right" />
              <TableCell align="right">Price</TableCell>
            </TableRow>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selected.length > 0 && selected.length < data?.length
                  }
                  checked={
                    data && data?.length > 0 && selected.length === data?.length
                  }
                  onChange={(event) => {
                    setSelected(FunctionUtil.handleSelectAllClick(event, data));
                  }}
                  inputProps={{ "aria-label": "select all desserts" }}
                />
              </TableCell>
              <TableCell>Id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Option(color/size)</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Sum</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row, index) => {
                const isItemSelected = isSelected(`${row.id}`);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow key={row.id}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                        onClick={(event) => {
                          setSelected(
                            FunctionUtil.handleClick(
                              event,
                              `${row.id}`,
                              selected
                            )
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell align="right">
                      {row.detailProduct.product.productName}
                    </TableCell>
                    <TableCell align="right">
                      {row.detailProduct.color.colorName ?? ""}
                      {row.detailProduct.size.sizeName
                        ? "/" + row.detailProduct.size.sizeName
                        : ""}
                    </TableCell>
                    <TableCell align="right">
                      <button
                        className={classes.buttonQuantity}
                        onClick={async () => {
                          if (row.quantity > 1) {
                            dispatch(changeLoading(true));
                            const payload: UpdateCartDto = {
                              id: row.id,
                              quantity: row.quantity - 1,
                              totalPrice:
                                row.quantity -
                                1 * row.detailProduct.priceExport,
                            };
                            await requestPutUpdateCart(payload);
                            dispatch(
                              updateQuantity({
                                id: row.id,
                                new_quantity: row.quantity - 1,
                              })
                            );
                            dispatch(changeLoading(false));
                          }
                        }}
                      >
                        -
                      </button>
                      {row.quantity}
                      <button
                        className={classes.buttonQuantity}
                        onClick={async () => {
                          dispatch(changeLoading(true));
                          const payload: UpdateCartDto = {
                            id: row.id,
                            quantity: row.quantity + 1,
                            totalPrice:
                              row.quantity + 1 * row.detailProduct.priceExport,
                          };
                          await requestPutUpdateCart(payload);

                          dispatch(
                            updateQuantity({
                              id: row.id,
                              new_quantity: row.quantity + 1,
                            })
                          );
                          dispatch(changeLoading(false));
                        }}
                      >
                        +
                      </button>
                    </TableCell>
                    <TableCell align="right">
                      {formatPrice(row.detailProduct.priceExport)}đ
                    </TableCell>
                    <TableCell align="right">
                      {formatPrice(row.totalPrice)}đ
                    </TableCell>
                    <TableCell padding="checkbox">
                      <button
                        onClick={async () => {
                          dispatch(changeLoading(true));
                          await requestDeleteCart({ id: row.id });
                          dispatch(deleteItemCart({ id: row.id }));
                          dispatch(changeLoading(false));
                        }}
                      >
                        <Delete color="action" />
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}

            <TableRow>
              <TableCell colSpan={4} />
              <TableCell colSpan={2}>Tổng tiền</TableCell>
              <TableCell align="right">{formatPrice(checkTotal())}đ</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4} />
              <TableCell colSpan={2}>Thành tiền</TableCell>
              <TableCell align="right">
                {formatPrice(checkTotal() - checkDiscount())}đ
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "flex-end",
          paddingTop: 40,
        }}
      >
        {selected.length > 0 && address?.dataSelected && (
          <Button
            variant="outlined"
            color="default"
            style={{
              width: "30%",
            }}
            onClick={handlePayment}
          >
            Thanh toán
          </Button>
        )}
      </div>
      <FormDialogVoucher
        data={LIST_VOUCHER}
        handleClose={() => {
          setOpenVoucher(!openVoucher);
        }}
        open={openVoucher}
        description={"Hãy chọn voucher để nhận được những ưu đãi lớn nhất"}
        selected={selectedVoucher}
        setSelected={setSelectedVoucher}
      />
      <FormDialogAddress
        data={address.data}
        handleClose={() => {
          setOpenAddress(!openAddress);
        }}
        open={openAddress}
        description={"Vui lòng chọn địa chỉ nhận hàng"}
      />
      {isLoading && <LoadingProgress />}
    </div>
  );
};
export default CartScreen;
