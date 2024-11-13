import request from "@/utils/request";

export const getUserOrder = (params) => {
  return request({
    url: "/member/order",
    method: "GET",
    params,
  });
};
