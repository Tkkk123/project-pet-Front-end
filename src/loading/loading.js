import { ElLoading } from "element-plus";
let loadingInstance;

export function showLoading() {
  loadingInstance = ElLoading.service({
    lock: true,
    text: "加载中.....",
    background: "rgba(0, 0, 0, 0.7)",
  });
}
export function hideLoading() {
  if (loadingInstance) {
    setInterval(() => {
      loadingInstance.close();
    }, 500);
  }
}
