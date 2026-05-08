import { onError } from "@apollo/client/link/error";
import { Observable } from "@apollo/client";
import { refreshToken } from "./refreshToken";
import { useTokens } from "@/modules/Tokens";

const logout = () => {
  useTokens.getState().setAccessToken(null);
  useTokens.getState().setRefreshToken(null);
  window.location.replace("/auth/signin");
};

export const errorLink = onError(({ error, operation, forward }) => {
  if (error?.message !== "Unauthorized") {
    return;
  }

  return new Observable((observer) => {
    refreshToken()
      .then((newAccessToken) => {
        operation.setContext(({ headers = {} }) => ({
          headers: {
            ...headers,
            Authorization: `Bearer ${newAccessToken}`,
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
      })
      .catch(() => {
        logout();
        observer.error(new Error("Unauthorized"));
      });
  });
});
