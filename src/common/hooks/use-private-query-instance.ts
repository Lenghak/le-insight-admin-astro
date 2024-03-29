import useRefreshTokenService from "@/modules/auth/hooks/use-refresh-token-service";
import useSessionService from "@/modules/auth/hooks/use-session-service";

import {
  createQueryInstance,
  getPublicQueryInstance,
} from "@/common/stores/api-store";
import { signOut } from "auth-astro/client";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useEffect } from "react";
import { toast } from "sonner";

export default function usePrivateQueryInstance() {
  const { data: res } = useSessionService();
  const { mutateAsync: refreshToken } = useRefreshTokenService();

  const tokens = res?.data?.session?.tokens;
  const instance = getPublicQueryInstance();

  useEffect(() => {
    if (res?.data?.session?.tokens) {
      const reqInterceptor = instance.interceptors.request.use((conf) => {
        if (tokens?.at) conf.headers.Authorization = `Bearer ${tokens?.at}`;
        return conf;
      });

      const resInterceptor = instance.interceptors.response.use(
        (conf) => conf,
        async (err: AxiosError) => {
          const prevConf = err.config as InternalAxiosRequestConfig & {
            sent: boolean;
          };

          if (err.response?.status === 401 && !prevConf?.sent) {
            prevConf.sent = true;

            const { data: res, status: refreshStatus } = await refreshToken(
              createQueryInstance({
                headers: { Authorization: `Bearer ${tokens?.rt}` },
              }),
            );

            if (refreshStatus >= 400 && refreshStatus < 500) {
              toast.info("Your session has expired.");

              signOut()
                .then((res) => res)
                .catch((_) => {});
            }

            // @ts-expect-error session.data is probably null
            res.data.tokens = res.data.attributes;
          }
        },
      );

      return () => {
        instance.interceptors.request.eject(reqInterceptor);
        instance.interceptors.response.eject(resInterceptor);
      };
    }
  }, [res, tokens]);

  return instance;
}
