import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
import { Settings } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import UpdateIcon from "@material-ui/icons/UpdateOutlined";
import React, { useEffect, useState } from "react";
import EmptyComponent from "../../component/EmptyComponent";
import EnhancedTableHead from "../../component/EnhancedTableHead";
import EnhancedTableToolbar from "../../component/EnhancedTableToolbar";
import EnhancedTableToolbarHeder from "../../component/EnhancedTableToolbarHeder";
import LoadingProgress from "../../component/LoadingProccess";
import {
  headCellsCategory,
  LIST_CATEGORY,
} from "../../contant/ContaintDataAdmin";
import { TYPE_DIALOG } from "../../contant/Contant";
import { CategoryAdmin, ResultApi } from "../../contant/IntefaceContaint";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { colors } from "../../utils/color";
import { FunctionUtil, Order } from "../../utils/function";
import {
  requestDeleteCategory,
  requestPutUpdateCategory,
  UpdateDto,
} from "./CategoryApi";
import CategoryChildrenComponent from "./components/CategoryChildrenComponent";
import FormDialog from "./components/FormDialog";
import {
  changeLoading,
  deleteCategory,
  incrementAsyncCategoryAdmin,
  updateCategory,
} from "./slice/CategoryAdminSlice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
      marginTop: 10,
      padding: 10,
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

export default function CategoryScreen() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof CategoryAdmin>("id");
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorElData, setAnchorElData] = React.useState<null | {
    item: CategoryAdmin;
  }>(null);
  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";

  const { data, isLoading } = useAppSelector((state) => state.categoryAdmin);
  const [typeDialog, setTypeDialog] = useState(TYPE_DIALOG.CREATE);

  useEffect(() => {
    getDataCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDataCategory = async () => {
    await dispatch(incrementAsyncCategoryAdmin());
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
    setAnchorElData(null);
  };

  const createSortHandler =
    (property: keyof CategoryAdmin) => (event: React.MouseEvent<unknown>) => {
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

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

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
  const handleChangeStatus = async (params: { row: CategoryAdmin }) => {
    const { row } = params;
    const item: UpdateDto = {
      id: row.id,
      categoryName: row.categoryName,
      isDelete: row.isDeleted,
      categoryParentId: row.categoryParentId,
      isActive: !row.isActive,
    };
    dispatch(changeLoading(true));
    const res: ResultApi<CategoryAdmin> = await requestPutUpdateCategory(item);
    dispatch(updateCategory({ item: res.data }));
    dispatch(changeLoading(false));
  };

  const handleDelete = async (array: number[]) => {
    try {
      dispatch(changeLoading(true));
      await requestDeleteCategory({ listCategoryId: array });
      dispatch(deleteCategory({ array: array.map((e) => e.toString()) }));
      setSelected([]);
      handleMenuClose();
      dispatch(changeLoading(false));
    } catch (e) {
      dispatch(changeLoading(false));
    }
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
          setTypeDialog(TYPE_DIALOG.UPDATE);
          setOpen(!open);
        }}
      >
        <Tooltip title="Update">
          <IconButton aria-label="update">
            <UpdateIcon color="primary" />
          </IconButton>
        </Tooltip>
        <p>Cập nhật</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root} style={{ position: "relative" }}>
      <EnhancedTableToolbarHeder
        label={"Danh mục sản phẩm (cha)"}
        onCreate={() => {
          setTypeDialog(TYPE_DIALOG.CREATE);
          setOpen(!open);
        }}
      />
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          onCreate={() => {
            setTypeDialog(TYPE_DIALOG.CREATE);
            setOpen(!open);
          }}
          onDelete={() => handleDelete(selected.map((e) => +e))}
          label={"Danh mục sản phẩm"}
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
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={(event) => {
                setSelected(FunctionUtil.handleSelectAllClick(event, data));
              }}
              rowCount={data.length}
              headCells={headCellsCategory}
              createSortHandler={createSortHandler}
              childrenMore={
                <>
                  <TableCell
                    align="center"
                    style={{
                      backgroundColor: colors.gradiantBluePosition,
                      borderBottomColor: colors.white,
                      color: colors.gradiantBlue,
                    }}
                  >
                    Category children
                  </TableCell>
                </>
              }
            />
            <TableBody style={{ position: "relative" }}>
              {data.length > 0 &&
                data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(`${row.id}`);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <>
                        <TableRow
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={`${row.id}`}
                          selected={isItemSelected}
                          className={classes.table}
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
                            {row.id}
                          </TableCell>
                          <TableCell align="right">
                            {row.categoryName}
                          </TableCell>
                          <TableCell align="right">
                            <Switch
                              checked={row.isActive}
                              onChange={() => handleChangeStatus({ row: row })}
                              name={labelId}
                              inputProps={{ "aria-label": labelId }}
                              color="primary"
                            />
                          </TableCell>
                          <div style={{ padding: 10 }}>
                            <Accordion variant="elevation">
                              <AccordionSummary
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                              >
                                <TableCell
                                  style={{
                                    borderBottomColor: "white",
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  {row.categoryChildren?.length ?? 0} danh mục
                                  con
                                </TableCell>
                              </AccordionSummary>
                              <AccordionDetails>
                                <CategoryChildrenComponent
                                  data={row.categoryChildren ?? LIST_CATEGORY}
                                  category_parent_id={row.id}
                                />
                              </AccordionDetails>
                            </Accordion>
                          </div>
                          <TableCell align="center">
                            <IconButton
                              onClick={(event) => {
                                handleProfileMenuOpen(event, row);
                              }}
                            >
                              <Settings />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
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
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {renderMenu}
      <FormDialog
        open={open}
        handleClose={handleClose}
        anchorElData={anchorElData}
        type={typeDialog}
        data={data}
        isParent={true}
      />
      {isLoading && <LoadingProgress />}
    </div>
  );
}
