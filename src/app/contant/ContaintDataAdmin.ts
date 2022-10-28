import {
  Branch,
  CategoryAdmin,
  DataStateOption,
  DetailProductAdmin,
  HeadCell,
  Material,
  Option,
  OptionColor,
  OptionSize,
  ProductAdmin,
  Tag,
  UserAdmin,
  UserAdminInteface,
  VoucherAdmin,
} from "./IntefaceContaint";
import R from "../assets/R";
import { OrderDto } from "../screen/order/slice/OrderSlice";
export const rows_example_user: UserAdminInteface[] = [
  {
    id: 1,
    email: "Levancu562@gmail.com",
    phone: "0965259441",
    position: "Admin",
    first_name: "Pham",
    last_name: "Van Cu",
    active: 1,
  },
  {
    id: 2,
    email: "Levancu562@gmail.com",
    phone: "097940215",
    position: "User",
    first_name: "Le",
    last_name: "Van Cu",
    active: 1,
  },
  {
    id: 3,
    email: "Levancu562@gmail.com",
    phone: "0965259441",
    position: "Admin",
    first_name: "Pham",
    last_name: "Van Tam",
    active: 1,
  },
  {
    id: 4,
    email: "Levancu562@gmail.com",
    phone: "0965259441",
    position: "Admin",
    first_name: "Pham",
    last_name: "K kkk",
    active: 0,
  },
  {
    id: 5,
    email: "Levancu562@gmail.com",
    phone: "0965259441",
    position: "Admin",
    first_name: "Pham",
    last_name: "Van Cu",
    active: 1,
  },
  {
    id: 6,
    email: "Levancu562@gmail.com",
    phone: "0965259441",
    position: "Admin",
    first_name: "Pham",
    last_name: "Van Cu",
    active: 1,
  },
  {
    id: 7,
    email: "Levancu562@gmail.com",
    phone: "0965259441",
    position: "Admin",
    first_name: "Pham",
    last_name: "K cu",
    active: 0,
  },
  {
    id: 8,
    email: "Levancu562@gmail.com",
    phone: "0965259441",
    position: "Admin",
    first_name: "Pham",
    last_name: "Van Cu",
    active: 1,
  },
];

export const headCells: HeadCell<UserAdmin>[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "STT",
  },
  { id: "email", numeric: true, disablePadding: false, label: "Email" },
  {
    id: "phoneNumber",
    numeric: true,
    disablePadding: false,
    label: "Số điện thoại",
  },
  { id: "role", numeric: true, disablePadding: false, label: "Vai trò" },
  {
    id: "fullName",
    numeric: true,
    disablePadding: false,
    label: "Tên đầy đủ",
  },
  { id: "isActive", numeric: true, disablePadding: false, label: "Trạng thái" },
];

export const headCellsCategory: HeadCell<CategoryAdmin>[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "STT",
  },
  {
    id: "categoryName",
    numeric: true,
    disablePadding: false,
    label: "Tên danh mục",
  },

  { id: "isActive", numeric: true, disablePadding: false, label: "Trạng thái" },
];

export const LIST_CATEGORY: CategoryAdmin[] = [
  {
    id: 1,
    create_date: "12/20/2022",
    categoryName: "Thu đông",
    isDeleted: false,
    url: R.images.img_product,
    categoryParentId: 0,
    isActive: true,
  },
  {
    id: 2,
    create_date: "12/20/2022",
    categoryName: "Đồng hồ",
    isDeleted: false,
    url: R.images.img_product,
    categoryParentId: 0,
    isActive: true,
  },
  {
    id: 3,
    create_date: "12/20/2022",
    categoryName: "Hạ chí",
    isDeleted: false,
    url: R.images.img_product,
    categoryParentId: 0,
    isActive: true,
  },
  {
    id: 4,
    create_date: "12/20/2022",
    categoryName: "Thu đông",
    isDeleted: false,
    url: R.images.img_product,
    categoryParentId: 0,
    isActive: true,
  },
  {
    id: 5,
    create_date: "12/20/2022",
    categoryName: "Thu đông",
    isDeleted: true,
    url: R.images.img_product,
    categoryParentId: 0,
    isActive: true,
  },
  {
    id: 6,
    create_date: "12/20/2022",
    categoryName: "Thu đông",
    isDeleted: false,
    url: R.images.img_product,
    categoryParentId: 0,
    isActive: true,
  },
];

export const headCellsVoucher: HeadCell<VoucherAdmin>[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "STT",
  },
  { id: "eventName", numeric: true, disablePadding: false, label: "Tiêu đề" },
  {
    id: "description",
    numeric: true,
    disablePadding: false,
    label: "Mô tả",
  },
  {
    id: "startTime",
    numeric: true,
    disablePadding: false,
    label: "Thời gian bắt đầu",
  },
  {
    id: "endTime",
    numeric: true,
    disablePadding: false,
    label: "Thời gian kết thúc",
  },
  {
    id: "createDate",
    numeric: true,
    disablePadding: false,
    label: "Thời gian tạo",
  },
  {
    id: "salePrice",
    numeric: true,
    disablePadding: false,
    label: "Giảm (% hoặc VND)",
  },
  { id: "isActive", numeric: true, disablePadding: false, label: "Trạng thái" },
];

export const LIST_VOUCHER: VoucherAdmin[] = [
];

export const headCellsMaterial: HeadCell<Material>[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "STT",
  },
  {
    id: "materialName",
    numeric: true,
    disablePadding: false,
    label: "Tên chất liệu",
  },
  { id: "isActive", numeric: true, disablePadding: false, label: "Trạng thái" },
];

export const LIST_MATERIAL: Material[] = [];

export const LIST_BRANCH: Branch[] = [
  {
    id: 1,
    status: 1,
    branch_name: "Gucci",
  },
  {
    id: 2,
    status: 1,
    branch_name: "Owen",
  },
  {
    id: 3,
    status: 1,
    branch_name: "MieMode",
  },
];

export const headCellsBranch: HeadCell<Branch>[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "STT",
  },
  {
    id: "branch_name",
    numeric: true,
    disablePadding: false,
    label: "Branch name",
  },
  { id: "status", numeric: true, disablePadding: false, label: "Trạng thái" },
];

export const headCellsOrderAdmin: HeadCell<OrderDto>[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "STT",
  },
  {
    id: "fullName",
    numeric: true,
    disablePadding: false,
    label: "Tên người nhận",
  },
  {
    id: "phoneNumber",
    numeric: true,
    disablePadding: false,
    label: "Số điện thoại",
  },
  {
    id: "totalPrice",
    numeric: true,
    disablePadding: false,
    label: "Tổng tiền hàng",
  },
  { id: "status", numeric: true, disablePadding: false, label: "Trạng thái" },
];

export const LIST_TAG: Tag[] = [
  // {
  //   id: 1,
  //   isDelete: false,
  //   tagName: "Tag 1",
  // },
  // {
  //   id: 2,
  //   isDelete: false,
  //   tagName: "Tag 2",
  // },
];

export const headCellsTag: HeadCell<Tag>[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "STT",
  },
  {
    id: "tagName",
    numeric: true,
    disablePadding: false,
    label: "Tên thẻ",
  },
  { id: "isActive", numeric: true, disablePadding: false, label: "Trạng thái" },
];

export const OPTIONS_DATA: DataStateOption = {
  colors: [
    { id: 1, colorName: "Xanh", isActive: false, isDelete: false },
    { id: 2, colorName: "Đỏ", isActive: false, isDelete: false },
    { id: 3, colorName: "Vàng", isActive: false, isDelete: false },
  ],
  sizes: [
    { id: false, sizeName: "S", isActive: false, isDelete: false },
    { id: 2, sizeName: "M", isActive: false, isDelete: false },
    { id: 3, sizeName: "L", isActive: false, isDelete: false },
    { id: 4, sizeName: "XL", isActive: false, isDelete: false },
    { id: 5, sizeName: "XXL", isActive: false, isDelete: false },
  ],
};

export const headCellsOption: HeadCell<Option>[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "STT",
  },
  {
    id: "option_name",
    numeric: true,
    disablePadding: false,
    label: "Option name",
  },
];

export const headCellsOptionColor: HeadCell<OptionColor>[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "STT",
  },
  {
    id: "colorName",
    numeric: true,
    disablePadding: false,
    label: "Tên màu",
  },
  { id: "isActive", numeric: true, disablePadding: false, label: "Trạng thái" },
];

export const headCellsOptionSize: HeadCell<OptionSize>[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "STT",
  },
  {
    id: "sizeName",
    numeric: true,
    disablePadding: false,
    label: "Tên kích thước",
  },
  { id: "isActive", numeric: true, disablePadding: false, label: "Trạng thái" },
];
// Product
export const headCellsProduct: HeadCell<ProductAdmin>[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "STT",
  },
  {
    id: "productName",
    numeric: true,
    disablePadding: false,
    label: "Tên sản phẩm",
  },
  {
    id: "createDate",
    numeric: true,
    disablePadding: false,
    label: "Ngày tạo",
  },
  { id: "isActive", numeric: true, disablePadding: false, label: "Trạng thái" },
  {
    id: "isComplete",
    numeric: true,
    disablePadding: false,
    label: "Trạng thái hoàn thành",
  },
];

export const LIST_PRODUCT: ProductAdmin[] = [
  // {
  //   productName: "Áo",
  //   category_id: 1,
  //   description: "cu",
  //   image: R.images.img_product,
  //   id: 1,
  //   createDate: "15/10/2021",
  //   isActive: 0,
  //   tag_id: 1,
  //   voteAverage: 0,
  // },
  // {
  //   productName: "Áo sơ mi",
  //   category_id: 1,
  //   description: "cu",
  //   image: R.images.img_product,
  //   id: 2,
  //   createDate: "15/10/2021",
  //   isActive: 0,
  //   tag_id: 1,
  //   voteAverage: 0,
  // },
  // {
  //   productName: "Áo gió",
  //   category_id: 1,
  //   description: "cu",
  //   image: R.images.img_product,
  //   id: 3,
  //   createDate: "15/10/2021",
  //   isActive: 0,
  //   tag_id: 1,
  //   voteAverage: 0,
  // },
];

export const headCellsProductDetail: HeadCell<DetailProductAdmin>[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "STT",
  },
];

export const LIST_PRODUCT_DETAIL: DetailProductAdmin[] = [
  {
    id: 1,
    color: {
      id: 1,
      isActive: true,
      isDelete: false,
      colorName: "Xanh",
    },
    createDate: "",
    isActive: true,
    isDelete: false,
    product: LIST_PRODUCT[0],
    priceExport: 15000,
    priceImport: 10000,
    productImage: "",
    quantity: 10,
    size: {
      id: 1,
      isActive: true,
      isDelete: false,
      sizeName: "S",
    },
  },
  {
    id: 2,
    color: {
      id: 2,
      isActive: true,
      isDelete: false,
      colorName: "Vang",
    },
    createDate: "",
    isActive: true,
    isDelete: false,
    product: LIST_PRODUCT[0],
    priceExport: 1111111111,
    priceImport: 10000,
    productImage: "",
    quantity: 10,
    size: {
      id: 2,
      isActive: true,
      isDelete: false,
      sizeName: "M",
    },
  },
  {
    id: 3,
    color: {
      id: 1,
      isActive: true,
      isDelete: false,
      colorName: "Xanh",
    },
    createDate: "",
    isActive: true,
    isDelete: false,
    product: LIST_PRODUCT[0],
    priceExport: 222222222,
    priceImport: 10000,
    productImage: "",
    quantity: 10,
    size: {
      id: 2,
      isActive: true,
      isDelete: false,
      sizeName: "M",
    },
  },
  {
    id: 4,
    color: {
      id: 2,
      isActive: true,
      isDelete: false,
      colorName: "Vang",
    },
    createDate: "",
    isActive: true,
    isDelete: false,
    product: LIST_PRODUCT[0],
    priceExport: 3333333,
    priceImport: 10000,
    productImage: "",
    quantity: 10,
    size: {
      id: 1,
      isActive: true,
      isDelete: false,
      sizeName: "S",
    },
  },
];

export const LIST_OPTION = [
  { id: 1, name: "Color" },
  { id: 2, name: "Size" },
];
