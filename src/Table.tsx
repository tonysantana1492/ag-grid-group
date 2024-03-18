import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useTable } from "./useTable";

export const Test = () => {
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const {
    gridRef,
    columnDefs,
    defaultColDef,
    paginationPageSizeSelector,
    rowData,
    isFullWidthRow,
    fullWidthCellRendererComponent,
    getRowHeight,
  } = useTable();

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <div style={gridStyle} className={"ag-theme-quartz-dark"}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          pagination={true}
          paginationPageSize={500}
          paginationPageSizeSelector={paginationPageSizeSelector}
          isFullWidthRow={isFullWidthRow}
          fullWidthCellRenderer={fullWidthCellRendererComponent}
          getRowHeight={getRowHeight}
        />
      </div>
    </div>
  );
};
