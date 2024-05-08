import { useDropzone, type DropzoneOptions } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FileUploadOptions =
  DropzoneOptions | undefined

export default function useFileUploadHandler({ ...options }: FileUploadOptions) {
  const dropzone = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    onDropRejected: () => {
      toast.error("File is not supported");
    },
    ...options
  });

  const form = useForm({
    defaultValues: {},
  });

  return { dropzone, form };
}
