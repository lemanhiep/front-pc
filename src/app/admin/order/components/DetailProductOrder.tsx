import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import EmptyComponent from "../../../component/EmptyComponent";
import LoadingProgress from "../../../component/LoadingProccess";
import { ItemCart, URL_IMAGE } from "../../../contant/Contant";
import {
  DetailProductAdmin,
  ResultApi,
} from "../../../contant/IntefaceContaint";
import { useAppDispatch } from "../../../hooks";
import {
  CreateCartDto,
  requestPostCreateCart,
} from "../../../screen/cart/CartApi";
import { addProductToCart } from "../../../screen/cart/slice/CartSlice";
import { requestGetProductDetailByIdProduct } from "../../../screen/product/ProductCustomerApi";
import { getIdAccount } from "../../../service/StorageService";
import { colors } from "../../../utils/color";
import { formatPrice } from "../../../utils/function";
import { createNotification } from "../../../utils/MessageUtil";

interface Props {
  product_id: number;
  open: boolean;
  handleClose: () => void;
}
interface NewDetailProductAdmin extends DetailProductAdmin {
  quantityBuy: number;
}

const DetailProductOrder = ({ product_id, handleClose, open }: Props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [listProductDetail, setListProductDetail] = useState<
    NewDetailProductAdmin[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product_id]);

  const getData = async () => {
    if (product_id) {
      try {
        setIsLoading(true);
        const resListDetail: ResultApi<NewDetailProductAdmin[]> =
          await requestGetProductDetailByIdProduct({
            product_id: product_id ?? 7,
          });
        setListProductDetail(
          resListDetail.data.map((e) => {
            return { ...e, quantityBuy: 1 };
          })
        );
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
      }
    }
  };

  const handleBuyProduct = async (row: NewDetailProductAdmin) => {
    const idAccount = getIdAccount();

    if (row.quantity < row.quantityBuy) {
      createNotification({
        type: "warning",
        message: "Đã mua vượt quá số lượng còn lại",
      });
      return;
    }
    try {
      setIsLoading(true);
      const payload: CreateCartDto = {
        accountId: Number(idAccount),
        detailProductId: row.id ?? 0,
        quantity: row.quantityBuy,
        totalPrice: row?.priceExport ? row.quantityBuy * row?.priceExport : 0,
      };

      const res: ResultApi<ItemCart> = await requestPostCreateCart(payload);
      const newList = listProductDetail.map((e) => {
        if (e.id === row.id)
          return {
            ...e,
            quantity: e.quantity - row.quantityBuy,
          };
        return e;
      });
      setListProductDetail(newList);
      dispatch(addProductToCart({ item: res.data }));
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      style={{ width: "100%", padding: 20 }}
      maxWidth="md"
      fullWidth={true}
    >
      <DialogTitle id="form-dialog-title">{"Chi tiết sản phẩm"}</DialogTitle>
      <DialogContent style={{ width: "100%" }}>
        <div className={classes.root}>
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={"medium"}
              aria-label="enhanced table"
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    align="right"
                    className={classes.rowHeader}
                    style={{
                      borderTopLeftRadius: 8,
                      borderBottomLeftRadius: 8,
                    }}
                  >
                    STT
                  </TableCell>
                  <TableCell align="right" className={classes.rowHeader}>
                    Tên sản phẩm
                  </TableCell>
                  <TableCell align="right" className={classes.rowHeader}>
                    Phân loại
                  </TableCell>
                  <TableCell align="right" className={classes.rowHeader}>
                    Giá bán(VNĐ)
                  </TableCell>
                  <TableCell align="right" className={classes.rowHeader}>
                    Ảnh
                  </TableCell>
                  <TableCell align="right" className={classes.rowHeader}>
                    Số lượng còn lại
                  </TableCell>
                  <TableCell align="right" className={classes.rowHeader}>
                    Số lượng mua
                  </TableCell>
                  <TableCell
                    align="right"
                    className={classes.rowHeader}
                    style={{
                      borderTopRightRadius: 8,
                      borderBottomRightRadius: 8,
                    }}
                  >
                    Trạng thái
                  </TableCell>
                  <TableCell
                    align="right"
                    className={classes.rowHeader}
                    style={{
                      borderTopRightRadius: 8,
                      borderBottomRightRadius: 8,
                    }}
                  >
                    Hoạt động
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listProductDetail.length > 0 &&
                  listProductDetail.map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow hover tabIndex={-1} key={`${row.id}`}>
                        <TableCell
                          align="center"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.id}
                        </TableCell>
                        <TableCell align="right">
                          {row?.product?.productName ??
                            row?.productName ??
                            "..."}
                        </TableCell>
                        <TableCell align="right">
                          {row.color.colorName ? row?.color?.colorName : ""}
                          {row.size.sizeName ? "/" + row?.size?.sizeName : ""}
                        </TableCell>
                        <TableCell align="right">
                          {formatPrice(row?.priceExport ?? 0)}
                        </TableCell>
                        <TableCell align="right">
                          <img
                            alt=""
                            src={row?.productImage ?? URL_IMAGE}
                            style={{ width: 40, borderRadius: 5 }}
                          />
                        </TableCell>
                        <TableCell align="right">{row.quantity}</TableCell>
                        <TableCell align="right">
                          <div style={{ display: "flex" }}>
                            <button
                              className={classes.buttonQuantity}
                              onClick={async () => {
                                if (row.quantityBuy > 1) {
                                  const newList = listProductDetail.map((e) => {
                                    if (e.id === row.id)
                                      return {
                                        ...e,
                                        quantityBuy: e.quantityBuy - 1,
                                      };
                                    else return e;
                                  });
                                  setListProductDetail(newList);
                                }
                              }}
                            >
                              -
                            </button>
                            {row.quantityBuy}
                            <button
                              className={classes.buttonQuantity}
                              onClick={async () => {
                                const newList = listProductDetail.map((e) => {
                                  if (e.id === row.id)
                                    return {
                                      ...e,
                                      quantityBuy: e.quantityBuy + 1,
                                    };
                                  else return e;
                                });
                                setListProductDetail(newList);
                              }}
                            >
                              +
                            </button>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          <p style={{ fontSize: 12, color: colors.gray59 }}>
                            {row?.isActive ? "Hoạt động" : "Không hoạt động"}
                          </p>
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleBuyProduct(row)}
                          >
                            <p style={{ fontSize: 10 }}>Thêm vào mua</p>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          {listProductDetail?.length === 0 && (
            <div style={{ width: "100%" }}>
              <EmptyComponent />
            </div>
          )}
        </div>
        {isLoading && <LoadingProgress />}
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="outlined" onClick={handleClose}>
          Hoàn thành
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
    table: {
      minWidth: 750,
    },
    totalFilter: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    itemAddAll: {
      display: "flex",
      alignItems: "center",
    },
    rowHeader: {
      backgroundColor: colors.gradiantBluePosition,
      borderBottomColor: colors.white,
      color: colors.gradiantBlue,
    },
    textDescription: {
      fontSize: 12,
      color: colors.grayC4,
      marginTop: 5,
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
  })
);
export default DetailProductOrder;
