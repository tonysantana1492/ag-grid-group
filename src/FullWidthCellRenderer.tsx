import { CustomCellRendererProps } from "ag-grid-react";
import { useState } from "react";

export const FullWidthCellRenderer = (props: CustomCellRendererProps) => {
  const [cssClass] = useState(
    props.node.rowPinned
      ? "example-full-width-pinned-row"
      : "example-full-width-row"
  );
  const [message] = useState(
    props.node.rowPinned
      ? `Pinned full width row at index ${props.node.rowIndex}`
      : `Normal full width row at index ${props.node.rowIndex}`
  );

  return (
    <div className={cssClass}>
      {message}
    </div>
  );
};
