import { $queryClient } from "@/common/stores/api-store";
import { $portiveClientStore } from "@/common/stores/portive-client-store";
import { useStore } from "@nanostores/react";
import {
  type Client,
  type UploadBeforeFetchEvent,
  type UploadBeforeSendEvent,
  type UploadErrorEvent,
  type UploadEvent,
  uploadFile,
  type UploadFinishEvent,
  type UploadProgressEvent,
  type UploadSuccessEvent,
} from "@portive/client";
import { useMutation } from "@tanstack/react-query";

type PotriveFileUploadOption = {
  client?: Client;
  file: File;
  onBeforeFetch?: (e: UploadBeforeFetchEvent) => void;
  onBeforeSend?: (e: UploadBeforeSendEvent) => void;
  onProgress?: (e: UploadProgressEvent) => void;
  onError?: (e: UploadErrorEvent) => void;
  onSuccess?: (e: UploadSuccessEvent) => void;
  onFinish?: (e: UploadFinishEvent) => void;
  onUpdate?: (e: UploadEvent) => void;
};

export default function useUploadFileService() {
  const portiveClient = useStore($portiveClientStore);
  const queryClient = useStore($queryClient);

  return useMutation(
    {
      mutationKey: ["upload-file"],
      mutationFn: async ({ client, ...options }: PotriveFileUploadOption) =>
        await uploadFile({ client: client ?? portiveClient, ...options }),
    },
    queryClient,
  );
}
