/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  createStyles,
  IconButton,
  makeStyles,
  TextField,
  Theme,
  Tooltip,
  Typography
} from "@material-ui/core";
import {
  FavoriteRounded,
  StarBorderRounded
} from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import R from "../../assets/R";
import LoadingProgress from "../../component/LoadingProccess";
import {
  CommentSkeleton,
  ProductSkeleton,
  TextSkeleton
} from "../../component/Skeleton";
import {
  data_detail,
  descriptionProduct,
  ItemCart
} from "../../contant/Contant";
import {
  DetailProductAdmin,
  ProductAdmin,
  ResultApi
} from "../../contant/IntefaceContaint";
import { useAppDispatch } from "../../hooks";
import { getIdAccount, getToken } from "../../service/StorageService";
import { colors } from "../../utils/color";
import { formatPrice } from "../../utils/function";
import { createNotification } from "../../utils/MessageUtil";
import { CreateCartDto, requestPostCreateCart } from "../cart/CartApi";
import { addProductToCart, incrementAsyncCart } from "../cart/slice/CartSlice";
import { CreateDto, requestPostCreateFavorite } from "../favorite/FavoriteApi";
import CommentComponent, {
  useCommentStyles
} from "./components/detail/CommentComponent";
import {
  requestGetProductCustomerById,
  requestGetProductDetailByIdProduct
} from "./ProductCustomerApi";

export interface ItemComment {
  id: number;
  value: string;
  children?: ItemComment[];
}

const EXAMPLE_COMMENT: ItemComment[] = [
  {
    id: 1,
    value: "Đây là sản phẩm rất tuyệt vời",
    children: [{ id: 1, value: "Đây là sản phẩm rất tuyệt vời" }],
  },
  {
    id: 2,
    value: "Đây là sản phẩm rất tuyệt vời",
    children: [{ id: 1, value: "Đây là sản phẩm rất tuyệt vời" }],
  },
  {
    id: 3,
    value: "Đây là sản phẩm rất tuyệt vời",
    children: [{ id: 1, value: "Đây là sản phẩm rất tuyệt vời" }],
  },
];

export const sortPriceToMax = (array: DetailProductAdmin[]) => {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i].priceExport > array[j].priceExport) {
        let a = array[i].priceExport;
        array[i].priceExport = array[j].priceExport;
        array[j].priceExport = a;
      }
    }
  }
  return `${formatPrice(array[0].priceExport)} - ${formatPrice(
    array[array.length - 1].priceExport
  )}`;
};

interface DataFilter {
  url: any;
  price: number;
  id: number;
}
interface Selection {
  optionId: string;
  optionValueId: number;
  value: string;
}

interface ProductById {
  id: number;
  productName: string;
  description: string;
  isActive: boolean;
  maxPrice: number;
  minPrice: number;
  options: {
    optionName: string;
    values_options: {
      id: number;
      name: string;
    }[];
  }[];
  voteAverage?: number;
  isFavorite: boolean;
}

const ProductDetailScreen = () => {
  const className = useStyles();
  const classNameComment = useCommentStyles();
  const dispatch = useAppDispatch();
  const state: any = useLocation().state;
  const item: ProductAdmin = state.item;
  const [count, setCount] = useState(1);
  const [selection, setSelection] = useState<Selection[]>([]);
  const [dataF, setDataF] = useState<DataFilter | null>(null);
  const [listDataFilter, setListDataFilter] = useState<DetailProductAdmin[]>(
    []
  );
  const [selectedReply, setSelectedReply] = useState<number>(0);
  const [listComment, setListComment] = useState(EXAMPLE_COMMENT);
  const [dataDetail, setDataDetail] = useState<ProductById | undefined>(
    undefined
  );
  const [textNewComment, setTextNewComment] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getDataFilterPrice();
  }, [state]);

  useEffect(() => {
    filterPrice();
  }, [selection]);

  const getDataFilterPrice = async () => {
    setIsLoading(true);
    const id_account = getIdAccount()
    try {
      const resultProductById: ResultApi<ProductById> =
        await requestGetProductCustomerById({
          product_id: item.id,
          account_id: id_account ? Number(id_account) : null,
        });
      const res: ResultApi<DetailProductAdmin[]> =
        await requestGetProductDetailByIdProduct({
          product_id: item.id,
        });
      setDataDetail(resultProductById.data);
      setListDataFilter(res.data);
      setIsLoading(false);
      await dispatch(incrementAsyncCart());
    } catch (e) {
      setIsLoading(false);
    }
  };

  const filterPrice = () => {
    if (selection.length === dataDetail?.options.length) {
      for (let index = 0; index < listDataFilter.length; index++) {
        let count = 0;
        for (let i = 0; i < selection.length; i++) {
          if (
            listDataFilter[index].size.id === selection[i].optionValueId &&
            selection[i].optionId === "Size"
          )
            count = count + 1;
          else if (
            listDataFilter[index].color.id === selection[i].optionValueId &&
            selection[i].optionId === "Color"
          )
            count = count + 1;
        }
        if (count === selection.length) {
          setDataF({
            price: listDataFilter[index].priceExport,
            url: "",
            id: listDataFilter[index].id,
          });
        }
      }
    } else {
      setDataF(null);
    }
  };

  const handleOption = (params: Selection) => {
    const { optionId, optionValueId, value } = params;
    const dataExist = selection.find(
      (e) => e.optionId === optionId && e.optionValueId === optionValueId
    );

    if (!dataExist) {
      const exist = selection.find((e) => e.optionId === optionId);
      if (exist) {
        setSelection(
          selection
            .filter((e) => e.optionId !== optionId)
            .concat([
              {
                optionId: optionId,
                optionValueId: optionValueId,
                value: value,
              },
            ])
        );
      } else {
        setSelection(
          selection.concat([
            { optionId: optionId, optionValueId: optionValueId, value: value },
          ])
        );
      }
    } else {
      setSelection(selection.filter((e) => e.optionId !== optionId));
    }
  };

  const handleCheck = (params: Selection) => {
    const { optionId, optionValueId } = params;
    const dataExist = selection.find(
      (e) => e.optionId === optionId && e.optionValueId === optionValueId
    );
    if (dataExist) return true;
    else return false;
  };

  const handleBuyProduct = async () => {
    const token = getToken();
    if (!token) {
      createNotification({
        type: "warning",
        message: "Bạn cần đăng nhập để thực hiện chức năng này",
      });
      return;
    }
    try {
      setIsLoading(true);
      const idAccount = getIdAccount();
      const payload: CreateCartDto = {
        accountId: Number(idAccount),
        detailProductId: dataF?.id ?? 0,
        quantity: count,
        totalPrice: dataF?.price ? count * dataF?.price : 0,
      };
      const res: ResultApi<ItemCart> = await requestPostCreateCart(payload);
      dispatch(addProductToCart({ item: res.data }));
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  const handleFavoriteProduct = async() =>{
    try {
      setIsLoading(true);
      const account_id = getIdAccount()
      if(!account_id){
        createNotification({
          type:"warning",
          message:"Bạn cần đăng nhập để thực hiện chức năng này"
        })
      }
      const payload: CreateDto ={
        account_id: Number(account_id),
        product_id: item.id
      }
      await requestPostCreateFavorite(payload)
      dataDetail && setDataDetail({...dataDetail,isFavorite: !dataDetail.isFavorite})
      createNotification({
        type:"success",
        message:"Thành công"
      })
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ position: "relative" }}>
      <div className={className.container}>
        {!dataF && listDataFilter.length === 0 ? (
          <div className={className.containerImage}>
            <ProductSkeleton width={"100%"} height={260} />
          </div>
        ) : (
          <div className={className.containerImage}>
            <img
              alt=""
              src={
                dataF && listDataFilter.length > 0
                  ? listDataFilter.find((e) => e.id === dataF.id)?.productImage
                  : item?.image
                  ? item.image
                  : R.images.img_product
              }
              style={{ width: "100%" }}
            />
          </div>
        )}
        <div style={{ width: "8%" }}>
          {listDataFilter.length > 0 ? (
            listDataFilter.map((e, index) => {
              return (
                <button key={index} style={{ width: "100%", marginBottom: 10 }}>
                  <img
                    alt=""
                    src={
                      e?.productImage ? e.productImage : R.images.img_product
                    }
                    style={{ width: "100%" }}
                  />
                </button>
              );
            })
          ) : (
            <div>
              {[0].map((e) => {
                return <ProductSkeleton width={"100%"} />;
              })}
            </div>
          )}
        </div>

        <div className={className.containerInfo}>
          {!dataDetail ? (
            <TextSkeleton />
          ) : (
            <p className={className.title}>
              {`${
                dataDetail?.productName ?? "Dang loading du lieu"
              }`.toUpperCase()}
            </p>
          )}

          {!dataF && !dataDetail ? (
            <TextSkeleton />
          ) : (
            <p className={className.price}>
              {dataF
                ? formatPrice(dataF.price)
                : `${formatPrice(dataDetail?.minPrice ?? 0)} - ${formatPrice(
                    dataDetail?.maxPrice ?? 0
                  )}`}
              đ
            </p>
          )}

          <Box component="fieldset" borderColor="transparent">
            <Rating
              name="customized-empty"
              precision={0.5}
              value={Number(dataDetail?.voteAverage ?? 0)}
              readOnly
              emptyIcon={<StarBorderRounded fontSize="inherit" />}
            />
          </Box>

          <Tooltip title="Yêu thích">
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={handleFavoriteProduct}>
                {dataDetail?.isFavorite  ? <FavoriteRounded color="secondary"/>:<FavoriteRounded color="inherit"/>} 
              </IconButton>
              <p style={{ color: colors.grayC4, fontSize: 13 }}>Yêu thích</p>
            </div>
          </Tooltip>

          {!dataDetail ? (
            <TextSkeleton />
          ) : (
            dataDetail?.options?.map((option, index) => {
              return (
                <div key={index}>
                  <p className={className.containerUpdateQuantity}>
                    {option.optionName}
                  </p>
                  <div className={className.containerUpdateQuantity}>
                    {option?.values_options?.map((optionValue, idx) => {
                      return (
                        <button
                          className={clsx(className.buttonInActive, {
                            [className.buttonActive]: handleCheck({
                              optionId: option.optionName,
                              optionValueId: optionValue.id,
                              value: optionValue.name,
                            }),
                            [className.marginLeft]: idx > 0,
                          })}
                          onClick={() =>
                            handleOption({
                              optionId: option.optionName,
                              optionValueId: optionValue.id,
                              value: optionValue.name,
                            })
                          }
                          key={idx}
                        >
                          {optionValue.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}

          {selection.length === data_detail.options.length && (
            <div className={className.containerDescription}>
              <p className={className.price}>Số lượng</p>
              <div className={className.containerUpdateQuantity}>
                <button
                  className={className.buttonUpdate}
                  onClick={() => {
                    if (count > 1) setCount(count - 1);
                  }}
                >
                  -
                </button>
                <p className={className.textCount}>{count}</p>
                <button
                  className={className.buttonUpdate}
                  onClick={() => {
                    setCount(count + 1);
                  }}
                  style={{ marginLeft: 15 }}
                >
                  +
                </button>
              </div>
            </div>
          )}

          {selection.length === data_detail.options.length && (
            <Button
              variant="outlined"
              className={className.buttonBuy}
              onClick={handleBuyProduct}
            >
              Thêm vào giỏ hàng
            </Button>
          )}

          {dataDetail ? (
            <div className={className.containerDescription}>
              <p
                className={className.price}
                style={{
                  borderBottomWidth: 1.5,
                  borderBottomColor: colors.gray59,
                }}
              >
                Mô tả
              </p>
              <p className={className.description}>
                {dataDetail?.description ?? descriptionProduct}
              </p>
            </div>
          ) : (
            <TextSkeleton />
          )}
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <Typography
          style={{
            color: colors.gray59,
            fontWeight: "bold",
            fontSize: 18,
            borderBottomColor: colors.grayC4,
            borderBottomWidth: 1,
            marginTop: 20,
          }}
        >
          Đánh giá
        </Typography>
        {listComment?.length === 0 ? (
          <CommentSkeleton />
        ) : (
          <div>
            <div className={classNameComment.containerComment}>
              <p
                style={{
                  color: colors.gray59,
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                Hãy viết ra cảm nhận của bạn
              </p>
              <TextField
                value={textNewComment}
                onChange={(event) => setTextNewComment(event.target.value)}
                placeholder={"Trả lời..."}
                className={classNameComment.inputStyle}
                variant="outlined"
              />
              {textNewComment.length > 0 && (
                <div
                  className={classNameComment.containerButton}
                  style={{ marginTop: 10 }}
                >
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setTextNewComment("")}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classNameComment.containerComment}
                    onClick={() => {
                      let newItem: ItemComment = {
                        id: Math.random(),
                        value: textNewComment,
                        children: [],
                      };

                      setListComment(listComment.concat(newItem));
                      setTextNewComment("");
                    }}
                  >
                    Submit
                  </Button>
                </div>
              )}
            </div>
            {listComment.map((e, index) => {
              const isSelected = e.id === selectedReply;
              return (
                <CommentComponent
                  item={e}
                  key={index}
                  isSelected={isSelected}
                  onSelected={(id: number) => {
                    setSelectedReply(id);
                  }}
                  onSubmit={(item: ItemComment, text: string) => {
                    const newArray = listComment.map((e) => {
                      if (e.id === item.id) {
                        let newItem: ItemComment = {
                          id: Math.random(),
                          value: text,
                        };
                        return {
                          ...e,
                          children: [newItem].concat(e?.children ?? []),
                        };
                      } else return e;
                    });
                    setListComment(newArray);
                    setSelectedReply(0);
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
      {isLoading && <LoadingProgress />}
    </div>
  );
};
export default ProductDetailScreen;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: 20,
      position: "relative",
    },
    containerImage: {
      width: "40%",
    },
    containerInfo: {
      width: "45%",
    },
    img: {
      width: "100%",
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.gray59,
    },
    description: {
      fontSize: 16,
      color: colors.gray59,
      fontStyle: "italic",
      marginTop: 5,
    },
    price: {
      color: colors.gray59,
      fontSize: 16,
      fontWeight: "bolder",
    },

    containerUpdateQuantity: {
      flexDirection: "row",
      display: "flex",
      alignItems: "center",
      marginTop: 5,
    },
    buttonUpdate: {
      width: 30,
      height: 30,
      justifyContent: "center",
      alignItems: "center",
      fontSize: 18,
      borderColor: colors.gray59,
      borderWidth: 1,
      borderRadius: 5,
    },
    textCount: {
      color: colors.gray59,
      marginLeft: 15,
    },
    buttonInActive: {
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderRadius: 3,
      borderColor: colors.grayC4,
      color: colors.gray59,
      fontSize: 15,
    },
    buttonActive: {
      backgroundColor: colors.orange,
      borderColor: colors.orange,
      color: colors.white,
    },
    buttonBuy: {
      width: "100%",
      borderRadius: 5,
      borderColor: colors.grayC4,
      color: colors.gray59,
      "&:hover": {
        borderColor: colors.orange,
        color: colors.orange,
      },
      marginTop: 10,
    },
    containerDescription: {
      marginTop: 15,
    },
    marginLeft: {
      marginLeft: 10,
    },
  })
);
