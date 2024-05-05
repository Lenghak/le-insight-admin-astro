import PlateEditor from "@/modules/editor/presenters/plate-editor";

export default function EditorRoute() {
  return (
    <section className="relative flex h-full flex-col overflow-hidden gap-6">
      <PlateEditor />
    </section>
  );
}
