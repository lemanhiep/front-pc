import {
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  Tooltip,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { EditAttributesRounded } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useEffect, useState } from "react";
import EmptyComponent from "../../component/EmptyComponent";
import EnhancedTableHead from "../../component/EnhancedTableHead";
import EnhancedTableToolbar from "../../component/EnhancedTableToolbar";
import EnhancedTableToolbarHeder from "../../component/EnhancedTableToolbarHeder";
import LoadingProgress from "../../component/LoadingProccess";
import { headCellsProduct } from "../../contant/ContaintDataAdmin";
import { TYPE_DIALOG } from "../../contant/Contant";
import { ProductAdmin, ResultApi } from "../../contant/IntefaceContaint";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { FunctionUtil, Order } from "../../utils/function";
import FormDialogProductCreate from "./components/DialogCreateProduct";
import {
  GetProductDto,
  requestDeleteProduct,
  requestPutUpdateProductStatus,
} from "./ProductAdminApi";
import {
  changeLoading,
  deleteProduct,
  incrementAsyncProductAdmin,
  updateProduct,
} from "./slice/ProductAdminSlice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
      padding: 10,
      marginTop: 10,
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  })
);
export const DEFINE_STEP = {
  PRODUCT: 0,
  CREATE_DETAIL: 1,
  LIST_DETAIL: 2,
};

export default function ProductScreen() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof ProductAdmin>("id");
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = useState(DEFINE_STEP.PRODUCT);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [textFilter, setTextFilter] = React.useState<string>("");
  const [anchorElData, setAnchorElData] = React.useState<null | {
    item: ProductAdmin;
  }>(null);
  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";

  const { data, isLoading, count } = useAppSelector(
    (state) => state.productAdmin
  );
  const [typeDialog, setTypeDialog] = useState(TYPE_DIALOG.CREATE);

  useEffect(() => {
    const timer = setTimeout(() => {
      getData();
    }, 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, textFilter]);

  const getData = async () => {
    const payload: GetProductDto = {
      size: rowsPerPage,
      page: page,
      name: textFilter,
    };
    await dispatch(incrementAsyncProductAdmin(payload));
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
    setAnchorElData(null);
  };

  const handleUpdate = async (row: ProductAdmin) => {
    try {
      dispatch(changeLoading(true));
      const payload = {
        is_active: row.isActive ? 0 : 1,
        id: row.id,
      };
      await requestPutUpdateProductStatus(payload);
      dispatch(updateProduct({ item: { ...row, isActive: !row.isActive } }));
      dispatch(changeLoading(false));
    } catch (e) {
      dispatch(changeLoading(false));
    }
  };

  const handleDelete = async (array: number[]) => {
    try {
      dispatch(changeLoading(true));
      await requestDeleteProduct({ listProductId: array });
      dispatch(deleteProduct({ array: array.map((e) => e.toString()) }));
      setSelected([]);
      handleMenuClose();
      dispatch(changeLoading(false));
    } catch (e) {
      dispatch(changeLoading(false));
    }
  };

  const createSortHandler =
    (property: keyof ProductAdmin) => (event: React.MouseEvent<unknown>) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const handleMenuClose = () => {
    setAnchorEl(null);
    setAnchorElData(null);
  };
  const handleProfileMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    item: any
  ) => {
    setAnchorEl(event.currentTarget);
    setAnchorElData({ item: item });
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => handleDelete([anchorElData?.item.id ?? 0])}
        button
      >
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon color="secondary" />
          </IconButton>
        </Tooltip>
        <p>Xoá</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          setActiveStep(DEFINE_STEP.PRODUCT);
          setTypeDialog(TYPE_DIALOG.UPDATE);
          setOpen(!open);
        }}
      >
        <Tooltip title="Update">
          <IconButton aria-label="update">
            <EditAttributesRounded color="primary" />
          </IconButton>
        </Tooltip>
        <p>Cập nhật sản phẩm</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          setActiveStep(DEFINE_STEP.CREATE_DETAIL);
          setTypeDialog(TYPE_DIALOG.UPDATE);
          setOpen(!open);
        }}
      >
        <Tooltip title="Update">
          <IconButton aria-label="update">
            <EditAttributesRounded color="primary" />
          </IconButton>
        </Tooltip>
        <p>Cập nhật phân loại</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          setActiveStep(DEFINE_STEP.LIST_DETAIL);
          setTypeDialog(TYPE_DIALOG.UPDATE);
          setOpen(!open);
        }}
      >
        <Tooltip title="Update">
          <IconButton aria-label="update">
            <EditAttributesRounded color="primary" />
          </IconButton>
        </Tooltip>
        <p>Cập nhật danh sách phân loại</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <EnhancedTableToolbarHeder
        label={"Quản lý Product"}
        onCreate={() => {
          setTypeDialog(TYPE_DIALOG.CREATE);
          setOpen(!open);
        }}
        setTextFilter={setTextFilter}
        textFilter={textFilter}
      />
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          onCreate={() => {
            setTypeDialog(TYPE_DIALOG.CREATE);
            setOpen(!open);
          }}
          onDelete={() => handleDelete(selected.map((e) => +e))}
          label={"Quản lý Product"}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected?.length ?? 0}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={(event) => {
                setSelected(FunctionUtil.handleSelectAllClick(event, data));
              }}
              rowCount={data?.length ?? 0}
              headCells={headCellsProduct}
              createSortHandler={createSortHandler}
              isNoSort={true}
            />
            <TableBody style={{ position: "relative" }}>
              {data?.length > 0 &&
                FunctionUtil.stableSort(
                  data,
                  FunctionUtil.getComparator(order, orderBy)
                ).map((row, index) => {
                  const isItemSelected = isSelected(`${row.id}`);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={`${row.id}`}
                      selected={isItemSelected}
                    >
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
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row?.id}
                      </TableCell>
                      <TableCell align="right">{row?.productName}</TableCell>
                      <TableCell align="right">{row?.createDate}</TableCell>

                      <TableCell align="right">
                        <Switch
                          checked={row?.isActive}
                          onChange={() => handleUpdate(row)}
                          name={labelId}
                          inputProps={{ "aria-label": labelId }}
                          color="primary"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Chip
                          label={`${
                            row?.isComplete
                              ? "Đã hoàn thành"
                              : "Chưa hoàn thành"
                          }`}
                          style={{ margin: 2 }}
                          color={row?.isComplete ? "primary" : "default"}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          onClick={(event) => {
                            handleProfileMenuOpen(event, row);
                          }}
                        >
                          ...
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {data?.length === 0 && (
                <TableRow style={{ height: 53 * rowsPerPage }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
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
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {renderMenu}
      <FormDialogProductCreate
        open={open}
        handleClose={handleClose}
        anchorElData={{ item: anchorElData?.item ?? null }}
        type={typeDialog}
        data={data}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />
      {isLoading && <LoadingProgress />}
    </div>
  );
}
