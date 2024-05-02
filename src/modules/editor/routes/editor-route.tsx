import PlateEditor from "@/modules/editor/presenters/plate-editor";

export default function EditorRoute() {
  return (
    <section className="relative flex h-full flex-col space-y-6 overflow-hidden">
      <PlateEditor />
    </section>
  );
}
