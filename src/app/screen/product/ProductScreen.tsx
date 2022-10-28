import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Chip,
  Collapse,
  createStyles,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Slider,
  TablePagination,
  Theme,
  Typography,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { useEffect, useState } from "react";
import LoadingProgress from "../../component/LoadingProccess";
import ProductItemComponent from "../../component/product_item/ProductItemComponent";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { colors } from "../../utils/color";
import { formatPrice } from "../../utils/function";
import {
  FilterPayloadProductDto,
  FilterProductDto,
} from "./ProductCustomerApi";
import { incrementAsyncProduct } from "./slice/ProductCustomerSlice";
import { incrementAsyncFilter } from "./slice/FilterValueSlice";
import R from "../../assets/R";
import { ProductSkeleton } from "../../component/Skeleton";
import { useLocation } from "react-router";
import { Material, Tag } from "../../contant/IntefaceContaint";

const RenderChipFilter = (params: {
  keyValue: string;
  arrayFind: any[];
  listId: any[];
  onDelete: (id: number) => void;
  color: string;
  label?: string
}) => {
  const { arrayFind, keyValue, listId, onDelete, color,label } = params;
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
      {listId.length > 0 && (
        <Typography
          variant="caption"
          style={{ color: color, fontWeight: "bolder" }}
        >
          {label ? label : "Fvalue"} {":"}
        </Typography>
      )}
      {listId.map((e, index) => {
        const value = arrayFind.find((el: any) => el.id === e);
        return (
          <Chip
            label={`${value ? value[keyValue] : ""}`}
            onDelete={() => onDelete(e)}
            variant="outlined"
            key={index}
            style={{ marginLeft: 5, color: color }}
          />
        );
      })}
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
      scrollBehavior: "auto",
      display: "flex",
      justifyContent: "space-between",
    },
    image_banner: {
      width: "75%",
      position: "relative",
    },
    listImage: {
      display: "flex",
      flexWrap: "wrap",
      width: "100%",
    },
    textTitle: {
      paddingTop: 15,
      paddingBottom: 15,
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "left",
    },
    categoryContainer: {
      width: "20%",
      paddingTop: 30,
      position: "relative",
    },
    buttonCategory: {
      paddingTop: 5,
      paddingBottom: 5,
      borderColor: colors.white,
      borderWidth: 1,
      borderRadius: 5,
      color: colors.gray59,
      "&:hover": {
        color: colors.black,
        borderColor: colors.grayC4,
      },
      paddingLeft: 10,
      paddingRight: 10,
      width: "100%",
      alignItems: "flex-start",
      display: "flex",
    },
    textLabelValueFilter: {
      color: colors.black,
      fontWeight: "bold",
    },
    textValueFilter: {
      color: colors.gray59,
      fontStyle: "italic",
      fontSize: 14,
    },
    containerFilterValue: {
      paddingLeft: 10,
      paddingTop: 8,
      paddingBottom: 8,
    },
    buttonFilter: {
      padding: 10,
      borderRadius: 5,
      borderColor: colors.grayC4,
      borderWidth: 0.5,
      marginRight: "5%",
      marginBottom: 10,
    },
    root: {
      position: "absolute",
      backgroundColor: "rgba(0,0,0,0.3)",
      width: "100%",
      top: 0,
      height: "100%",
    },
    rootAccordion: {},
    rootAccordionSummary: {
      height: 20,
      marginTop: 5,
      paddingTop: 5,
    },
    rootAccordionDetails: { display: "flex", flexDirection: "column" },
  })
);
interface ParamsFilter {
  material?: Material
  tag?:Tag
}

const ProductScreen = () => {
  const className = useStyles();
  const dispatch = useAppDispatch();
  const paramsLocation: any = useLocation().state
  
  
  const [value, setValue] = useState([0, 1500]);
  const loadingProduct = useAppSelector(
    (state) => state.productCustomer
  ).isLoading;
  const dataProduct = useAppSelector((state) => state.productCustomer).data;
  const countProduct = useAppSelector((state) => state.productCustomer).count;
  const loadingFilter = useAppSelector(
    (state) => state.filterCustomer
  ).isLoading;
  const dataFilter = useAppSelector((state) => state.filterCustomer).data;
  const [selectedParent, setSeletedParent] = useState<Number[]>([]);
  const [payload, setPayLoad] = useState<FilterPayloadProductDto>({
    page: 0,
    size: 10,
    listCategoryId: [],
    listColorId: [],
    listMaterialId: [],
    listSizeId: [],
    listTagId: [],
  });

  useEffect(()=>{
    if(paramsLocation){
      const param: ParamsFilter = paramsLocation
      const newPayload = {
        ...payload,
        listTagId: param.tag ? [param.tag?.id] : payload.listTagId,
        listMaterialId: param.material ? [param.material?.id] : payload.listMaterialId
      }
      setPayLoad(newPayload)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[paramsLocation])

  useEffect(() => {
    const timer = setTimeout(() => {
      getData();
    }, 2000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload]);

  useEffect(() => {
    if (dataFilter.categories?.length === 0) {
      dispatch(incrementAsyncFilter());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    const payloadGetList: FilterProductDto = {
      ...payload,
      topPrice: value[1] * 100000,
      bottomPrice: value[0],
    };
    dispatch(incrementAsyncProduct(payloadGetList));
  };

  const rangeSelector = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPayLoad({ ...payload, page: newPage });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPayLoad({
      ...payload,
      page: 0,
      size: parseInt(event.target.value, 10),
    });
  };

  const onSeledtedCategoryParent = (id: number) => {
    const res = selectedParent.find((e) => e === id);
    if (res) setSeletedParent(selectedParent.filter((e) => e !== id));
    else setSeletedParent(selectedParent.concat([id]));
  };

  const onChangeValueFilter = (params: {
    key: keyof FilterPayloadProductDto;
    status?: boolean;
    id: number;
  }) => {
    const { key, status, id } = params;
    let newArray: any = payload[key];
    if (status) {
      newArray = newArray.concat([id]);
    } else {
      newArray = newArray.filter((e: number) => e !== id);
    }
    const newData = {
      ...payload,
      page: 0,
      [key]: newArray,
    };
    setPayLoad(newData);
  };

  return (
    <div className={className.container}>
      <div className={className.categoryContainer}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <p className={className.textLabelValueFilter}> Danh mục</p>
          </AccordionSummary>

          <AccordionDetails className={className.rootAccordionDetails}>
            {dataFilter?.categories &&
              dataFilter?.categories.map((value, idx) => {
                const isSelectParent =
                  selectedParent.find((e) => e === value.id) !== undefined;
                return (
                  <p key={idx}>
                    <ListItem
                      button
                      onClick={() => onSeledtedCategoryParent(value.id)}
                      className={className.buttonCategory}
                      style={{
                        color: isSelectParent ? colors.black : colors.gray59,
                        fontWeight: isSelectParent ? "bold" : "normal",
                      }}
                    >
                      <ListItemText primary={`${value.categoryName}`} />
                      {isSelectParent ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={isSelectParent} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {value?.categoryChildren &&
                          value?.categoryChildren.map((val, index) => {
                            return (
                              <ListItem
                                button
                                className={className.buttonCategory}
                                style={{ marginLeft: 10 }}
                                key={index}
                              >
                                <FormControlLabel
                                  aria-label="Acknowledge"
                                  control={
                                    <Checkbox
                                      checked={
                                        payload.listCategoryId.find(
                                          (ex) => ex === val.id
                                        )
                                          ? true
                                          : false
                                      }
                                      onChange={(
                                        event: any,
                                        checked: boolean
                                      ) => {
                                        onChangeValueFilter({
                                          key: "listCategoryId",
                                          status: checked,
                                          id: val.id,
                                        });
                                      }}
                                    />
                                  }
                                  label={`${val.categoryName}`}
                                  key={index}
                                />
                              </ListItem>
                            );
                          })}
                      </List>
                    </Collapse>
                  </p>
                );
              })}
          </AccordionDetails>
        </Accordion>
        <Accordion
          style={{
            display: "block",
          }}
          className={className.containerFilterValue}
          defaultExpanded={true}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className={className.rootAccordionSummary}
          >
            <p className={className.textLabelValueFilter}>Price range:</p>
          </AccordionSummary>
          <AccordionDetails className={className.rootAccordionDetails}>
            <Slider
              value={value}
              onChange={rangeSelector}
              min={0}
              max={1500}
              style={{ marginLeft: 5 }}
            />
            <p className={className.textValueFilter}>
              {value[0] !== value[1]
                ? `${formatPrice(value[0] * 1000)}đ - ${formatPrice(
                    value[1] * 1000
                  )}đ`
                : `${formatPrice(value[0] * 1000)}đ`}
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion className={className.containerFilterValue}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className={className.rootAccordionSummary}
          >
            <p className={className.textLabelValueFilter}>Color</p>
          </AccordionSummary>

          <AccordionDetails className={className.rootAccordionDetails}>
            {dataFilter?.colors &&
              dataFilter?.colors.map((e, index) => {
                return (
                  <FormControlLabel
                    aria-label="Acknowledge"
                    control={
                      <Checkbox
                        onChange={(event: any, checked: boolean) => {
                          onChangeValueFilter({
                            key: "listColorId",
                            status: checked,
                            id: e.id,
                          });
                        }}
                        checked={
                          payload.listColorId.find((ex) => ex === e.id)
                            ? true
                            : false
                        }
                      />
                    }
                    label={`${e.colorName}`}
                    key={index}
                  />
                );
              })}
          </AccordionDetails>
        </Accordion>

        <Accordion className={className.containerFilterValue}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className={className.rootAccordionSummary}
          >
            <p className={className.textLabelValueFilter}>Size</p>
          </AccordionSummary>

          <AccordionDetails className={className.rootAccordionDetails}>
            {dataFilter?.sizes &&
              dataFilter?.sizes.map((e, index) => {
                return (
                  <FormControlLabel
                    aria-label="Acknowledge"
                    control={
                      <Checkbox
                        onChange={(event: any, checked: boolean) => {
                          onChangeValueFilter({
                            key: "listSizeId",
                            status: checked,
                            id: e.id,
                          });
                        }}
                        checked={
                          payload.listSizeId.find((ex) => ex === e.id)
                            ? true
                            : false
                        }
                      />
                    }
                    label={`${e.sizeName}`}
                    key={index}
                  />
                );
              })}
          </AccordionDetails>
        </Accordion>

        <Accordion className={className.containerFilterValue}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className={className.rootAccordionSummary}
          >
            <p className={className.textLabelValueFilter}>Material</p>
          </AccordionSummary>

          <AccordionDetails className={className.rootAccordionDetails}>
            {dataFilter?.materials &&
              dataFilter?.materials.map((e, index) => {
                return (
                  <FormControlLabel
                    aria-label="Acknowledge"
                    control={
                      <Checkbox
                        onChange={(event: any, checked: boolean) => {
                          onChangeValueFilter({
                            key: "listMaterialId",
                            status: checked,
                            id: e.id,
                          });
                        }}
                        checked={
                          payload.listMaterialId.find((ex) => ex === e.id)
                            ? true
                            : false
                        }
                      />
                    }
                    label={`${e.materialName}`}
                    key={index}
                  />
                );
              })}
          </AccordionDetails>
        </Accordion>

        <Accordion className={className.containerFilterValue}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className={className.rootAccordionSummary}
          >
            <p className={className.textLabelValueFilter}>Tag</p>
          </AccordionSummary>

          <AccordionDetails className={className.rootAccordionDetails}>
            {dataFilter?.tags &&
              dataFilter?.tags.map((e, index) => {
                return (
                  <FormControlLabel
                    aria-label="Acknowledge"
                    control={
                      <Checkbox
                        onChange={(event: any, checked: boolean) => {
                          onChangeValueFilter({
                            key: "listTagId",
                            status: checked,
                            id: e.id,
                          });
                        }}
                        checked={
                          payload.listTagId.find((ex) => ex === e.id)
                            ? true
                            : false
                        }
                      />
                    }
                    label={`${e.tagName}`}
                    key={index}
                  />
                );
              })}
          </AccordionDetails>
        </Accordion>
        {loadingFilter && <LoadingProgress />}
      </div>

      <div className={className.image_banner}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p className={className.textTitle}>Sản phẩm</p>
        </div>
        <div>
          {payload.listCategoryId.map((e, index) => {
            return (
              <Chip
                label={`${e}`}
                onDelete={() => {
                  onChangeValueFilter({
                    key: "listCategoryId",
                    status: false,
                    id: e,
                  });
                }}
                color="primary"
                variant="outlined"
                key={index}
                style={{ marginLeft: 5 }}
              />
            );
          })}
        </div>
        <RenderChipFilter
          arrayFind={dataFilter.colors ?? []}
          keyValue={"colorName"}
          listId={payload.listColorId}
          onDelete={(id: number) => {
            onChangeValueFilter({
              key: "listColorId",
              status: false,
              id: id,
            });
          }}
          color={"red"}
          label={"Màu Sắc"}
        />
        <RenderChipFilter
          arrayFind={dataFilter.sizes ?? []}
          keyValue={"sizeName"}
          listId={payload.listSizeId}
          label={"Kích thước"}
          onDelete={(id: number) => {
            onChangeValueFilter({
              key: "listSizeId",
              status: false,
              id: id,
            });
          }}
          color={colors.gray59}
        />
        <RenderChipFilter
          arrayFind={dataFilter.materials ?? []}
          keyValue={"materialName"}
          listId={payload.listMaterialId}
          onDelete={(id: number) => {
            onChangeValueFilter({
              key: "listMaterialId",
              status: false,
              id: id,
            });
          }}
          label={"Chất liệu"}
          color={colors.orange}
        />
        <RenderChipFilter
          arrayFind={dataFilter.tags ?? []}
          keyValue={"tagName"}
          listId={payload.listTagId}
          onDelete={(id: number) => {
            onChangeValueFilter({
              key: "listTagId",
              status: false,
              id: id,
            });
          }}
          label={"Thẻ gắn"}
          color={"green"}
        />
        <div className={className.listImage}>
          {dataProduct.length > 0
            ? dataProduct.map((value, idx) => {
                return (
                  <ProductItemComponent
                    item={value}
                    key={idx}
                    width={"22%"}
                    image={value?.productImage ?? R.images.img_product}
                  />
                );
              })
            : [0, 1, 2].map((e) => {
                return <ProductSkeleton />;
              })}
        </div>
        <div>
          <TablePagination
            rowsPerPageOptions={[10, 20, 50]}
            component="div"
            count={countProduct ?? 100}
            rowsPerPage={payload.size}
            page={payload.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
        {loadingProduct && <LoadingProgress />}
      </div>
    </div>
  );
};
export default ProductScreen;
