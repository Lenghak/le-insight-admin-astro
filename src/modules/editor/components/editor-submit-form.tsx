import { EDITOR_COMPONENT } from "@editor/constants/editor-components";
import { SERIALIZE_PLUGINS } from "@editor/constants/editor-plugins";

import { Button } from "@ui/button";
import { Form } from "@ui/form";

import { serializeHtml } from "@editor/lib/serialize-html";
import {
  createPlateEditor,
  useEditorMounted,
  useEditorState,
} from "@udecode/plate-common";
import { useForm } from "react-hook-form";

export default function EditorSubmitForm() {
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
      >
        <Button className="px-6">Submit</Button>
      </form>
    </Form>
  );
}
