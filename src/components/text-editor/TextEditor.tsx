/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import JoditEditor, { Jodit } from "jodit-react";
import React, { useMemo, useRef } from "react";
import "./TextEditor.css";

interface TextEditorProps {
  setDescription: (description: string) => void;
  description: string;
  placeholder?: string;
}

const TextEditor: React.FC<TextEditorProps> = ({
  setDescription,
  description,
  placeholder,
}) => {
  const editor = useRef<Jodit | null>(null);
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typing...",
    }),
    [placeholder]
  );

  return (
    <>
      <JoditEditor
        ref={editor}
        value={description}
        config={config}
        // tabIndex={1}
        onBlur={(newContent: string) => setDescription(newContent)}
      />
    </>
  );
};

export default TextEditor;
