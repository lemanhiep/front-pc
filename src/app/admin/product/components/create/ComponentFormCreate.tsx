import {
  Button,
  Chip,
  createStyles,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  Input,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Theme,
} from "@material-ui/core";
import { Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import R from "../../../../assets/R";
import TextInputComponent from "../../../../component/TextInputComponent";
import { IMAGE_URL_DEFAULT, TYPE_DIALOG } from "../../../../contant/Contant";
import {
  CategoryAdmin,
  ProductAdmin,
  ResultApi,
} from "../../../../contant/IntefaceContaint";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { handleUploadImage } from "../../../../service/Services";
import { colors } from "../../../../utils/color";
import { createNotification } from "../../../../utils/MessageUtil";
import {
  CreateProductDto,
  requestPostCreateProduct,
  requestPutUpdateProduct,
  UpdateProductDto,
} from "../../ProductAdminApi";
import {
  changeLoading,
  createProduct,
  updateProduct,
} from "../../slice/ProductAdminSlice";
import { DataOptionProduct, PropsCreateProduct } from "../DialogCreateProduct";

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Props {
  initialValues: PropsCreateProduct;
  validateProduct: any;
  onSubmit: Function;
  handleClose: () => void;
  steps: any;
  dataProduct: ProductAdmin | null;
  options?: DataOptionProduct;
  type?: number;
  setDataProduct?: any;
}

const ComponentFormCreate = (props: Props) => {
  const {
    initialValues,
    onSubmit,
    validateProduct,
    handleClose,
    dataProduct,
    options,
    type,
    setDataProduct,
  } = props;

  const dispatch = useAppDispatch();
  const classes = useStyles();
  const fileRef = useRef<any>();

  const tags = useAppSelector((state) => state.tagAdmin).data;
  const materials = useAppSelector((state) => state.materialAdmin).data;
  const categories = useAppSelector((state) => state.categoryAdmin).data;
  const [categoriesChil, setCategoriesChil] = useState<CategoryAdmin[]>([]);

  const [personTag, setPersonTag] = useState<string[]>([]);
  const [personMaterial, setPersonMaterial] = useState<string[]>([]);

  const [category, setCategory] = useState<string | null>(null);
  const [categoryChildren, setCategoryChilren] = useState<string | null>(null);

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState<any>(IMAGE_URL_DEFAULT);

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    if (dataProduct) {
      setCategory(`${dataProduct.category.categoryParentId}`);
      setCategoryChilren(`${dataProduct.category.id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataProduct]);

  useEffect(() => {
    getDataCategoryChil();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  useEffect(() => {
    changeOptionProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  const changeOptionProduct = () => {
    const listTag = options?.tagList?.map((e) => `${e.tagName}`);
    const listMaterial = options?.materialList?.map((e) => `${e.materialName}`);

    if (options) {
      listTag && setPersonTag(listTag);
      listMaterial && setPersonMaterial(listMaterial);
    }
  };

  const getDataCategoryChil = async () => {
    if (category) {
      const item = categories?.find((e) => e.id === +category);
      setCategoriesChil(item?.categoryChildren ?? []);
    } else return setCategoriesChil([]);
  };

  const handleChangeTag = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPersonTag(event.target.value as string[]);
  };
  const handleChangeMaterial = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setPersonMaterial(event.target.value as string[]);
  };

  const handleSubmitCreate = async (data: PropsCreateProduct) => {
    const { description, product_name } = data;
    if (!categoriesChil) {
      createNotification({
        type: "warning",
        message: "Bạn cần chọn danh mục cho sản phẩm",
      });
      return;
    }

    let materialList: number[] = [];

    materials.forEach((e) => {
      let res = personMaterial?.find((m) => m.includes(`${e.materialName}`));
      if (res !== undefined) materialList = materialList.concat([e.id]);
    });

    let tagsList: number[] = [];
    tags.forEach((e) => {
      let res = personTag?.find((m) => m.includes(`${e.tagName}`));
      if (res !== undefined) tagsList = tagsList.concat([e.id]);
    });
    dispatch(changeLoading(true));
    
    try {
      if (type === TYPE_DIALOG.CREATE) {
        if(!selectedFile){
          createNotification({
            type:"warning",
            message:"Bạn cần chọn ảnh"
          })
        }
        const urlImage = await handleUploadImage(selectedFile);
        const itemCreate: CreateProductDto = {
          categoryId: Number(categoryChildren) ?? 0,
          description: description,
          productName: product_name,
          tagProductIdList: tagsList,
          materialProductIdList: materialList,
          image: urlImage,
        };
        const res: ResultApi<ProductAdmin> = await requestPostCreateProduct(
          itemCreate
        );
        onSubmit(res.data);
        dispatch(createProduct({ item: res.data }));
      } else if (type === TYPE_DIALOG.UPDATE && dataProduct) {
        let urlImage = ''
        if(selectedFile){
           urlImage = await handleUploadImage(selectedFile);
        }
        const payload: UpdateProductDto = {
          categoryId: Number(categoryChildren) ?? 0,
          description: description,
          id: dataProduct.id,
          image: selectedFile ? urlImage : dataProduct.productImage,
          productName: product_name,
          isActive: dataProduct.isActive,
          materialProductIds: materialList,
          tagProductIds: tagsList,
          isDelete: false,
          voteAverage: dataProduct.voteAverage,
        };

        const res: ResultApi<ProductAdmin> = await requestPutUpdateProduct(
          payload
        );
        setDataProduct(null);
        dispatch(updateProduct({ item: res.data }));
        handleClose();
      }
      dispatch(changeLoading(false));
    } catch (e) {
      dispatch(changeLoading(false));
    }
  };

  return (
    <Formik
      initialValues={
        dataProduct
          ? {
              product_name: dataProduct.productName,
              description: dataProduct.description,
            }
          : initialValues
      }
      onSubmit={(data) => {
        handleSubmitCreate(data);
      }}
      validateOnChange
      validationSchema={validateProduct}
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        touched,
      }) => (
        <>
          <DialogContent style={{ width: "100%" }}>
            <DialogContentText>
              Cập nhật thông tin cá nhân của Product, vui lòng điền tất cả thông
              tin cần thiết
            </DialogContentText>
            <div>
              <button
                onClick={() => {
                  fileRef?.current?.click();
                }}
                style={{
                  width: 120,
                  borderRadius: 5,
                  borderColor: colors.grayC4,
                  borderWidth: 0.5,
                  position: "relative",
                }}
              >
                {(dataProduct?.image || preview) ? (
                  <img alt="" src={preview ?? dataProduct?.image ??  R.images.img_product} />
                ) : (
                  <p style={{ marginTop: 40, marginBottom: 40,display:'flex' }}>
                    Choose Image <p style={{color:'red'}}>{`**`}</p>
                  </p>
                )}
              </button>
              {preview && (
                <Button
                  onClick={() => {
                    setPreview(undefined);
                    setSelectedFile(undefined);
                  }}
                >
                  Huỷ chọn
                </Button>
              )}
              <input
                type="file"
                ref={fileRef}
                multiple={false}
                onChange={onSelectFile}
                accept="image/png, image/jpeg"
                hidden
              />
            </div>

            <TextInputComponent
              error={errors.product_name}
              touched={touched.product_name}
              value={values.product_name}
              label={"product name"}
              onChange={handleChange("product_name")}
              onBlur={handleBlur("product_name")}
              isRequire
            />
            <TextInputComponent
              error={errors.description}
              touched={touched.description}
              value={values.description}
              label={"description"}
              onChange={handleChange("description")}
              onBlur={handleBlur("description")}
              isRequire
            />
            <TextInputComponent
              label="Category"
              value={category}
              onChange={(event: any) => {
                const value = event.target.value;
                setCategory(value);
              }}
              isRequire
              isSelected={true}
              childrentSeleted={
                <>
                  <option key={0} value={0}>
                    Chưa chọn
                  </option>
                  {categories
                    .filter(
                      (e) =>
                        e.isActive === true &&
                        e?.categoryChildren &&
                        e?.categoryChildren?.length > 0
                    )
                    .map((option,index) => (
                      <option key={index} value={option.id}>
                        {option.categoryName}
                      </option>
                    ))}
                </>
              }
            />
            {categoriesChil.length > 0 && (
              <TextInputComponent
                label="Category chil"
                value={categoryChildren}
                onChange={(event: any) => {
                  const value = event.target.value;
                  setCategoryChilren(value);
                }}
                isSelected={true}
                isRequire
                childrentSeleted={
                  <>
                    <option key={0} value={0}>
                      Chưa chọn
                    </option>
                    {categoriesChil
                      .filter((e) => e.isActive === true)
                      .map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.categoryName}
                        </option>
                      ))}
                  </>
                }
              />
            )}
            <div>
              <FormControl className={classes.formControl} variant="outlined">
                <InputLabel id="demo-mutiple-chip-label">Tag</InputLabel>
                <Select
                  labelId="demo-mutiple-chip-label"
                  id="demo-mutiple-chip"
                  multiple
                  value={personTag}
                  onChange={handleChangeTag}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={(selected) => (
                    <div className={classes.chips}>
                      {(selected as string[]).map((value,index) => (
                        <Chip
                          key={index}
                          label={value}
                          className={classes.chip}
                        />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {tags
                    .filter((e) => e.isActive === true)
                    .map((tag, index) => (
                      <MenuItem
                        key={index}
                        value={tag.tagName}
                        style={{
                          marginTop: 5,
                          marginRight: 5,
                          marginLeft: 5,
                          backgroundColor: personTag?.find(
                            (e) => e === `${tag.tagName}`
                          )
                            ? colors.orange
                            : colors.white,
                        }}
                      >
                        {tag.tagName}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>

            <div>
              <FormControl className={classes.formControl} variant="outlined">
                <InputLabel id="demo-mutiple-chip-label">Material</InputLabel>
                <Select
                  labelId="demo-mutiple-chip-label"
                  id="demo-mutiple-chip"
                  multiple
                  value={personMaterial}
                  onChange={handleChangeMaterial}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={(selected) => (
                    <div className={classes.chips}>
                      {(selected as string[]).map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          className={classes.chip}
                        />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {materials
                    .filter((e) => e.isActive === true)
                    .map((material, index) => (
                      <MenuItem
                        key={index}
                        value={material.materialName}
                        style={{
                          marginTop: 5,
                          marginRight: 5,
                          marginLeft: 5,
                          backgroundColor: personMaterial?.find(
                            (e) => e === `${material.materialName}`
                          )
                            ? colors.orange
                            : colors.white,
                        }}
                      >
                        {material.materialName}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            {type === TYPE_DIALOG.UPDATE && (
              <Button
                onClick={async () => {
                  handleSubmit();
                }}
                color="primary"
              >
                Submit and Close
              </Button>
            )}
            <Button onClick={() => handleSubmit()} color="primary">
              Submit and Next
            </Button>
          </DialogActions>
        </>
      )}
    </Formik>
  );
};
export default ComponentFormCreate;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      width: "100%",
      borderColor: colors.grayC4,
      borderWidth: 0.8,
      marginTop: 20,
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  })
);
