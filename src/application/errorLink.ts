import { onError } from "@apollo/client/link/error";
import { Observable } from "@apollo/client";
import { refreshToken } from "./refreshToken";
import { useTokens } from "@/modules/Tokens";
let isRefreshing = false;
let pendingRequests: Array<() => void> = [];

const resolvePendingRequests = () => {
  pendingRequests.forEach((callback) => callback());
  pendingRequests = [];
};

const logout = () => {
  useTokens.getState().setAccessToken(null);
  useTokens.getState().setRefreshToken(null);
  window.location.replace("/auth/signin");
};
export const errorLink = onError(({ error, operation, forward }) => {
  if (error?.message !== "Unauthorized") {
    return;
  }
  if (operation.operationName === "UpdateToken") {
    logout();
    return;
  }
  return new Observable((observer) => {
    const retryRequest = () => {
      const accessToken = useTokens.getState().accessToken;
      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      }));
      const subscriber = forward(operation).subscribe({
        next: observer.next.bind(observer),
        error: observer.error.bind(observer),
        complete: observer.complete.bind(observer),
      });

      return () => {
        subscriber.unsubscribe();
      };
    };
    if (!isRefreshing) {
      isRefreshing = true;
      refreshToken()
        .then(() => {
          isRefreshing = false;
          resolvePendingRequests();
          retryRequest();
        })
        .catch(() => {
          isRefreshing = false;
          logout();
          observer.error(new Error("Unauthorized"));
        });
    } else {
      pendingRequests.push(() => {
        retryRequest();
      });
    }
  });
});
