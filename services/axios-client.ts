import { AuthStorage } from "@/lib/local-storage";
import axios, { AxiosResponse } from "axios";

let isRefreshing = false;
let failedQueue: any[] = [];

const baseURL: string = String(process.env.NEXT_PUBLIC_API_ENDPOINT);

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

const axiosClient = axios.create({
  baseURL: baseURL,
});

// Request Interceptor
axiosClient.interceptors.request.use(
  (config: any) => {
    const token = AuthStorage.getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

// Response Interceptor
axiosClient.interceptors.response.use(
  (response: any) => handleResponse(response),
  (error: any) => handleErrorResponse(error)
);

const handleErrorResponse = async (error: any) => {
  const originalRequest = error.config;
  const check =
    originalRequest.url.includes("/user/register") || originalRequest.url.includes("/user/login");
  const isAuthError = [400, 401, 403].includes(error?.response?.status);

  if (isAuthError && !originalRequest._retry && !check) {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          return axiosClient(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const refreshToken = AuthStorage.getRefreshToken();
    try {
      const { data } = await axios.post(`${baseURL}/auth/refresh-token`, {
        refreshToken: refreshToken,
      });
      const _accessToken = data?.data?.accessToken;
      const _refreshToken = data?.data?.refreshToken;

      AuthStorage.setAccessToken(_accessToken);
      AuthStorage.setRefreshToken(_refreshToken);

      axios.defaults.headers.common["Authorization"] = `Bearer ${_accessToken}`;
      originalRequest.headers["Authorization"] = `Bearer ${_accessToken}`;
      processQueue(null, _accessToken);

      return axiosClient(originalRequest);
    } catch (err) {
      processQueue(err, null);
      // AuthStorage.clearToken(); // Clear local storage if refresh token request fails
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }

  return handleError(error);
};

const handleResponse = (response: AxiosResponse<any>) => response;

const handleError = (error: any) => {
  const { data } = error.response;
  console.error({ error });
  return Promise.reject(data);
};

export default axiosClient;
