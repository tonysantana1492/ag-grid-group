import { ColDef, RowHeightParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useMemo, useState } from "react";

function getColumnDefs() {
  const columnDefs: ColDef[] = [];
  alphabet().forEach((letter) => {
    const colDef: ColDef = {
      headerName: letter,
      field: letter,
      width: 150,
    };
    if (letter === "A") {
      colDef.pinned = "left";
    }
    if (letter === "Z") {
      colDef.pinned = "right";
    }
    columnDefs.push(colDef);
  });
  return columnDefs;
}

function alphabet() {
  return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
}

function createData(count: number, prefix: string) {
  const rowData = [];
  for (let i = 0; i < count; i++) {
    const item: any = {};
    item.fullWidth = i % 3 === 2;
    alphabet().forEach((letter) => {
      item[letter] = prefix + " (" + letter + "," + i + ")";
    });
    rowData.push(item);
  }
  return rowData;
}

export const SubTable = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData] = useState<any[]>(createData(100, "body"));
  const pinnedTopRowData = useMemo<any[]>(() => {
    return createData(3, "pinned");
  }, []);
  const pinnedBottomRowData = useMemo<any[]>(() => {
    return createData(3, "pinned");
  }, []);
  const [columnDefs] = useState<ColDef[]>(getColumnDefs());

  const getRowHeight = useCallback((params: RowHeightParams) => {
    // you can have normal rows and full width rows any height that you want
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
          pinnedTopRowData={pinnedTopRowData}
          pinnedBottomRowData={pinnedBottomRowData}
          columnDefs={columnDefs}
          getRowHeight={getRowHeight}
        />
      </div>
    </div>
  );
};
