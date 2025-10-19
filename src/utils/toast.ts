import { toast, type ToastOptions } from "react-toastify";

const toastConfig: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  theme: "colored",
};

export const showSuccess = (message: string) => {
  console.log("✅ Toast success:", message); // <-- Debug log
  toast.success(message, toastConfig);
};

export const showError = (message: string) => {
  console.log("❌ Toast error:", message); // <-- Debug log
  toast.error(message, toastConfig);
};
