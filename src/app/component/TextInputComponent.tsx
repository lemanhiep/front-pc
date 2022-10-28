import {
  createStyles,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  makeStyles,
  OutlinedInput,
  TextField,
  Theme,
} from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { colors } from "../utils/color";
interface Props {
  label?: string;
  color?: any;
  classNameStyle?: any;
  require?: any;
  error?: any;
  onChange?: any;
  onBlur?: any;
  value: any;
  touched?: any;
  type?: any;
  id?: any;
  isPass?: boolean;
  rightIcon?: any;
  onRightIcon?: any;
  isSelected?: any;
  childrentSeleted?: any;
  helperText?: string;
  disabled?: boolean
  isRequire?: boolean
}
const TextInputComponent = (props: Props) => {
  const {
    value,
    classNameStyle,
    error,
    label,
    onBlur,
    onChange,
    require,
    touched,
    id,
    type,
    rightIcon,
    onRightIcon,
    isSelected,
    childrentSeleted,
    helperText,
    disabled,
    isRequire,
  } = props;
  const className = useStyles();
  return (
    <>
      {isSelected ? (
        <TextField
          id="outlined-select-currency-native"
          select
          label={<p style={{display:'flex'}}>{label} <p style={{color:colors.red,marginLeft: 5}}>{isRequire ? "*":''}</p></p>}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          SelectProps={{
            native: true,
          }}
          helperText={helperText}
          variant="outlined"
          style={{ height: 50 }}
          className={clsx(className.textField, classNameStyle)}
          disabled={disabled}
        >
          {childrentSeleted}
        </TextField>
      ) : (
        <FormControl
          className={clsx(className.textField, classNameStyle)}
          variant="outlined"
        >
          {label && (
            <InputLabel htmlFor={id ?? "outlined-adornment-amount"} style={{display:'flex'}}>
              {label}<p style={{color:colors.red,marginLeft: 5}}>{isRequire ? "*":''}</p>
            </InputLabel>
          )}
          <OutlinedInput
            id={id ?? "outlined-adornment-amount"}
            type={type ?? "text"}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            required={require}
            style={{ height: 50 }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => {
                    onRightIcon && onRightIcon();
                  }}
                  onMouseDown={() => {}}
                  edge="end"
                >
                  {rightIcon}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={`${label}`.length * 8.5}
            disabled={disabled}
          />
        </FormControl>
      )}
      <div className={className.errorContainer}>
        {error && touched ? (
          <p className={className.textErr}> {error}</p>
        ) : null}
      </div>
    </>
  );
};
export default TextInputComponent;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    errorContainer: {
      marginTop: 7,
    },
    textErr: {
      color: "red",
      fontSize: "12px",
      lineHeight: "22px",
    },
    textField: {
      marginTop: 20,
      borderColor: "white",
      width: "100%",
      height: 50,
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
  })
);

export const textInputStyles = useStyles;
