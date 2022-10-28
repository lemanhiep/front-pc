import { Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Delete from "@material-ui/icons/Delete";
import { useEffect } from "react";
import LoadingProgress from "../../../component/LoadingProccess";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  requestDeleteCart
} from "../../../screen/cart/CartApi";
import {
  changeLoading,
  deleteItemCart,
  incrementAsyncCart
} from "../../../screen/cart/slice/CartSlice";
import { colors } from "../../../utils/color";
import { formatPrice } from "../../../utils/function";

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

const CartOrderAdminPayback = ({handleSubmit}:{handleSubmit: Function}) => {
  const classes = useStyles();
  const { data, isLoading } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    dispatch(incrementAsyncCart());
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Option(color/size)</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell></TableCell>
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
                      {formatPrice(row.detailProduct.priceExport)}đ
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
          </TableBody>
        </Table>
      </TableContainer>

      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "flex-end",
          padding: 5,
          paddingTop: 20,
        }}
      >
        {data.length > 0 && (
          <Button
            variant="outlined"
            color="primary"
            style={{
              width: "30%",
            }}
            onClick={()=>handleSubmit()}
          >
            Hoàn thành đổi trả
          </Button>
        )}
      </div>
      {isLoading && <LoadingProgress />}
    </div>
  );
};
export default CartOrderAdminPayback;
