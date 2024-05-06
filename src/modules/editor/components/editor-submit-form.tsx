import { serializeHtml } from "@editor/lib/serialize-html";

import { Button } from "@ui/button";
import { Form } from "@ui/form";

import { cn } from "@/common/lib/utils";

import { SERIALIZE_PLUGINS } from "@/modules/editor/constants/editor-plugins";
import { createPlateUI } from "@/modules/editor/lib/create-plate-ui";
import type { PlateCloudEditor } from "@udecode/plate-cloud";
import {
  createPlateEditor,
  useEditorMounted,
  useEditorRef
} from "@udecode/plate-common";
import { useForm } from "react-hook-form";

type EditorSubmitFormProps = {
  className?: string;
};

export default function EditorSubmitForm({ className }: EditorSubmitFormProps) {
  const form = useForm({ defaultValues: {} });
  const editorPrimitive = useEditorRef();
  const isEditorMounted = useEditorMounted();
  const editor = createPlateEditor({
    editor: {
      ...editorPrimitive,
    },
    disableCorePlugins: true,
    plugins: SERIALIZE_PLUGINS,
    components: createPlateUI(),
  }) as PlateCloudEditor;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async () => {
          await (editor.cloud.finishUploads())
          console.log(isEditorMounted && serializeHtml(editor))
        }
        )}
        className={cn(className)}
      >
        <Button
          className="rounded-xl px-6 font-bold"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
