import { EDITOR_COMPONENT } from "@editor/constants/editor-components";
import { SERIALIZE_PLUGINS } from "@editor/constants/editor-plugins";
import { serializeHtml } from "@editor/lib/serialize-html";

import { Button } from "@ui/button";
import { Form } from "@ui/form";

import { cn } from "@/common/lib/utils";

import type { PlateCloudEditor } from "@udecode/plate-cloud";
import {
  createPlateEditor,
  useEditorMounted,
  useEditorState,
} from "@udecode/plate-common";
import { useForm } from "react-hook-form";

type EditorSubmitFormProps = {
  className?: string;
};

export default function EditorSubmitForm({ className }: EditorSubmitFormProps) {
  const form = useForm({ defaultValues: {} });
  const editorPrimitive = useEditorState();
  const isEditorMounted = useEditorMounted();
  const editor = createPlateEditor({
    plugins: SERIALIZE_PLUGINS,
    components: EDITOR_COMPONENT,
    editor: {
      ...editorPrimitive,
    },
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
