import {
  Button,
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
import { Delete } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from "@material-ui/icons/UpdateOutlined";
import React, { useState } from "react";
import EmptyComponent from "../../../component/EmptyComponent";

import EnhancedTableHead from "../../../component/EnhancedTableHead";
import LoadingProgress from "../../../component/LoadingProccess";
import { headCellsCategory } from "../../../contant/ContaintDataAdmin";
import { TYPE_DIALOG } from "../../../contant/Contant";
import { CategoryAdmin, ResultApi } from "../../../contant/IntefaceContaint";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { colors } from "../../../utils/color";
import { FunctionUtil, Order } from "../../../utils/function";
import {
  requestDeleteCategory,
  requestPutUpdateCategory,
  UpdateDto,
} from "../CategoryApi";
import {
  changeLoading,
  deleteCategoryChilden,
  updateCategoryChilden,
} from "../slice/CategoryAdminSlice";
import FormDialog from "./FormDialog";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
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

interface Props {
  data: CategoryAdmin[];
  category_parent_id: number;
}

export default function CategoryChildrenComponent(props: Props) {
  const { data, category_parent_id } = props;
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof CategoryAdmin>("id");
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { isLoading } = useAppSelector((e) => e.categoryAdmin);
  const [anchorElData, setAnchorElData] = React.useState<null | {
    item: CategoryAdmin;
  }>(null);
  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";

  const [typeDialog, setTypeDialog] = useState(TYPE_DIALOG.CREATE);

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

  const handleChangeStatus = async (row: CategoryAdmin, parentId: number) => {
    try {
      const item: UpdateDto = {
        id: row.id,
        categoryName: row.categoryName,
        isDelete: row.isDeleted,
        categoryParentId: parentId,
        isActive: !row.isActive,
      };
      dispatch(changeLoading(true));
      const res: ResultApi<CategoryAdmin> = await requestPutUpdateCategory(
        item
      );
      dispatch(updateCategoryChilden({ item: res.data, id: parentId }));
      dispatch(changeLoading(false));
    } catch (e) {
      dispatch(changeLoading(false));
    }
  };

  const handleDelete = async (array: number[]) => {
    try {
      dispatch(changeLoading(true));
      await requestDeleteCategory({ listCategoryId: array });
      dispatch(
        deleteCategoryChilden({
          array: array.map((e) => `${e}`),
          id: category_parent_id,
        })
      );
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
    <div className={classes.root}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: 20,
        }}
      >
        <Tooltip title="Xoá">
          <IconButton
            onClick={() => handleDelete(selected.map((e) => +e))}
            disabled={selected.length > 0 ? false : true}
          >
            <Delete
              color={selected.length > 0 ? "secondary" : "inherit"}
              style={{ width: 20, height: 20 }}
            />
          </IconButton>
        </Tooltip>

        <Button
          variant="contained"
          onClick={() => {
            setTypeDialog(TYPE_DIALOG.CREATE);
            setOpen(!open);
          }}
          style={{
            color: colors.gradiantBlue,
            backgroundColor: colors.gradiantBluePosition,
            fontSize: 14,
            height: 35,
          }}
        >
          Tạo mới
        </Button>
      </div>
      <Paper className={classes.paper}>
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
                              onChange={() =>
                                handleChangeStatus(row, category_parent_id)
                              }
                              name={labelId}
                              inputProps={{ "aria-label": labelId }}
                              color="primary"
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
        isParent={false}
        category_parent_id={category_parent_id}
      />
      {isLoading && <LoadingProgress />}
    </div>
  );
}
