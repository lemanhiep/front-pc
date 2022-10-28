import {
  Button,
  createStyles,
  FormControl,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Theme,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import {
  DEFINE_ORDER,
  TYPE_ORDER,
} from "../../../screen/order/components/ItemOrderComponent";
import { colors } from "../../../utils/color";
interface EnhancedTableToolbarProps {
  label: string;
  onCreate: () => void;
  setStatus?: any;
  status?: number;
}

const EnhancedTableToolbarOrder = (props: EnhancedTableToolbarProps) => {
  const { onCreate, setStatus, status } = props;
  const classes = useToolbarStyles();
  const [textFilter, setTextFilter] = useState("");
  return (
    <Paper style={{ paddingTop: 10, paddingBottom: 15 }}>
      <div className={classes.filter}>
        <div className={classes.containerFilter}>
          <input
            value={textFilter}
            className={classes.textInput}
            onChange={(event) => {
              setTextFilter(event.target.value);
            }}
            placeholder="Search..."
          />
          <div className={classes.containerDate}>
            <div style={{ display: "flex", alignItems: "center"}}>
              <Typography style={{ color: colors.gray59,fontSize: 14 }}>
                {"Trạng thái: "}
              </Typography>
              <FormControl className={classes.formControl}>
                <Select
                  value={status}
                  onChange={(event) => {
                    setStatus(Number(event?.target?.value));
                  }}
                  className={classes.selectedStyle}
                >
                  <MenuItem value={10} className={classes.menuItem}>
                    <div
                      className={classes.itemStatus}
                      style={{ backgroundColor: colors.gradiantBlue }}
                    >
                      <Typography style={{ fontSize: 13 }}>Tất cả</Typography>
                    </div>
                  </MenuItem>
                  {Object.values(TYPE_ORDER).map((e) => {
                    return (
                      <MenuItem value={e} className={classes.menuItem}>
                        <div
                          className={classes.itemStatus}
                          style={{ backgroundColor: DEFINE_ORDER[e].color }}
                        >
                          <Typography style={{ fontSize: 13 }}>
                            {DEFINE_ORDER[e].title}
                          </Typography>
                        </div>
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className={classes.containerButton}>
            <Button
              variant="contained"
              style={{
                marginLeft: 10,
                backgroundColor: colors.gradiantBluePosition,
                color: colors.gradiantBlue,
              }}
              onClick={() => onCreate()}
            >
              Tạo mới đơn hàng
            </Button>
          </div>
        </div>
      </div>
    </Paper>
  );
};
export default EnhancedTableToolbarOrder;
const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    containerFilter: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
    },
    textInput: {
      width: "100%",
      borderColor: colors.grayC4,
      borderWidth: 0.5,
      height: 40,
      borderRadius: 5,
      marginTop: 10,
      paddingLeft: 10,
      paddingRight: 10,
    },
    containerDate: {
      minWidth: "30%",
      display: "flex",
      flexDirection: "row",
      marginLeft: 20,
      height:"100%",
    },
    dateInput: {
      borderColor: colors.grayC4,
      borderWidth: 0.5,
      padding: 5,
      borderRadius: 5,
    },
    filter: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingLeft: 15,
      paddingRight: 10,
    },
    textTitleDate: {
      fontSize: 12,
      color: colors.gray59,
    },
    containerButton: {
      width: "40%",
      height: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    formControl: {
      minWidth: 120,
      '& .MuiInput-underline:before':{
        borderBottomWidth: 0
      },
      marginLeft: 10
    },
    menuItem: {
      marginTop: 5,
      color: colors.white,
      display: "flex",
    },
    itemStatus: {
      width: "100%",
      borderRadius: 10,
      alignSelf: "center",
      display: "flex",
      justifyContent: "center",
      padding: 5,
      paddingRight: 0,
    },
    selectedStyle: {
      color: colors.white,
      height: 45,
    },
  })
);
