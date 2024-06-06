import { zodResolver } from "@hookform/resolvers/zod";
import { type DropzoneOptions, useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { PortiveResponseSchema } from "@/common/types/portive-type";

type FileUploadOptions = DropzoneOptions | undefined;

const FileSchema = z.object({
  file: PortiveResponseSchema,
});

export default function useFileUploadHandler({
  ...options
}: FileUploadOptions) {
  const dropzone = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    onDropRejected: () => {
      toast.error("File is not supported");
    },
    ...options,
  });

  const form = useForm<z.infer<typeof FileSchema>>({
    resolver: zodResolver(FileSchema),
    shouldUnregister: false,
    reValidateMode: "onChange",
  });

  return { dropzone, form };
}
