import {
  Button,
  createStyles,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Delete from "@material-ui/icons/Delete";
import { useEffect, useState } from "react";
import TextInputComponent from "../../../../../component/TextInputComponent";
import { LIST_OPTION } from "../../../../../contant/ContaintDataAdmin";
import { useAppSelector } from "../../../../../hooks";
import { colors } from "../../../../../utils/color";
import { checkExist, getDifferenValue } from "../../../../../utils/function";

const ChildrenOption = (params: { list: any[]; isNoOption?: boolean }) => {
  const { list, isNoOption } = params;

  return (
    <>
      {!isNoOption && (
        <option key={0} value={0}>
          Chưa chọn
        </option>
      )}
      {list.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </>
  );
};

interface PropsRenderOption {
  handleDeleteOption: () => void;
  option: any;
  setOption: any;
  index: number;
  valueOption: any;
  optionValues: { colors: number[]; sizes: number[] };
  setOptionValues: any;
  listIdSelectedOptionValues: string[];
}

const RenderItemOption = (props: PropsRenderOption) => {
  const {
    handleDeleteOption,
    option,
    setOption,
    index,
    valueOption,
    optionValues,
    setOptionValues,
    listIdSelectedOptionValues,
  } = props;
  const classes = useStylesOption();

  const [listOption, setListOption] = useState<{ id: any; name: string }[]>([]);
  const colorData = useAppSelector((state) => state.colorAdmin).data;
  const sizesData = useAppSelector((state) => state.optionAdmin).data;

  useEffect(() => {
    if (Number(valueOption) === 1) {
      setListOption(
        colorData.map((e) => {
          return { id: e.id, name: e.colorName };
        })
      );

      setOptionValues({ ...optionValues, colors: [] });
    } else if (Number(valueOption) === 2) {
      setListOption(
        sizesData.map((e) => {
          return { id: e.id, name: e.sizeName };
        })
      );

      setOptionValues({ ...optionValues, sizes: [] });
    } else {
      setOptionValues({ sizes: [], colors: [] });
      setListOption([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueOption]);

  const addOptionValues = (array: string[]) => {
    const res = array.map((e) => Number(e));
    if (Number(valueOption) === 1) {
      let newValues = { ...optionValues, colors: res };
      setOptionValues(newValues);
    } else if (Number(valueOption) === 2) {
      let newValues = { ...optionValues, sizes: res };
      setOptionValues(newValues);
    }
  };

  const chaneOption = (event: { target: { value: any } }) => {
    const value = event.target.value;
    if (checkExist({ item: value, option: option })) {
      const res = option.map((val: any, ind: number) => {
        if (ind === index) {
          return value;
        } else return val;
      });
      setOption(res);
    }
  };

  const changeOptionValue = (event: any, index: number) => {
    const value = event.target.value;
    if (checkExist({ item: value, option: listIdSelectedOptionValues })) {
      const res = listIdSelectedOptionValues.map((val, ind) => {
        if (ind === index) {
          return value;
        } else return val;
      });
      addOptionValues(res);
    }
  };
  const deleteOptionValue = (index: number) => {
    const newRes = listIdSelectedOptionValues.filter((e, idx) => idx !== index);
    addOptionValues(newRes);
  };

  const addOptionValue = () => {
    if (Number(valueOption) !== 0) {
      let m = getDifferenValue({
        initList: listOption,
        option: listIdSelectedOptionValues,
      });

      if (Number(valueOption) === 1) {
        setOptionValues({
          ...optionValues,
          colors: optionValues.colors.concat([m]),
        });
      } else if (Number(valueOption) === 2) {
        setOptionValues({
          ...optionValues,
          sizes: optionValues.sizes.concat([m]),
        });
      }
    }
  };

  return (
    <div className={classes.root}>
      <TextInputComponent
        label="Option"
        value={valueOption}
        onChange={(event: any) => chaneOption(event)}
        isSelected={true}
        childrentSeleted={<ChildrenOption list={LIST_OPTION} />}
        isRequire
      />
      <Typography style={{ fontSize: 15, color: colors.gray59, marginTop: 10 }}>
        Option value
      </Typography>
      <div style={{ paddingLeft: 15 }}>
        {listIdSelectedOptionValues.map((e: any, index: number) => {
          return (
            <div key={index} style={{ display: "flex", alignItems: "center" }}>
              <TextInputComponent
                label={""}
                value={listIdSelectedOptionValues[index]}
                onChange={(event: any) => changeOptionValue(event, index)}
                isSelected={true}
                childrentSeleted={
                  <ChildrenOption list={listOption} isNoOption={true} />
                }
                isRequire
              />
              <div style={{}}>
                <IconButton onClick={() => deleteOptionValue(index)}>
                  <Delete color="inherit" />
                </IconButton>
              </div>
            </div>
          );
        })}

        <Button
          style={{ width: "100%", marginTop: 10 }}
          variant="outlined"
          color="primary"
          onClick={addOptionValue}
        >
          +
        </Button>
      </div>
      <div style={{ position: "absolute", top: -10, right: -10 }}>
        <IconButton onClick={() => handleDeleteOption()}>
          <Close color="secondary" />
        </IconButton>
      </div>
    </div>
  );
};
export default RenderItemOption;
const useStylesOption = makeStyles(() =>
  createStyles({
    root: {
      width: "30%",
      padding: 10,
      borderColor: colors.grayC4,
      borderWidth: 0.5,
      marginRight: 10,
      marginBottom: 10,
      borderRadius: 5,
      position: "relative",
    },
  })
);
