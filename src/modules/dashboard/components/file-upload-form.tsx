import useFileUpload from "@dashboard/hooks/use-handle-file-upload";

import { Button } from "@ui/button";
import { Form, FormLabel } from "@ui/form";
import { Input } from "@ui/input";
import { Muted } from "@ui/muted";
import { Separator } from "@ui/separator";

import { Image } from "@custom/image";

import { Skeleton } from "@/common/components/ui/skeleton";

import useUploadFileService from "@/common/hooks/use-upload-file-service";

import { cn } from "@/common/lib/utils";

import type { UploadSuccessEvent } from "@portive/client";
import { ImagesIcon } from "lucide-react";
import { Fragment, useMemo, type HTMLAttributes } from "react";
import type { InternalFieldName, UseFormReturn } from "react-hook-form";

type FileUploadFormProps = HTMLAttributes<HTMLFormElement> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  outerForm?: UseFormReturn<any>;
  formFieldKey?: InternalFieldName;
};

export default function FileUploadForm({
  className,
  outerForm,
  formFieldKey,
  ...props
}: FileUploadFormProps) {
  const { mutateAsync: upload, isPending } = useUploadFileService();
  const { dropzone, form } = useFileUpload({
    async onDropAccepted(files, _event) {
      try {
        const res = (await upload({
          file: files[0],
        })) as unknown as UploadSuccessEvent;
        form.setValue("file", res);
        formFieldKey
          ? outerForm?.setValue(formFieldKey, res.hostedFile.url)
          : undefined;
      } catch (err) { }
    },
  });

  const file = useMemo(() => {
    return form.getValues("file") as UploadSuccessEvent;
  }, [form.getValues("file")]);

  const isInputError = outerForm?.getFieldState(formFieldKey ?? "")?.error
    ?.message;

  return (
    <Form {...form}>
      <form
        className={cn("relative min-h-[20rem] w-full space-y-2", className)}
        {...props}
      >
        <FormLabel
          className={cn(
            "font-serif font-bold",
            isInputError ? "text-destructive" : "",
          )}
        >
          Thumbnail
        </FormLabel>

        <div
          className={cn(
            "group relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl border-2 border-border border-opacity-50 bg-background hover:border-opacity-100 focus-visible:border-opacity-100 focus-visible:outline-0",
            dropzone.isDragAccept
              ? "border-successive hover:border-successive"
              : "",
            dropzone.isDragReject || isInputError
              ? "hover:border-destructive"
              : "",
            file?.hostedFile?.url ? "border-solid outline-0" : "",
          )}
          {...dropzone.getRootProps()}
        >
          <Fragment>
            <Input
              type="file"
              name="files"
              {...dropzone.getInputProps()}
            />

            {isPending && <Skeleton className="absolute h-full w-full" />}

            {!isPending && outerForm?.getValues(formFieldKey ?? "") ? (
              <Fragment>
                <Image
                  src={(outerForm?.getValues(formFieldKey ?? "") as string) ?? file?.hostedFile?.url}
                  alt="Thumbnail"
                  className="peer h-full w-full rounded-xl object-cover group-hover:opacity-50"
                />

                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    dropzone.open();
                  }}
                  type="button"
                  className="invisible absolute px-6 font-sans font-bold transition-all hover:visible peer-hover:visible"
                >
                  Replace File
                </Button>
              </Fragment>
            ) : (
              !isPending && (
                <div
                  className={
                    "flex h-full w-full flex-col items-center justify-center gap-4 p-6 text-center"
                  }
                >
                  <ImagesIcon
                    size={64}
                    className={cn(
                      "text-muted-foreground",
                      dropzone.isDragAccept ? "text-successive" : "",
                      dropzone.isDragReject || isInputError
                        ? "animate-wiggle text-destructive"
                        : "",
                      dropzone.isDragActive ? "animate-bounce" : "",
                    )}
                  />

                  <Muted
                    className={cn(
                      "max-w-56 font-medium transition-all",
                      dropzone.isDragAccept ? "text-successive" : "",
                      dropzone.isDragReject || isInputError
                        ? "text-destructive"
                        : "",
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
                    className="px-6 font-sans font-bold"
                  >
                    Browse File
                  </Button>
                </div>
              )
            )}
          </Fragment>
        </div>
      </form>
    </Form>
  );
}
