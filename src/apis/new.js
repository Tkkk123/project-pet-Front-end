import request from "@/utils/request";
export const NewApi = () => {
  return request({
    url: "/new",
  });
};
