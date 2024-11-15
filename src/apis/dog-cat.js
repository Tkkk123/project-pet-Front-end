import request from "@/utils/request";

const fetchData = async (url) => {
  const { data } = await request.get(url);
  return data;
};

export const DogData = async () => {
  return fetchData("/dog");
};

export const CatData = async () => {
  return fetchData("/cat");
};
