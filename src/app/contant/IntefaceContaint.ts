export interface HeadCell<T> {
  disablePadding: boolean;
  id: keyof T;
  label: string;
  numeric: boolean;
}

export interface UserAdminInteface {
  id: any;
  email: string;
  phone: string;
  position: string;
  first_name: string;
  last_name: string;
  active: number;
}

export interface UserAdmin {
  fullName: string;
  priority: number;
  id: number;
  isActive: boolean;
  email: string;
  username: string;
  password: string;
  role: number;
  phoneNumber: string;
  isDelete: number;
}

export interface DataState<T> {
  data: T;
  isLoading?: boolean;
  isError?: boolean;
  count?: number;
}

export interface CategoryAdmin {
  id: number;
  categoryName: string;
  create_date: string;
  isDeleted: boolean;
  url: string;
  categoryParentId: number;
  categoryChildren?: CategoryAdmin[] | null;
  isActive: boolean;
}

export interface VoucherAdmin {
  id: number;
  description: string;
  createDate: string
  endTime: string
  eventName: string
  image: string
  isActive: boolean
  isDelete: boolean
  startTime: string
  type: boolean
  salePrice: number
}

export interface AddressOrderInterface {
  ward: {
    id: any;
    name: string;
  };
  province: {
    id: any;
    name: string;
  };
  district: {
    id: any;
    name: string;
  };
  detail: string;
}

export interface Material {
  id: any;
  materialName: string;
  isDelete: boolean;
  isActive: boolean;
}
export interface Tag {
  id: any;
  tagName: string;
  isDelete: boolean;
  isActive: boolean;
}
export interface Branch {
  id: any;
  branch_name: string;
  status: number;
}

export interface OptionColor {
  id: any;
  colorName: string;
  isActive: boolean;
  isDelete: boolean;
}
export interface OptionSize {
  id: any;
  sizeName: string;
  isActive: boolean;
  isDelete: boolean;
}

export interface DataStateOption {
  colors: OptionColor[];
  sizes: OptionSize[];
}

export interface Option extends DataStateOption {
  id: any;
  option_name: string;
  status: number;
  data?: OptionColor[] | OptionSize[];
}

export interface ProductAdmin {
  productName: string;
  createDate: string;
  description: string;
  image: string;
  category_id: any;
  id: any;
  isActive: any;
  tag_id: any;
  voteAverage: number;
  category: CategoryAdmin;
  isComplete: boolean;
  productImage: any;
  minPrice: number;
  maxPrice: number;
}

export interface DetailProductAdmin {
  id: any;
  quantity: number;
  priceExport: number;
  priceImport: number;
  isDelete: any;
  productImage: any;
  product: ProductAdmin;
  color: OptionColor;
  size: OptionSize;
  isActive: boolean | null;
  createDate: string;
  productName?: string;
}

export interface DetailOrderAdmin {
  id: number;
  quantity: number;
  price: number;
  isDelete: boolean;
  order_id: number;
  detail_product_id: number;
}

export interface HistoryOrder {
  id: number;
  update_time: string;
  description: string;
  status: number;
  order_id: number;
}

export interface ResultApi<T> {
  data: T;
  message: string;
  status: number;
}
