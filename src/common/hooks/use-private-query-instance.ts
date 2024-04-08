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
  const { data: session } = useSessionService();
  const { mutateAsync: refreshToken } = useRefreshTokenService();

  const tokens = session?.data?.session?.tokens;
  const instance = getPublicQueryInstance();

  console.log(session);

  useEffect(() => {
    if (session?.data?.session?.tokens) {
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

            if (session?.data?.session?.tokens) {
              session.data.session.tokens.at = res.data.attributes.accessToken;
              session.data.session.tokens.rt = res.data.attributes.refreshToken;
            }
          }
        },
      );

      return () => {
        instance.interceptors.request.eject(reqInterceptor);
        instance.interceptors.response.eject(resInterceptor);
      };
    }
  }, [session, tokens]);

  return instance;
}
