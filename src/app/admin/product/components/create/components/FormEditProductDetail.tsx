import { Switch, TableCell, TableRow, TextField } from "@material-ui/core";
import { URL_IMAGE } from "../../../../../contant/Contant";
import { DetailProductAdmin } from "../../../../../contant/IntefaceContaint";
import { formatPrice } from "../../../../../utils/function";
import { createNotification } from "../../../../../utils/MessageUtil";

interface Props {
  row: DetailProductAdmin;
  labelId: string;
  listProductDetail: DetailProductAdmin[];
  setListProductDetail: any;
}

const FormEditProductDetail = (props: Props) => {
  const { row, labelId, listProductDetail, setListProductDetail } = props;

  const handleChangePrice = (params: {
    keyString: "priceImport" | "priceExport" | "quantity";
    text: string;
  }) => {
    const { keyString, text } = params;
    let newText = `${text}`.replace(",", "").replace(",", "").replace(",", "");
    const isNumber = Number.isInteger(Number(newText));
    if (!isNumber) {
      createNotification({
        type: "warning",
        message: "Bạn cần nhập giá số",
      });
      return;
    }
    let value = row[keyString];

    if (newText) {
      value = Number(newText);
    } else {
      value = 0;
      createNotification({
        type: "warning",
        message: "Bạn cần nhập giá xuất",
      });
    }

    const oldArray = listProductDetail;

    let item: DetailProductAdmin = { ...row };
    item[keyString] = value;

    const newProductDetail = oldArray?.map((e) => {
      if (e.id === item.id) return item;
      else return e;
    });
    setListProductDetail(newProductDetail);
  };

  const changeStatus = () => {
    const newRes = listProductDetail.map((e) => {
      if (e.id === row.id) return { ...e, isActive: !e.isActive };
      else return e;
    });
    setListProductDetail(newRes);
  };

  return (
    <TableRow hover tabIndex={-1} key={`${row.id}`}>
      <TableCell align="center" id={labelId} scope="row" padding="none">
        {row.id}
      </TableCell>
      <TableCell align="right">
        {row?.product?.productName ?? row?.productName ?? "..."}
      </TableCell>
      <TableCell align="right">
        {row.color.colorName ? row?.color?.colorName : ""}
        {row.size.sizeName ? "/" + row?.size?.sizeName : ""}
      </TableCell>

      <TableCell align="right">
        <TextField
          value={`${formatPrice(row?.priceImport)}`}
          onChange={(event) =>
            handleChangePrice({
              keyString: "priceImport",
              text: `${event.target.value}`,
            })
          }
          variant="outlined"
        />
      </TableCell>
      <TableCell align="right">
        <TextField
          value={`${formatPrice(row?.priceExport)}`}
          onChange={(event) =>
            handleChangePrice({
              keyString: "priceExport",
              text: `${event.target.value}`,
            })
          }
          variant="outlined"
        />
      </TableCell>
      <TableCell align="right">
        <img
          alt=""
          src={row?.productImage ?? URL_IMAGE}
          style={{ width: 120 }}
        />
      </TableCell>
      <TableCell align="right">
        <TextField
          value={`${formatPrice(row?.quantity)}`}
          onChange={(event) =>
            handleChangePrice({
              keyString: "quantity",
              text: `${event.target.value}`,
            })
          }
          variant="outlined"
        />
      </TableCell>
      <TableCell align="right">
        <Switch
          checked={row?.isActive ?? false}
          onChange={changeStatus}
          name={labelId}
          inputProps={{ "aria-label": labelId }}
          color="primary"
        />
      </TableCell>
    </TableRow>
  );
};
export default FormEditProductDetail;
