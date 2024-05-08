import useFileUpload from "@dashboard/hooks/use-handle-file-upload";

import { Button } from "@ui/button";
import { Form } from "@ui/form";
import { Input } from "@ui/input";
import { Muted } from "@ui/muted";
import { Separator } from "@ui/separator";

import useUploadFileService from "@/common/hooks/use-upload-file-service";

import { cn } from "@/common/lib/utils";

import { ImagesIcon } from "lucide-react";
import { Fragment, type HTMLAttributes } from "react";

type FileUploadFormProps = HTMLAttributes<HTMLFormElement>;

export default function FileUploadForm({
  className,
  ...props
}: FileUploadFormProps) {
  const { mutateAsync: upload, isIdle } = useUploadFileService();
  const { dropzone, form } = useFileUpload({
    async onDropAccepted(files, _event) {
      await upload({
        file: files[0],
      });
    },
  });

  return (
    <Form {...form}>
      <form
        className={cn("relative min-h-[20rem] w-full space-y-6", className)}
        {...props}
      >
        <div
          className={cn(
            "group relative flex h-full w-full items-center justify-center rounded-md border-2 border-dashed border-border border-opacity-50 p-6 hover:border-opacity-100 focus-visible:border-opacity-100 focus-visible:outline-0",
            dropzone.isDragAccept ? "border-success hover:border-success" : "",
            dropzone.isDragReject
              ? "cursor-not-allowed border-destructive hover:border-destructive"
              : "",
          )}
          {...dropzone.getRootProps()}
        >
          {isIdle && (
            <Fragment>
              <Input
                type="file"
                name="files"
                {...dropzone.getInputProps()}
              />

              <div
                className={
                  "flex h-full w-full flex-col items-center justify-center gap-4 text-center"
                }
              >
                <ImagesIcon
                  size={64}
                  className={cn(
                    "text-muted-foreground",
                    dropzone.isDragAccept ? "text-success" : "",
                    dropzone.isDragReject ? "text-destructive" : "",
                    dropzone.isDragActive ? "animate-bounce" : "",
                  )}
                />

                <Muted
                  className={cn(
                    "max-w-56 font-medium transition-all",
                    dropzone.isDragActive ? "hidden" : "",
                  )}
                >
                  Drop an drop an image file here to upload.
                </Muted>

                <div className="flex w-full items-center justify-center gap-4">
                  <Separator
                    className="w-full max-w-10"
                    orientation="horizontal"
                  />
                  <Muted className="font-bold">Or</Muted>
                  <Separator
                    className="w-full max-w-10"
                    orientation="horizontal"
                  />
                </div>

                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    dropzone.open();
                  }}
                  type="button"
                  className="px-6 font-bold"
                >
                  Browse File
                </Button>
              </div>
            </Fragment>
          )}
        </div>
      </form>
    </Form>
  );
}
