import { toast } from "react-toastify";

export const showToastFunction = (
  message: string,
  type: "info" | "error" | "success",
) => {
  toast[type](message, {
    position: "bottom-center",
    autoClose: 2500,
    theme: "dark",
  });
};
