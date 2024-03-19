import { ColDef, RowHeightParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useMemo, useState } from "react";

export const SubTable = (props) => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const rowData = props.data.subTable;

  const [columnDefs] = useState<ColDef[]>([
    { headerName: "Nombre", field: "name" },
    { headerName: "Apellido", field: "lastName" },
    { headerName: "Edad", field: "age" },
  ]);

  const getRowHeight = useCallback((params: RowHeightParams) => {
    const isBodyRow = params.node.rowPinned === undefined;
    const isFullWidth = params.node.data.fullWidth;
    if (isBodyRow && isFullWidth) {
      return 75;
    }
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className={"ag-theme-quartz-dark"}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          getRowHeight={getRowHeight}
        />
      </div>
    </div>
  );
};
