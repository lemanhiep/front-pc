import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React from "react";
import { VoucherAdmin } from "../../../contant/IntefaceContaint";
import ComponentVoucher from "./ComponentVoucher";
interface Props {
  open: any;
  handleClose: any;
  data: VoucherAdmin[];
  title?: string;
  description?: string;
  selected: VoucherAdmin | null;
  setSelected: any;
}

const FormDialogVoucher = (props: Props) => {
  const { handleClose, open, data, title, description, selected, setSelected } =
    props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      style={{ width: "100%" }}
    >
      {title && <DialogTitle id="form-dialog-title">{title}</DialogTitle>}
      <DialogContent style={{ width: "100%" }}>
        {description && <DialogContentText>{description}</DialogContentText>}
        {data.map((e, index) => {
          return (
            <div key={index} style={{ width: 500 }}>
              <ComponentVoucher
                item={e}
                onPress={() => {
                  setSelected(e.id === selected?.id ? null : e);
                  handleClose();
                }}
                isSelected={e.id === selected?.id ? true : false}
                inList={true}
              />
            </div>
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default FormDialogVoucher;
