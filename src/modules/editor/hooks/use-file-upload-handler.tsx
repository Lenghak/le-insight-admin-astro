import { setMediaDialogState } from "@editor/stores/upload-dialog-store";
import { type PlateCloudEditor, uploadFile } from "@udecode/plate-cloud";
import type { PlateEditor } from "@udecode/plate-common";
import { type DropEvent, useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type useFileUPloadHandlerProps = {
  editor: PlateEditor;
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
      uploadFile(editor as PlateCloudEditor, file[0]);
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
