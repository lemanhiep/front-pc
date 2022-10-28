import { createNotification } from "./MessageUtil";

export const formatPrice = (num: number) => {
  return num ? num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") : 0;
};
const handleClick = (
  event: React.MouseEvent<unknown>,
  name: string,
  selected: any
) => {
  const selectedIndex = selected.indexOf(name);
  let newSelected: string[] = [];
  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, name);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selected.slice(1));
  } else if (selectedIndex === selected.length - 1) {
    newSelected = newSelected.concat(selected.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selected.slice(0, selectedIndex),
      selected.slice(selectedIndex + 1)
    );
  }
  return newSelected;
};
const handleSelectAllClick = (
  event: React.ChangeEvent<HTMLInputElement>,
  array: any[]
) => {
  if (event.target.checked) {
    const newSelecteds = array.map((n) => `${n.id}`);

    return newSelecteds;
  }
  return [];
};
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string | boolean | any },
  b: { [key in Key]: number | string | boolean | any }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const checkIsNumber = (number: number | string) => {
  if (!Number.isInteger(Number(number))) {
    createNotification({
      type: "warning",
      message: "Không phải số, vui lòng kiểm tra lại!",
    });
    return false;
  }
  return true;
};

export const getDifferenValue = (params: {
  initList: any[];
  option: any[];
}) => {
  const { initList, option } = params;
  let m = 0;
  let resArray = initList.filter((e) => !option.some((o) => +o === e?.id));
  if (option.length === 0) {
    m = initList[0].id;
  } else {
    m = resArray[0].id;
  }
  return m;
};

export const checkExist = (params: { item: any; option: any[] }) => {
  const { item, option } = params;
  let res = option.find((e) => +e === +item);
  if (!res) {
    return true;
  } else {
    createNotification({ type: "warning", message: "Đã tồn tại" });
    return false;
  }
};
export const FunctionUtil = {
  handleClick,
  handleSelectAllClick,
  stableSort,
  getComparator,
  descendingComparator,
  checkIsNumber,
};
