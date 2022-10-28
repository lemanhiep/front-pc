import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  createStyles,
  Dialog, DialogContent,
  DialogTitle,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Theme,
  Typography
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { useEffect, useState } from "react";
import EmptyComponent from "../../../component/EmptyComponent";
import LoadingProgress from "../../../component/LoadingProccess";
import { URL_IMAGE } from "../../../contant/Contant";
import { ProductAdmin } from "../../../contant/IntefaceContaint";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  FilterPayloadProductDto,
  FilterProductDto
} from "../../../screen/product/ProductCustomerApi";
import { incrementAsyncProduct } from "../../../screen/product/slice/ProductCustomerSlice";
import { colors } from "../../../utils/color";
import { formatPrice } from "../../../utils/function";
import CartOrderAdminPayback from "./CartOrderAdminPayback";
import DetailProductOrderPayback from "./DetailProductOrderPayback";

const HeaderTable = () => {
  const classes = useStyles();
  return (
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
          Giá thấp nhất(VNĐ)
        </TableCell>
        <TableCell align="right" className={classes.rowHeader}>
          Giá cao nhất(VNĐ)
        </TableCell>
        <TableCell align="right" className={classes.rowHeader}>
          Ảnh phân loại
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
  );
};

const RowTable = ({
  row,
  onPress,
}: {
  row: ProductAdmin;
  onPress: () => void;
}) => {
  return (
    <TableRow hover>
      <TableCell align="center">{row?.id}</TableCell>
      <TableCell align="right">{row?.productName}</TableCell>
      <TableCell align="right">{formatPrice(row?.minPrice ?? 0)}</TableCell>
      <TableCell align="right">{formatPrice(row?.maxPrice ?? 0)}</TableCell>
      <TableCell align="center">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            alt=""
            src={row?.productImage ?? URL_IMAGE}
            style={{ width: 50, borderRadius: 5 }}
          />
        </div>
      </TableCell>
      <TableCell align="right">
        <Button onClick={onPress} variant="outlined" size="medium">
          Xem chi tiết
        </Button>
      </TableCell>
    </TableRow>
  );
};

interface Props {
  open: any;
  handleClose: () => void;
  handleSubmit: Function
}

const FormDialogPayback = (props: Props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { handleClose, open ,handleSubmit} = props;
  const { isLoading, data, count } = useAppSelector(
    (state) => state.productCustomer
  );

  const [openDetail, setOpenDetail] = useState(false);
  const [productId, setProductId] = useState(0);

  const [payload, setPayLoad] = useState<FilterPayloadProductDto>({
    page: 0,
    size: 10,
    listCategoryId: [],
    listColorId: [],
    listMaterialId: [],
    listSizeId: [],
    listTagId: [],
  });

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload]);

  const getData = async () => {
    const payloadGetList: FilterProductDto = {
      ...payload,
      topPrice: 1000000000,
      bottomPrice: 0,
    };
    await dispatch(incrementAsyncProduct(payloadGetList));
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPayLoad({ ...payload, page: newPage });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPayLoad({ ...payload, size: parseInt(event.target.value, 10), page: 0 });
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      style={{ width: "100%" }}
      maxWidth="lg"
      fullWidth={true}
    >
      <DialogTitle id="form-dialog-title">{"Chọn các sản phẩm thay thế"}</DialogTitle>
      <DialogContent style={{ width: "100%" }}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="enhanced table"
          >
            <HeaderTable />
            <TableBody style={{ position: "relative" }}>
              {data?.length &&
                data?.length > 0 &&
                data.map((row, index) => {
                  return (
                    <RowTable
                      row={row}
                      key={index}
                      onPress={() => {
                        setProductId(row.id);
                        setOpenDetail(true);
                      }}
                    />
                  );
                })}
              {data?.length === 0 && (
                <div style={{ position: "absolute", top: 0, width: "100%" }}>
                  <EmptyComponent />
                </div>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={count ?? 100}
          rowsPerPage={payload.size}
          page={payload.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {isLoading && <LoadingProgress />}
        <DetailProductOrderPayback
          product_id={productId}
          open={openDetail}
          handleClose={handleCloseDetail}
        />
      </DialogContent>
      <div
        style={{
          padding: 10,
          borderTopColor: colors.grayC4,
          borderTopWidth: 0.5,
        }}
      >
        <Accordion square style={{ borderRadius: 5 }}>
          <AccordionSummary
            expandIcon={<ExpandMore color="primary" />}
            aria-label="Expand"
            aria-controls="additional-actions3-content"
            id="additional-actions3-header"
          >
            <Typography
              style={{
                fontSize: 16,
                color: colors.gradiantBlue,
                fontStyle: "italic",
                fontWeight: "bold",
              }}
            >
              Danh sách sản phẩm thay đổi
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CartOrderAdminPayback handleSubmit={handleSubmit}/>
          </AccordionDetails>
        </Accordion>
      </div>
    </Dialog>
  );
};
export default FormDialogPayback;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 750,
    },
    rowHeader: {
      backgroundColor: colors.gradiantBluePosition,
      borderBottomColor: colors.white,
      color: colors.gradiantBlue,
    },
  })
);
