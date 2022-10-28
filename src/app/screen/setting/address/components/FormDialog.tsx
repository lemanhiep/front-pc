/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Switch,
  Typography,
} from "@material-ui/core";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import LoadingProgress from "../../../../component/LoadingProccess";
import TextInputComponent from "../../../../component/TextInputComponent";
import {
  NAME_REGEX,
  PHONE_REGEX,
  textValidate,
  TYPE_DIALOG,
} from "../../../../contant/Contant";
import { ResultApi } from "../../../../contant/IntefaceContaint";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { getIdAccount } from "../../../../service/StorageService";
import { createNotification } from "../../../../utils/MessageUtil";
import {
  CreateDto,
  requestGetDistrictByProvinceId,
  requestGetWardByDistrictId,
  requestPostCreateAddress,
  requestPutUpdateAddress,
  UpdateDto,
} from "../AddressApi";
import {
  changeLoading,
  createAddress,
  DataAddress,
  updateAddress,
} from "../slice/AddressSlice";
interface Props {
  open: any;
  handleClose: any;
  anchorElData?: { item: DataAddress } | null;
  type: number;
  data: DataAddress[];
}
interface Address {
  id: any;
  name: string;
}

const validateVoucher = Yup.object({
  phone: Yup.string()
    .min(10, textValidate.phone.error_validate)
    .max(11, textValidate.phone.error_validate)
    .matches(PHONE_REGEX, textValidate.phone.error_validate)
    .required()
    .trim(),
  name: Yup.string()
    .required(textValidate.full_name.require)
    .matches(NAME_REGEX, textValidate.full_name.error_validate)
    .trim(),
  address_detail: Yup.string()
    .min(2, "Min 2")
    .required(textValidate.full_name.require)
    .trim(),
});

interface PropsCreateAddress {
  phone: string;
  name: string;
  address_detail: string;
}
const initialValues: PropsCreateAddress = {
  name: "cu",
  phone: "0965259441",
  address_detail: "9645 / 255",
};

const initAddress = {
  ward: null,
  district: null,
  province: null,
};

const initDataAddress = {
  ward: [],
  district: [],
};

const FormDialog = (props: Props) => {
  const dispatch = useAppDispatch();
  const provinces = useAppSelector((state) => state.provinceSlice).data;
  const { isLoading } = useAppSelector((state) => state.addressUser);
  const accountId = getIdAccount();
  const { handleClose, open, anchorElData, type } = props;
  const [isDefault, setIsDefault] = useState<boolean>(
    anchorElData?.item.isDefault ?? false
  );

  const [selectedAddress, setSelectedAddress] = useState<{
    ward: string | null;
    district: string | null;
    province: string | null;
  }>({
    ward: null,
    district: null,
    province: null,
  });

  const [dataAddress, setDataAddress] = useState<{
    ward: Address[];
    district: Address[];
  }>(initDataAddress);

  useEffect(() => {
    getDataAddressChange();
  }, [anchorElData]);

  useEffect(() => {
    selectedAddress.province !== null && getDataDistrict();
  }, [selectedAddress.province]);

  useEffect(() => {
    selectedAddress.district !== null && getDataWard();
  }, [selectedAddress.district]);

  const getDataAddressChange = async () => {
    if (anchorElData && type === TYPE_DIALOG.UPDATE) {
      const resDistrict: ResultApi<Address[]> =
        await requestGetDistrictByProvinceId({
          province_id: anchorElData.item.province?.id ?? 1,
        });
      const resWard: ResultApi<Address[]> = await requestGetWardByDistrictId({
        district_id: anchorElData.item.district?.id ?? 1,
      });
      setDataAddress({ ward: resWard.data, district: resDistrict.data });
    }
  };

  const getDataDistrict = async (id?: number) => {
    try {
      const res: ResultApi<Address[]> = await requestGetDistrictByProvinceId({
        province_id: id ?? Number(selectedAddress.province),
      });
      setDataAddress({ ...dataAddress, district: res.data });
    } catch (e) {}
  };

  const getDataWard = async (id?: number) => {
    try {
      const res: ResultApi<Address[]> = await requestGetWardByDistrictId({
        district_id: id ?? Number(selectedAddress.district),
      });

      setDataAddress({ ...dataAddress, ward: res.data });
    } catch (e) {}
  };
  // console.log({ dataAddress });

  const close = () => {
    setSelectedAddress(initAddress);
    setDataAddress(initDataAddress);
    setIsDefault(false);
    handleClose();
  };

  const onSubmit = async (data: PropsCreateAddress) => {
    const { address_detail, name, phone } = data;
    try {
      if (anchorElData) {
        if (anchorElData && selectedAddress.province !== null) {
          console.log("ka");

          if (!validateAddress()) return;
        }
        // code
        dispatch(changeLoading(true));
        const payload: UpdateDto = {
          accountId: Number(accountId),
          addressDetail: address_detail,
          districtId: selectedAddress.district
            ? Number(selectedAddress.district)
            : Number(anchorElData?.item.district?.id),
          provinceId: selectedAddress.province
            ? Number(selectedAddress.province)
            : Number(anchorElData?.item.province?.id),
          wardId: selectedAddress.ward
            ? Number(selectedAddress.ward)
            : Number(anchorElData?.item.ward?.id),
          id: anchorElData?.item.id,
          fullName: name,
          isDefault: isDefault,
          phoneNumber: phone,
        };

        const res: ResultApi<DataAddress> = await requestPutUpdateAddress(
          payload
        );
        dispatch(updateAddress({ item: res.data }));
        close();
      }
      // loading
      dispatch(changeLoading(false));
    } catch (e) {
      dispatch(changeLoading(false));
    }
  };
  const validateAddress = () => {
    if (
      !selectedAddress.province ||
      !selectedAddress.district ||
      !selectedAddress.ward
    ) {
      createNotification({
        type: "warning",
        message: "Bạn cần điền đầy đủ thông tin",
      });
      return false;
    }
    return true;
  };

  const onSubmitCreate = async (dataCreate: PropsCreateAddress) => {
    if (!validateAddress()) return;
    try {
      dispatch(changeLoading(true));
      const { address_detail, name, phone } = dataCreate;
      const payload: CreateDto = {
        accountId: Number(accountId),
        addressDetail: address_detail,
        districtId: Number(selectedAddress.district),
        provinceId: Number(selectedAddress.province),
        wardId: Number(selectedAddress.ward),
        fullName: name,
        phoneNumber: phone,
        isDefault: isDefault,
      };
      const res: ResultApi<DataAddress> = await requestPostCreateAddress(
        payload
      );
      dispatch(createAddress({ item: res.data }));
      close();
      dispatch(changeLoading(false));
    } catch (e) {
      dispatch(changeLoading(false));
    }
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="form-dialog-title"
      style={{ width: "100%" }}
    >
      <DialogTitle id="form-dialog-title">
        {TYPE_DIALOG.CREATE === type ? "Tạo mới Address" : `Cập nhật Address`}
      </DialogTitle>
      <Formik
        initialValues={
          type === TYPE_DIALOG.CREATE
            ? initialValues
            : {
                name: anchorElData?.item.fullName ?? initialValues.name,
                phone: anchorElData?.item.phoneNumber ?? initialValues.phone,
                address_detail: anchorElData?.item.addressDetail ?? "",
              }
        }
        onSubmit={(data) => {
          type === TYPE_DIALOG.CREATE
            ? onSubmitCreate({ ...data })
            : onSubmit(data);
        }}
        validateOnChange
        validationSchema={validateVoucher}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          touched,
        }) => (
          <div style={{ position: "relative" }}>
            <DialogContent style={{ width: "100%" }}>
              <DialogContentText>
                Cập nhật thông tin địa chỉ, vui lòng điền tất cả thông tin cần
                thiết
              </DialogContentText>
              <TextInputComponent
                error={errors.name}
                touched={touched.name}
                value={values.name}
                label={"Tên người nhận"}
                onChange={handleChange("name")}
                onBlur={handleBlur("name")}
                isRequire
              />
              <TextInputComponent
                error={errors.phone}
                touched={touched.phone}
                value={values.phone}
                label={"Số điện thoại người nhận"}
                onChange={handleChange("phone")}
                onBlur={handleBlur("phone")}
                isRequire
              />
              <TextInputComponent
                error={errors.address_detail}
                touched={touched.address_detail}
                value={values.address_detail}
                label={"Địa chỉ chi tiết"}
                onChange={handleChange("address_detail")}
                onBlur={handleBlur("address_detail")}
                isRequire
              />

              <TextInputComponent
                label="province"
                isRequire
                value={
                  type === TYPE_DIALOG.UPDATE &&
                  selectedAddress.province === null
                    ? `${anchorElData?.item.province?.id}`
                    : selectedAddress.province
                }
                onChange={(event: any) => {
                  const value = event.target.value;
                  setDataAddress({ ...dataAddress, district: [], ward: [] });
                  setSelectedAddress({
                    province: value,
                    district: "",
                    ward: "",
                  });
                }}
                isSelected={true}
                childrentSeleted={
                  <>
                    <option key={0} value={0}>
                      Chưa chọn
                    </option>
                    {provinces.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </>
                }
              />
              {dataAddress.district.length > 0 && (
                <TextInputComponent
                  label="district"
                  isRequire
                  value={
                    type === TYPE_DIALOG.UPDATE &&
                    selectedAddress.district === null
                      ? `${anchorElData?.item.district?.id}`
                      : selectedAddress.district
                  }
                  onChange={(event: any) => {
                    const value = event.target.value;
                    setDataAddress({ ...dataAddress, ward: [] });
                    setSelectedAddress({
                      ...selectedAddress,
                      district: value,
                      ward: "",
                    });
                  }}
                  isSelected={true}
                  childrentSeleted={
                    <>
                      <option key={0} value={0}>
                        Chưa chọn
                      </option>
                      {dataAddress.district.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </>
                  }
                />
              )}
              {dataAddress.ward.length > 0 && (
                <TextInputComponent
                  label="ward"
                  isRequire
                  value={
                    type === TYPE_DIALOG.UPDATE && selectedAddress.ward === null
                      ? `${anchorElData?.item.ward?.id}`
                      : selectedAddress.ward
                  }
                  onChange={(event: any) => {
                    const value = event.target.value;
                    setSelectedAddress({
                      ...selectedAddress,
                      ward: value,
                    });
                  }}
                  isSelected={true}
                  childrentSeleted={
                    <>
                      <option key={0} value={0}>
                        Chưa chọn
                      </option>
                      {dataAddress.ward.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </>
                  }
                />
              )}
              <div style={{ paddingTop: 10 }}>
                <Typography color="secondary">
                  Đặt địa chỉ làm mặc định
                </Typography>
                <Switch
                  checked={isDefault}
                  onChange={() => {
                    setIsDefault(!isDefault);
                  }}
                  color="secondary"
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={close} color="primary">
                Cancel
              </Button>
              <Button onClick={() => handleSubmit()} color="primary">
                Submit
              </Button>
            </DialogActions>
            {isLoading && <LoadingProgress />}
          </div>
        )}
      </Formik>
    </Dialog>
  );
};
export default FormDialog;
