import { useCallback, useMemo, useRef, useState } from "react";
import { Data, data } from "./constants";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  IsFullWidthRowParams,
  RowHeightParams,
} from "ag-grid-community";
import { CellRenderer } from "./CellRender";
// import { FullWidthCellRenderer } from "./FullWidthCellRenderer";
import { SubTable } from "./SubTable";

function recursiveFindById(arrayData: Data[], customId: number) {
  let foundData = arrayData.find((e) => e.customId === customId);

  if (foundData) {
    return foundData;
  }
  arrayData.every((e) => {
    foundData = recursiveFindById(e.childrens, customId);
    if (foundData) {
      return false;
    }
    return true;
  });

  return foundData;
}

export const useTable = () => {
  const showBlankForExpanded = false;
  const blankForExpandedObject = {
    dec: "",
    nov: "",
    oct: "",
    sep: "",
    aug: "",
    jul: "",
    jun: "",
    may: "",
    apr: "",
  };

  let rowDataExpanded: Data[] = [];
  const gridRef = useRef<AgGridReact>(null);
  const [rowData] = useState<Data[]>(data);

  function updateData(customId: number) {
    const foundData = recursiveFindById(rowData, customId);
    if (foundData) {
      foundData.expanded = !foundData.expanded;
      rowDataExpanded = [];
      makeDataResurcive(rowData, 0);
      gridRef.current!.api.setRowData(rowDataExpanded);
      gridRef.current!.api.sizeColumnsToFit();
    }
  }

  function makeDataResurcive(arrayData: Data[], level: number) {
    arrayData.forEach((mainRow) => {
      mainRow.level = level;
      if (
        mainRow.childrens.length > 0 &&
        mainRow.expanded &&
        showBlankForExpanded
      ) {
        mainRow = { ...mainRow, ...blankForExpandedObject };
      }
      rowDataExpanded.push(mainRow);
      if (mainRow.expanded) {
        makeDataResurcive(mainRow.childrens, level + 10);
      }
    });
  }

  const [columnDefs] = useState<ColDef[]>([
    {
      headerName: "",
      field: "type",
      cellRenderer: CellRenderer,
      cellRendererParams: {
        updateData,
      },
    },
    { headerName: "dec", field: "dec" },
    { headerName: "nov", field: "nov" },
    { headerName: "oct", field: "oct" },
    { headerName: "sep", field: "sep" },
    { headerName: "aug", field: "aug" },
    { headerName: "jul", field: "jul" },
    { headerName: "jun", field: "jun" },
    { headerName: "may", field: "may" },
    { headerName: "apr", field: "apr" },
  ]);

  const defaultColDef = useMemo<ColDef>(() => {
    return {};
  }, []);

  const paginationPageSizeSelector = useMemo<number[] | boolean>(() => {
    return [200, 500, 1000];
  }, []);

  const isFullWidthRow = useCallback((params: IsFullWidthRowParams) => {
    return params.rowNode.data.fullWidth;
  }, []);

  const fullWidthCellRendererComponent = useMemo<any>(() => {
    return SubTable;
  }, []);

  const getRowHeight = useCallback((params: RowHeightParams) => {
    // you can have normal rows and full width rows any height that you want
    const isBodyRow = params.node.rowPinned === undefined;
    const isFullWidth = params.node.data.fullWidth;
    if (isBodyRow && isFullWidth) {
      return 500;
    }
  }, []);

  return {
    defaultColDef,
    paginationPageSizeSelector,
    columnDefs,
    gridRef,
    rowData,
    isFullWidthRow,
    fullWidthCellRendererComponent,
    getRowHeight,
  };
};
