import usePrivateQueryInstance from "@/common/hooks/use-private-query-instance";

import { writeKeys } from "@editor/constants/query-keys";
import getCloudAuthToken from "@editor/services/cloud-auth-api";

import { useQuery } from "@tanstack/react-query";

export default function useAuthCloudService() {
  const queryInstance = usePrivateQueryInstance();

  return useQuery({
    queryKey: [...writeKeys.operation("auth-cloud"), queryInstance],
    queryFn: async () => await getCloudAuthToken(queryInstance),
    retryOnMount: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });
}
