import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  Tooltip,
  Typography,
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
  headCellsOptionColor,
  headCellsOptionSize,
} from "../../contant/ContaintDataAdmin";
import { TYPE_DIALOG } from "../../contant/Contant";
import {
  OptionColor,
  OptionSize,
  ResultApi,
} from "../../contant/IntefaceContaint";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { colors } from "../../utils/color";
import { FunctionUtil, Order } from "../../utils/function";
import FormDialogColor from "./components/FormDialogColor";
import FormDialogSize from "./components/FormDialogSize";
import {
  requestDeleteColor,
  requestDeleteSize,
  requestPutUpdateColor,
  requestPutUpdateSize,
  UpdateColorDto,
} from "./OptionApi";
import {
  deleteColor,
  incrementAsyncOptionColor,
  updateColor,
} from "./slice/OptionColorSlice";
import {
  changeLoading,
  deleteSize,
  incrementAsyncOptionSize,
  updateSize,
} from "./slice/OptionSizeSlice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      marginTop: 5,
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
      marginTop: 10,
    },
    table: {
      minWidth: 700,
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

export default function OptionScreen() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  const [orderSize, setOrderSize] = React.useState<Order>("asc");
  const [orderBySize, setOrderBySize] = React.useState<keyof OptionSize>("id");
  const [selectedSize, setSelectedSize] = React.useState<string[]>([]);
  const [pageSize, setPageSize] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openSize, setOpenSize] = React.useState(false);
  const [textFilterSize, setTextFilterSize] = useState("");
  const [textFilterColor, setTextFilterColor] = useState("");
  const [anchorElSize, setAnchorElSize] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElDataSize, setAnchorElDataSize] = React.useState<null | {
    item: OptionSize;
  }>(null);
  const isMenuOpenSize = Boolean(anchorElSize);
  const menuId = "primary-search-account-menu";

  const { data, isLoading } = useAppSelector((state) => state.optionAdmin);
  const dataColor = useAppSelector((state) => state.colorAdmin).data;
  const loadingColor = useAppSelector((state) => state.colorAdmin).isLoading;

  const [typeDialogSize, setTypeDialogSize] = useState(TYPE_DIALOG.CREATE);
  const handleCloseSize = () => {
    setOpenSize(false);
    setAnchorElSize(null);
    setAnchorElDataSize(null);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getDataSize();
    }, 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textFilterSize]);

  useEffect(() => {
    const timer = setTimeout(() => {
      getDataColor();
    }, 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textFilterColor]);

  const getDataColor = async () => {
    await dispatch(incrementAsyncOptionColor({ name: textFilterColor }));
  };

  const getDataSize = async () => {
    await dispatch(incrementAsyncOptionSize({ name: textFilterSize }));
  };

  const createSortHandlerSize =
    (property: keyof OptionSize) => (event: React.MouseEvent<unknown>) => {
      const isAsc = orderBySize === property && orderSize === "asc";
      setOrderSize(isAsc ? "desc" : "asc");
      setOrderBySize(property);
    };

  const handleChangePageSize = (event: unknown, newPage: number) => {
    setPageSize(newPage);
  };

  const handleChangeRowsPerPageSize = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageSize(0);
  };

  const isSelectedSize = (name: string) => selectedSize.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - pageSize * rowsPerPage);

  const handleMenuCloseSize = () => {
    setAnchorElSize(null);
    setAnchorElDataSize(null);
  };
  const handleProfileMenuOpenSize = (
    event: React.MouseEvent<HTMLElement>,
    item: any
  ) => {
    setAnchorElSize(event.currentTarget);
    setAnchorElDataSize({ item: item });
  };

  const handleDeleteSize = async (array: number[]) => {
    try {
      dispatch(changeLoading(true));
      await requestDeleteSize({ listSizeId: array });
      dispatch(deleteSize({ array: array.map((e) => e.toString()) }));
      setSelectedSize([]);
      handleMenuCloseColor();
      dispatch(changeLoading(false));
    } catch (e) {
      dispatch(changeLoading(false));
    }
  };

  // Color
  const [orderColor, setOrderColor] = React.useState<Order>("asc");
  const [orderByColor, setOrderByColor] =
    React.useState<keyof OptionColor>("id");
  const [selectedColor, setSelectedColor] = React.useState<string[]>([]);
  const [pageColor, setPageColor] = React.useState(0);
  const [rowsPerPageColor, setRowsPerPageColor] = React.useState(5);
  const [openColor, setOpenColor] = React.useState(false);
  const [anchorElColor, setAnchorElColor] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElDataColor, setAnchorElDataColor] = React.useState<null | {
    item: OptionColor;
  }>(null);
  const isMenuOpenColor = Boolean(anchorElColor);

  const [typeDialogColor, setTypeDialogColor] = useState(TYPE_DIALOG.CREATE);
  const handleCloseColor = () => {
    setOpenColor(false);
    setAnchorElColor(null);
    setAnchorElDataColor(null);
  };

  const createSortHandlerColor =
    (property: keyof OptionColor) => (event: React.MouseEvent<unknown>) => {
      const isAsc = orderByColor === property && orderColor === "asc";
      setOrderColor(isAsc ? "desc" : "asc");
      setOrderByColor(property);
    };

  const handleChangePageColor = (event: unknown, newPage: number) => {
    setPageColor(newPage);
  };

  const handleChangeRowsPerPageColor = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPageColor(parseInt(event.target.value, 10));
    setPageColor(0);
  };

  const isSelectedColor = (name: string) => selectedColor.indexOf(name) !== -1;

  const emptyRowsColor =
    rowsPerPageColor -
    Math.min(rowsPerPageColor, dataColor.length - pageColor * rowsPerPageColor);

  const handleMenuCloseColor = () => {
    setAnchorElColor(null);
    setAnchorElDataColor(null);
  };
  const handleProfileMenuOpenColor = (
    event: React.MouseEvent<HTMLElement>,
    item: any
  ) => {
    setAnchorElColor(event.currentTarget);
    setAnchorElDataColor({ item: item });
  };

  const handleDeleteColor = async (array: number[]) => {
    try {
      dispatch(changeLoading(true));
      await requestDeleteColor({ listColorId: array });
      dispatch(deleteColor({ array: array.map((e) => e.toString()) }));
      setSelectedColor([]);
      handleMenuCloseSize();
      dispatch(changeLoading(false));
    } catch (e) {
      dispatch(changeLoading(false));
    }
  };

  const handleUpdateColor = async (params: { row: OptionColor }) => {
    const { row } = params;
    try {
      dispatch(changeLoading(true));
      const payload: UpdateColorDto = {
        ...row,
        isActive: !row.isActive,
      };
      const res: ResultApi<OptionColor> = await requestPutUpdateColor(payload);
      dispatch(updateColor({ item: res.data }));
      dispatch(changeLoading(false));
    } catch (e) {
      dispatch(changeLoading(false));
    }
  };

  const handleUpdateSize = async (params: { row: OptionSize }) => {
    const { row } = params;
    try {
      dispatch(changeLoading(true));
      const payload: OptionSize = {
        ...row,
        isActive: !row.isActive,
      };
      const res: ResultApi<OptionSize> = await requestPutUpdateSize(payload);
      dispatch(updateSize({ item: res.data }));
      dispatch(changeLoading(false));
    } catch (e) {
      dispatch(changeLoading(false));
    }
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorElSize}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpenSize}
      onClose={handleMenuCloseSize}
    >
      <MenuItem
        onClick={() => handleDeleteSize([anchorElDataColor?.item.id ?? 0])}
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
          setTypeDialogSize(TYPE_DIALOG.UPDATE);
          setOpenSize(!openSize);
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

  const renderMenuColor = (
    <Menu
      anchorEl={anchorElColor}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpenColor}
      onClose={handleMenuCloseColor}
    >
      <MenuItem
        onClick={() => handleDeleteColor([anchorElDataColor?.item.id ?? 0])}
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
          setTypeDialogColor(TYPE_DIALOG.UPDATE);
          setOpenColor(!openColor);
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
      <Paper>
        <div className={classes.root}>
          <Accordion
            square
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
            style={{ borderRadius: 5 }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              aria-controls="additional-actions3-content"
              id="additional-actions3-header"
            >
              <Typography
                style={{
                  fontSize: 16,
                  color: colors.gray59,
                  fontStyle: "italic",
                  fontWeight: "bold",
                }}
              >
                Color
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              style={{ display: "flex", flexDirection: "column" }}
            >
              <EnhancedTableToolbarHeder
                label=""
                onCreate={() => {
                  setTypeDialogColor(TYPE_DIALOG.CREATE);
                  setOpenColor(!openColor);
                }}
                setTextFilter={(text: string) => {
                  setPageColor(0);
                  setTextFilterColor(text);
                }}
                textFilter={textFilterColor}
              />
              <Paper className={classes.paper}>
                <EnhancedTableToolbar
                  label=""
                  numSelected={selectedColor.length}
                  onCreate={() => {}}
                  onDelete={() => {
                    handleDeleteColor(selectedColor.map((e) => +e));
                  }}
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
                      numSelected={selectedColor.length}
                      order={orderColor}
                      orderBy={orderByColor}
                      onSelectAllClick={(event) => {
                        setSelectedColor(
                          FunctionUtil.handleSelectAllClick(event, dataColor)
                        );
                      }}
                      rowCount={dataColor.length}
                      headCells={headCellsOptionColor}
                      createSortHandler={createSortHandlerColor}
                    />
                    <TableBody style={{ position: "relative" }}>
                      {dataColor.length > 0 &&
                        FunctionUtil.stableSort(
                          dataColor,
                          FunctionUtil.getComparator(orderColor, orderByColor)
                        )
                          .slice(
                            pageColor * rowsPerPageColor,
                            pageColor * rowsPerPageColor + rowsPerPageColor
                          )
                          .map((row, index) => {
                            const isItemSelected = isSelectedColor(`${row.id}`);
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
                                    inputProps={{
                                      "aria-labelledby": labelId,
                                    }}
                                    onClick={(event) => {
                                      setSelectedColor(
                                        FunctionUtil.handleClick(
                                          event,
                                          `${row.id}`,
                                          selectedColor
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
                                  {row.colorName}
                                </TableCell>

                                <TableCell align="right">
                                  <Switch
                                    checked={row.isActive}
                                    onChange={() => handleUpdateColor({ row })}
                                    name={labelId}
                                    inputProps={{ "aria-label": labelId }}
                                    color="primary"
                                  />
                                </TableCell>
                                <TableCell align="right">
                                  <Button
                                    onClick={(event) => {
                                      handleProfileMenuOpenColor(event, row);
                                    }}
                                  >
                                    ...
                                  </Button>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      {dataColor?.length === 0 && (
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            width: "100%",
                          }}
                        >
                          <EmptyComponent />
                        </div>
                      )}
                      {emptyRowsColor > 0 && (
                        <TableRow style={{ height: 53 * emptyRowsColor }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={dataColor.length}
                  rowsPerPage={rowsPerPageColor}
                  page={pageColor}
                  onPageChange={handleChangePageColor}
                  onRowsPerPageChange={handleChangeRowsPerPageColor}
                />
              </Paper>
            </AccordionDetails>
          </Accordion>
        </div>
      </Paper>

      <Paper>
        <div className={classes.root}>
          <Accordion
            square
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
            style={{ borderRadius: 5 }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              aria-controls="additional-actions3-content"
              id="additional-actions3-header"
            >
              <Typography
                style={{
                  fontSize: 16,
                  color: colors.gray59,
                  fontStyle: "italic",
                  fontWeight: "bold",
                }}
              >
                Size
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              style={{ display: "flex", flexDirection: "column" }}
            >
              <EnhancedTableToolbarHeder
                label=""
                onCreate={() => {
                  setTypeDialogSize(TYPE_DIALOG.CREATE);
                  setOpenSize(!openSize);
                }}
                setTextFilter={(text: string) => {
                  setPageSize(0);
                  setTextFilterSize(text);
                }}
                textFilter={textFilterSize}
              />
              <Paper className={classes.paper}>
                <EnhancedTableToolbar
                  label=""
                  numSelected={selectedSize.length}
                  onCreate={() => {}}
                  onDelete={() => {
                    handleDeleteSize(selectedSize.map((e) => +e));
                  }}
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
                      numSelected={selectedSize.length}
                      order={orderSize}
                      orderBy={orderBySize}
                      onSelectAllClick={(event) => {
                        setSelectedSize(
                          FunctionUtil.handleSelectAllClick(event, data)
                        );
                      }}
                      rowCount={data.length}
                      headCells={headCellsOptionSize}
                      createSortHandler={createSortHandlerSize}
                    />
                    <TableBody style={{ position: "relative" }}>
                      {data.length > 0 &&
                        FunctionUtil.stableSort(
                          data,
                          FunctionUtil.getComparator(orderSize, orderBySize)
                        )
                          .slice(
                            pageSize * rowsPerPage,
                            pageSize * rowsPerPage + rowsPerPage
                          )
                          .map((row, index) => {
                            const isItemSelected = isSelectedSize(`${row.id}`);
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
                                    inputProps={{
                                      "aria-labelledby": labelId,
                                    }}
                                    onClick={(event) => {
                                      setSelectedSize(
                                        FunctionUtil.handleClick(
                                          event,
                                          `${row.id}`,
                                          selectedSize
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
                                  {row.sizeName}
                                </TableCell>

                                <TableCell align="right">
                                  <Switch
                                    checked={row.isActive}
                                    onChange={() => handleUpdateSize({ row })}
                                    name={labelId}
                                    inputProps={{ "aria-label": labelId }}
                                    color="primary"
                                  />
                                </TableCell>
                                <TableCell align="right">
                                  <Button
                                    onClick={(event) => {
                                      handleProfileMenuOpenSize(event, row);
                                    }}
                                  >
                                    ...
                                  </Button>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      {data?.length === 0 && (
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            width: "100%",
                          }}
                        >
                          <EmptyComponent />
                        </div>
                      )}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={pageSize}
                  onPageChange={handleChangePageSize}
                  onRowsPerPageChange={handleChangeRowsPerPageSize}
                />
              </Paper>
            </AccordionDetails>
          </Accordion>
        </div>
      </Paper>

      {renderMenu}
      {renderMenuColor}
      <FormDialogColor
        open={openColor}
        handleClose={handleCloseColor}
        anchorElData={anchorElDataColor}
        type={typeDialogColor}
        data={dataColor}
        loading={isLoading || loadingColor}
      />
      <FormDialogSize
        open={openSize}
        handleClose={handleCloseSize}
        anchorElData={anchorElDataSize}
        type={typeDialogSize}
        data={data}
        loading={isLoading || loadingColor}
      />
      {(isLoading || loadingColor) && <LoadingProgress />}
    </div>
  );
}
