import type { PlateCloudEditor } from "@udecode/plate-cloud";
import { useEditorRef, type Value } from "@udecode/plate-common";
import type React from "react";

const buttonStyle: React.CSSProperties = {
  marginRight: 4,
  background: "hsl(var(--primary))",
  border: "none",
  padding: 8,
  cursor: "pointer",
};

export function CloudToolbarButtons() {
  const editor = useEditorRef<Value, PlateCloudEditor>();
  const getSaveValue = () => {
    console.info("editor.children", editor.children);
    console.info("editor.cloud.getSaveValue()", editor.cloud.getSaveValue());
  };

  const finishUploads = async () => {
    await editor.cloud.finishUploads();
  };

  return (
    <>
      <button
        type="button"
        style={buttonStyle}
        onClick={getSaveValue}
      >
        Get Save Value
      </button>
      <button
        type="button"
        style={buttonStyle}
        onClick={finishUploads}
      >
        Await Finish Uploads
      </button>
      <span>
        Note: After clicking a button, output will be shown in console.
      </span>
    </>
  );
}
