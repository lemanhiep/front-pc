import {
  Button,
  createStyles,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import EmptyComponent from "../../../../component/EmptyComponent";
import { TYPE_DIALOG, URL_IMAGE } from "../../../../contant/Contant";
import {
  DetailProductAdmin,
  ProductAdmin,
} from "../../../../contant/IntefaceContaint";
import { useAppDispatch } from "../../../../hooks";
import { colors } from "../../../../utils/color";
import { formatPrice, FunctionUtil } from "../../../../utils/function";
import { createNotification } from "../../../../utils/MessageUtil";
import {
  requestPutUpdateDetailProductList,
  UpdateListDetailProductDto,
} from "../../ProductAdminApi";
import { changeLoading, updateProduct } from "../../slice/ProductAdminSlice";
import FormEditProductDetail from "./components/FormEditProductDetail";

interface Props {
  onSubmit: Function;
  listDetail: DetailProductAdmin[];
  dataProduct?: ProductAdmin | null;
  type: number;
  handleClose: () => void;
}
const ListProductDetail = (props: Props) => {
  const { onSubmit, listDetail, dataProduct, type, handleClose } = props;
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [listProductDetail, setListProductDetail] = useState<
    DetailProductAdmin[]
  >([]);

  useEffect(() => {
    setListProductDetail(listDetail);
  }, [listDetail]);

  const [priceExportTotal, setPriceExportTotal] = useState(0);
  const [priceImportTotal, setPriceImportTotal] = useState(0);
  const [quantityTotal, setQuantityTotal] = useState(0);

  const handleChangePrice = (params: {
    keyString: "priceImport" | "priceExport" | "quantity";
    value: number;
  }) => {
    const { keyString, value } = params;
    if (!FunctionUtil.checkIsNumber(value)) return;

    const oldArray = listProductDetail;
    const newProductDetail = oldArray?.map((e) => {
      let newItem = e;
      newItem[keyString] = value;
      return newItem;
    });
    setListProductDetail(newProductDetail);
  };

  const handleChane = (params: { oldValue: any; text: any }) => {
    const { oldValue, text } = params;
    let newText = `${text}`.replace(",", "").replace(",", "").replace(",", "");
    if (!FunctionUtil.checkIsNumber(newText)) return oldValue;
    let value = oldValue;
    if (newText) value = Number(newText);
    else value = 0;
    return value;
  };

  const handleSubmit = async () => {
    try {
      const item = listProductDetail.find(
        (e) => e.priceExport === 0 || e.priceImport === 0
      );
      if (item) {
        createNotification({
          type: "warning",
          message: "Bạn không được để giá trị nào bằng 0",
        });
        return;
      }
      dispatch(changeLoading(true));
      const listPayload = listProductDetail.map((e) => {
        let res: UpdateListDetailProductDto = {
          id: e.id,
          image: e?.productImage ?? URL_IMAGE,
          isActive: e.isActive ?? false,
          priceExport: e.priceExport,
          priceImport: e.priceImport,
          quantity: e.quantity,
        };
        return res;
      });
      await requestPutUpdateDetailProductList({
        newDetailProductDTOList: listPayload,
      });
      dataProduct &&
        dispatch(updateProduct({ item: { ...dataProduct, isComplete: true } }));
      onSubmit();
      dispatch(changeLoading(false));
    } catch (e) {
      dispatch(changeLoading(false));
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.totalFilter}>
        <div>
          <div className={classes.itemAddAll}>
            <TextField
              value={`${formatPrice(priceImportTotal)}`}
              onChange={(event) => {
                const value = handleChane({
                  oldValue: priceImportTotal,
                  text: event.target.value,
                });
                setPriceImportTotal(value);
              }}
              variant="standard"
              label="Giá nhập(VNĐ)"
            />
            <Button
              variant="contained"
              style={{ marginLeft: 5 }}
              onClick={() => {
                handleChangePrice({
                  keyString: "priceImport",
                  value: priceImportTotal,
                });
              }}
            >
              Apply all
            </Button>
          </div>
          <p className={classes.textDescription}>
            Có thể nhập giá nhập và áp dụng cho toàn bộ phân loại
          </p>
        </div>

        <div>
          <div className={classes.itemAddAll}>
            <TextField
              value={`${formatPrice(priceExportTotal)}`}
              onChange={(event) => {
                const value = handleChane({
                  oldValue: priceExportTotal,
                  text: event.target.value,
                });
                setPriceExportTotal(value);
              }}
              variant="standard"
              label="Giá xuất(VNĐ)"
            />
            <Button
              variant="contained"
              style={{ marginLeft: 5 }}
              onClick={() => {
                handleChangePrice({
                  keyString: "priceExport",
                  value: priceExportTotal,
                });
              }}
            >
              Apply all
            </Button>
          </div>
          <p className={classes.textDescription}>
            Có thể nhập giá xuất và áp dụng cho toàn bộ phân loại
          </p>
        </div>
        <div>
          <div className={classes.itemAddAll}>
            <TextField
              value={`${formatPrice(quantityTotal)}`}
              onChange={(event) => {
                const value = handleChane({
                  oldValue: quantityTotal,
                  text: event.target.value,
                });
                setQuantityTotal(value);
              }}
              variant="standard"
              label="Số lượng"
            />
            <Button
              variant="contained"
              style={{ marginLeft: 5 }}
              onClick={() => {
                handleChangePrice({
                  keyString: "quantity",
                  value: quantityTotal,
                });
              }}
            >
              Apply all
            </Button>
          </div>
          <p className={classes.textDescription}>
            Có thể nhập số lượng và áp dụng cho toàn bộ phân loại
          </p>
        </div>
      </div>
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
                style={{ borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}
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
                Giá nhập(VNĐ)
              </TableCell>
              <TableCell align="right" className={classes.rowHeader}>
                Giá xuất(VNĐ)
              </TableCell>
              <TableCell align="right" className={classes.rowHeader}>
                Ảnh phân loại
              </TableCell>
              <TableCell align="right" className={classes.rowHeader}>
                Số lượng(Cái)
              </TableCell>
              <TableCell
                align="right"
                className={classes.rowHeader}
                style={{ borderTopRightRadius: 8, borderBottomRightRadius: 8 }}
              >
                Trạng thái
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listProductDetail.length > 0 &&
              listProductDetail.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <FormEditProductDetail
                    labelId={labelId}
                    row={row}
                    listProductDetail={listProductDetail}
                    setListProductDetail={setListProductDetail}
                  />
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
      <div
        style={{ display: "flex", justifyContent: "flex-end", paddingTop: 20 }}
      >
        {type === TYPE_DIALOG.UPDATE && (
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        )}
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};
export default ListProductDetail;
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: 20,
    },
    table: {
      minWidth: 750,
      marginTop: 20,
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
  })
);
