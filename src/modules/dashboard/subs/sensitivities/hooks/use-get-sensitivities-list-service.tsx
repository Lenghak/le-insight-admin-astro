import usePrivateQueryInstance from "@/common/hooks/use-private-query-instance";

import { sensitivitiesKeys } from "@sensitivities/constants/query-keys";
import getSensitivitiesListAPI from "@sensitivities/services/get-sensitivities-list-api";
import type { SensitivitiesListRequestType } from "@sensitivities/types/sensitivities-list-type";

import { $queryClient } from "@/common/stores/api-store";
import { useStore } from "@nanostores/react";
import { useQuery } from "@tanstack/react-query";

export default function useGetSensitivitiesListService({
  ...params
}: SensitivitiesListRequestType) {
  const instance = usePrivateQueryInstance();
  const queryClient = useStore($queryClient);

  return useQuery(
    {
      queryKey: [
        ...sensitivitiesKeys.list(
          ...Object.entries(params).flatMap((item) => item.toString()),
        ),
        instance,
        params,
      ],
      queryFn: async () =>
        (await getSensitivitiesListAPI(params, instance)) ?? null,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
    queryClient,
  );
}
