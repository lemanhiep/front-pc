import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React from "react";
import { useNavigate } from "react-router";
import { ROUTE, TYPE_ACCOUNT } from "../../../contant/Contant";
import { useAppDispatch } from "../../../hooks";
import ItemAddress from "../../setting/address/components/ItemAddressComponent";
import {
  DataAddress,
  setSelectedAddress,
} from "../../setting/address/slice/AddressSlice";
interface Props {
  open: any;
  handleClose: any;
  data: DataAddress[];
  title?: string;
  description?: string;
}

const FormDialogAddress = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { handleClose, open, data, title, description } = props;
  const onSelected = (item: DataAddress) => {
    dispatch(setSelectedAddress({ item: item }));
    handleClose();
  };
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
            <button
              key={index}
              style={{ width: 500 }}
              onClick={() => {
                onSelected(e);
              }}
            >
              <ItemAddress
                item={e}
                onClick={() => {
                  onSelected(e);
                }}
              />
            </button>
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            navigate(ROUTE.ACCOUNT, { state: { type: TYPE_ACCOUNT.ADDRESS } });
          }}
          color="primary"
        >
          Address Manager
        </Button>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default FormDialogAddress;
