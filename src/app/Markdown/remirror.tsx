import React, { useCallback } from "react";
import { useHelpers } from "@remirror/react";
import { WysiwygEditor } from "@remirror/react-editors/wysiwyg";




function SaveButton() {
  const { getJSON } = useHelpers();
  const handleClick = useCallback(
    () => alert(JSON.stringify(getJSON())),
    [getJSON]
  );

  return (
    <button
      onMouseDown={(event) => event.preventDefault()}
      onClick={handleClick}
    >
      Save
    </button>
  );
}

const Basic: React.FC = () => (
  <WysiwygEditor placeholder="Start typing...">
    <SaveButton />
  </WysiwygEditor>
);

export default Basic;
