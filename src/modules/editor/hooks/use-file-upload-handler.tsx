import { setMediaDialogState } from "@editor/stores/upload-dialog-store";
import { uploadFile, type PlateCloudEditor } from "@udecode/plate-cloud";
import { useDropzone, type DropEvent } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type useFileUPloadHandlerProps = {
  editor: PlateCloudEditor;
  dialogID: string;
};

export default function useFileUploadHandler({
  editor,
  dialogID,
}: useFileUPloadHandlerProps) {
  const dropzone = useDropzone({
    accept: {
      "image/*": [],
    },
    onDropRejected: () => {
      toast.error("File is not supported");
    },
    onDropAccepted: (file: File[], _e: DropEvent) => {
      uploadFile(editor, file[0]);
      setMediaDialogState({
        id: dialogID,
        isOpen: false,
      });
    },
  });

  const form = useForm({
    defaultValues: {},
  });

  return { dropzone, form };
}
