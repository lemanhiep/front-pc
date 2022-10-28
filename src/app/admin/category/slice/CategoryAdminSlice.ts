import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CategoryAdmin,
  DataState,
  ResultApi,
} from "../../../contant/IntefaceContaint";
import { createNotification } from "../../../utils/MessageUtil";
import { requestGetCategoryAll } from "../CategoryApi";

const initialState: DataState<CategoryAdmin[]> = {
  data: [],
  isError: false,
  isLoading: false,
};

export const incrementAsyncCategoryAdmin = createAsyncThunk(
  "category/admin",
  async () => {
    const res: ResultApi<CategoryAdmin[]> = await requestGetCategoryAll();
    return res;
  }
);

export const categoryAdminSlice = createSlice({
  name: "category/admin",
  initialState,
  reducers: {
    updateCategory: (state, action) => {
      let oldArray = state.data;
      let item: CategoryAdmin = action.payload?.item;
      state.data = oldArray?.map((e) => {
        if (e.id === item.id)
          return {
            ...item,
            categoryChildren: e.categoryChildren,
          };
        else return e;
      });
    },
    createCategory: (state, action) => {
      let item: CategoryAdmin = action.payload?.item;
      state.data = state.data.concat([item]);
    },
    deleteCategory: (state, action) => {
      let array = state.data;
      let deleteArray: any[] = action.payload?.array;
      deleteArray.forEach((e: any) => {
        array = array.filter((v) => e !== `${v.id}`);
      });
      state.data = array;
      createNotification({
        type: "success",
        message: "Xoá thành công",
      });
    },
    updateCategoryChilden: (state, action) => {
      let oldArray = state.data;
      let item: CategoryAdmin = action.payload.item;
      let idParent: number = action.payload.id;
      let itemChange = oldArray.find((e) => e.id === idParent);
      if (itemChange && idParent !== item.categoryParentId) {
        const newArray = state.data.map((e) => {
          if (e.id === idParent) {
            return {
              ...e,
              categoryChildren: e.categoryChildren?.filter(
                (e) => e.categoryParentId !== idParent
              ),
            };
          } else if (e.id === item.categoryParentId) {
            return {
              ...e,
              categoryChildren: e.categoryChildren?.concat([item]),
            };
          } else return e;
        });
        state.data = newArray;
      } else if (itemChange) {
        let childenArray = itemChange?.categoryChildren?.map((e) => {
          if (e.id === item.id) return item;
          else return e;
        });
        const newArray = oldArray.map((e) => {
          if (e.id === idParent) {
            let item = itemChange ? itemChange : e;
            return {
              ...item,
              categoryChildren: childenArray,
            };
          } else return e;
        });
        state.data = newArray;
      }
      createNotification({
        type: "success",
        message: "Cập nhật thành công",
      });
    },
    createCategoryChilden: (state, action) => {
      let item: CategoryAdmin = action.payload?.item;
      let idParent: number = action.payload.id;
      let itemChange = state.data.find((e) => e.id === idParent);
      if (itemChange) {
        let childenArray = itemChange.categoryChildren?.concat([item]);
        const newArray = state.data.map((e) => {
          if (e.id === idParent) {
            let item = itemChange ? itemChange : e;
            return {
              ...item,
              categoryChildren: childenArray,
            };
          } else return e;
        });
        state.data = newArray;
      }
      createNotification({
        type: "success",
        message: "Thêm mới thành công",
      });
    },
    deleteCategoryChilden: (state, action) => {
      let idParent: number = action.payload.id;
      let itemChange = state.data.find((e) => e.id === idParent);
      let deleteArray: any[] = action.payload?.array;
      if (itemChange) {
        let array = itemChange.categoryChildren;
        deleteArray.forEach((e: any) => {
          array = array?.filter((v) => e !== `${v.id}`);
        });
        console.log({ array });

        const newArray = state.data.map((e) => {
          if (e.id === idParent) {
            let item = itemChange ? itemChange : e;
            return {
              ...item,
              categoryChildren: array,
            };
          } else return e;
        });
        state.data = newArray;
      }

      createNotification({
        type: "success",
        message: "Xoá thành công",
      });
    },
    changeLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    changeError: (state, action) => {
      state.isError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsyncCategoryAdmin.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(incrementAsyncCategoryAdmin.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.data = action.payload?.data;
      })
      .addCase(incrementAsyncCategoryAdmin.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});
export const {
  createCategory,
  updateCategory,
  deleteCategory,
  createCategoryChilden,
  deleteCategoryChilden,
  updateCategoryChilden,
  changeError,
  changeLoading,
} = categoryAdminSlice.actions;
export default categoryAdminSlice.reducer;
