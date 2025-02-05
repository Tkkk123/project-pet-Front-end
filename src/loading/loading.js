import { ElLoading } from "element-plus";
let loadingInstance;
//全局加载函数
export function showLoading() {
  loadingInstance = ElLoading.service({
    lock: true,
    text: "加载中.....",
    background: "rgba(0, 0, 0, 0.7)",
  });
}
//在0.5秒后关闭全局加载
export function hideLoading() {
  if (loadingInstance) {
    setInterval(() => {
      loadingInstance.close();
    }, 500);
  }
}
