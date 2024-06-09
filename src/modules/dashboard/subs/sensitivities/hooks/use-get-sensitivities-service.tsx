import usePrivateQueryInstance from "@/common/hooks/use-private-query-instance";

import { sensitivitiesKeys } from "@sensitivities/constants/query-keys";
import getSensitivitiesAPI from "@sensitivities/services/get-sensitivities-api";
import type { SensitivitiesRequestType } from "@sensitivities/types/sensitivities-ind-type";

import { $queryClient } from "@/common/stores/api-store";
import { useStore } from "@nanostores/react";
import { useQuery } from "@tanstack/react-query";

export default function useGetSensitivitiesService({
  sensitivityId,
}: SensitivitiesRequestType) {
  const instance = usePrivateQueryInstance();
  const queryClient = useStore($queryClient);

  return useQuery(
    {
      queryKey: [...sensitivitiesKeys.detail(sensitivityId), instance],
      queryFn: async () =>
        (await getSensitivitiesAPI({ sensitivityId }, instance)) ?? null,
      enabled: sensitivityId !== undefined,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
    queryClient,
  );
}
