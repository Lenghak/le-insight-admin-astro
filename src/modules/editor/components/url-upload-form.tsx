import { setMediaDialogState } from "@editor/stores/upload-dialog-store";

import { Button } from "@ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form";
import { Input } from "@ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import type { PlateEditor } from "@udecode/plate-common";
import { insertMedia } from "@udecode/plate-media";
import { useForm } from "react-hook-form";
import { z } from "zod";

const URLUploadFormSchema = z.object({
  url: z.string().url("The URL is invalid"),
});

type URLUploadFormProps = {
  editor: PlateEditor;
  dialogID: string;
  hideLabel?: boolean;
};

export default function URLUploadForm({
  editor,
  dialogID,
  hideLabel = false,
}: URLUploadFormProps) {
  const form = useForm<z.infer<typeof URLUploadFormSchema>>({
    resolver: zodResolver(URLUploadFormSchema),
    defaultValues: {
      url: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (values) => {
          await insertMedia(editor, {
            getUrl: async () =>
              new Promise<string>((res, _) => {
                res(values.url);
              }),
          });

          setMediaDialogState({ id: dialogID, isOpen: false });
        })}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              {!hideLabel && (
                <FormLabel
                  className="font-bold"
                  htmlFor="url-field"
                >
                  Import from URL
                </FormLabel>
              )}
              <FormControl>
                <div className="relative flex w-full items-center">
                  <Input
                    id="url-field"
                    placeholder="Paste a valid url"
                    className="h-11 rounded-full pr-28"
                    {...field}
                  />

                  <Button
                    type="submit"
                    size={"sm"}
                    className="absolute right-1 rounded-full px-6 font-bold"
                  >
                    Import
                  </Button>
                </div>
              </FormControl>
              <FormMessage className="ml-4 list-item text-xs font-bold" />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
