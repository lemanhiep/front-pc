import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import { colors } from "../utils/color";
import { Order } from "../utils/function";

interface EnhancedTableProps {
  classes: any;
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  headCells: any[];
  createSortHandler: any;
  childrenMore?: any;
  nonActivties?: boolean;
  isNoSort?: boolean;
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    headCells,
    createSortHandler,
    childrenMore,
    nonActivties,
    isNoSort,
  } = props;
  return (
    <TableHead>
      <TableRow>
        <TableCell
          padding="checkbox"
          style={{
            backgroundColor: colors.gradiantBluePosition,
            borderTopLeftRadius: 5,
            borderBottomColor: colors.white,
            borderBottomLeftRadius: 5,
          }}
        >
          {!nonActivties && (
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ "aria-label": "select all desserts" }}
            />
          )}
        </TableCell>

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={!isNoSort && orderBy === headCell.id ? order : false}
            style={{
              backgroundColor: colors.gradiantBluePosition,
              borderBottomColor: colors.white,
            }}
          >
            <TableSortLabel
              active={!isNoSort && orderBy === headCell.id}
              direction={!isNoSort && orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              style={{ color: colors.gradiantBlue }}
            >
              {headCell.label}
              {!isNoSort && orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        {childrenMore}
        {!nonActivties && (
          <TableCell
            align="right"
            style={{
              backgroundColor: colors.gradiantBluePosition,
              color: colors.gradiantBlue,
              borderBottomColor: colors.white,
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
            }}
          >
            Hoạt động
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
};
export default EnhancedTableHead;
