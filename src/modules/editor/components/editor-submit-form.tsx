import { EDITOR_COMPONENT } from "@editor/constants/editor-components";
import { SERIALIZE_PLUGINS } from "@editor/constants/editor-plugins";

import { Button } from "@ui/button";
import { Form } from "@ui/form";

import { cn } from "@/common/lib/utils";
import { serializeHtml } from "@editor/lib/serialize-html";
import {
  createPlateEditor,
  useEditorMounted,
  useEditorState,
} from "@udecode/plate-common";
import { useForm } from "react-hook-form";

type EditorSubmitFormProps = {
  className?: string
}

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
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() =>
          console.log(isEditorMounted && serializeHtml(editor)),
        )}
        className={cn(className)}
      >
        <Button className="px-6 font-bold" type="submit">Submit</Button>
      </form>
    </Form>
  );
}
