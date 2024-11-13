import request from "@/utils/request";

export function getCategoryAPI(id) {
  return request({
    url: "/Category",
    params: {
      id,
    },
  });
}
