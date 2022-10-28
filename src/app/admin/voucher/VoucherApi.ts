import { ApiClient } from "../../service/ApiService";

  export interface CreateDto {
    description?: string,
    endTime?: string,
    eventName?: string,
    image?: string,
    startTime?: string,
    type?: boolean
  }
  export interface UpdateDto{
    eventName?: string,
    id?: number,
    image?: string,
    isActive?: boolean
  }
  
  // function
  export const requestGetEventAll = (payload?: {name?: string}) =>
  ApiClient.get("/admin/event/findAll", {params: payload});

export const requestPutUpdateEvent = (payload: UpdateDto) =>
  ApiClient.put("/admin/event/update", payload);

export const requestDeleteEvent = (payload: { listEventId: number[] }) =>
  ApiClient.put("/admin/event/deleteByListId", payload);

export const requestPostCreateEvent = (payload: CreateDto) =>
  ApiClient.post("/admin/event/create", payload);


  export interface CreateDiscountDto {
    description?: string,
    discountName?: string,
    endTime?: string,
    eventId?: number,
    orderMaxRange?: number,
    orderMinRange?: number,
    salePrice?: number,
    startTime?: string
  }
  export interface UpdateDiscountDto{
    discountName?: string,
    id?: number,
    isActive?: boolean,
    orderMaxRange?: number,
    orderMinRange?: number,
    salePrice?: number
  }
  
  // function
  export const requestGetDiscountByEventId = (payload?: {event_id: any}) =>
  ApiClient.get("/admin/discountOrder/findByEventId", {params: payload});

export const requestPutUpdateDiscount = (payload: UpdateDiscountDto) =>
  ApiClient.put("/admin/discountOrder/update", payload);

export const requestDeleteDiscount = (payload: { listDiscountId: number[] }) =>
  ApiClient.put("/admin/discountOrder/deleteByListId", payload);

export const requestPostCreateDiscount = (payload: CreateDto) =>
  ApiClient.post("/admin/discountOrder/create", payload);