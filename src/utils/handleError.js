import { toast } from "react-toastify";

export  const handleError = (error) => {
    console.error(error);
    const errorMessage =
      error?.response?.data?.error || "An unexpected error occurred.";
    toast.error(errorMessage);
    return errorMessage;
  };