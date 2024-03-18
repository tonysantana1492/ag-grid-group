import { CustomCellRendererProps } from "ag-grid-react";

export const CellRenderer = ({
  data,
  value,
  updateData,
}: CustomCellRendererProps) => {
  const getIcon = () => {
    if (data.childrens.length === 0) return "";

    if (data.expanded) return "fas fa-minus";

    return "fas fa-plus";
  };

  const paddingLeft = `${data.level}px`;

  const icon = getIcon();
  const handleClick = () => {
    updateData(data.customId);
  };

  return (
    <span style={{ paddingLeft }} onClick={handleClick}>
      <i style={{ marginRight: "10px" }} className={icon}></i>
      {value}
    </span>
  );
};
