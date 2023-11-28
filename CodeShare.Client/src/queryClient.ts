import { QueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const SERVER_ERROR_STATUS_CODES = [500, 501, 502, 503, 504];

function handleAxiosError(error: AxiosError): boolean {
  const status = error.response?.status;

  if (status === 429) {
    toast.error((error.response?.data as string) ?? "Rate limit exceeded.");
  } else if (status && SERVER_ERROR_STATUS_CODES.includes(status)) {
    toast.error("Server error.");
  }

  return false;
}

function customRetry(_: number, error: Error): boolean {
  return error instanceof AxiosError ? handleAxiosError(error) : false;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: customRetry,
      refetchOnWindowFocus: false,
      retryDelay: 2000
    },
    mutations: {
      retry: customRetry,
      retryDelay: 2000
    }
  }
});
