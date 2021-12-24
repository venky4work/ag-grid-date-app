import React, { useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import DATES from './Dates.json';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import CustomDate from './CustomDate';
import CustomDateFilter from './CustomDateFilter';

const DataGrid = () => {
  const [rowData, setRowData] = useState(DATES);

  const handleFilterChange = (event) => {
      console.log(event.api.getFilterInstance("dateTime"));
  }

  const COLUMN_DEFINITION = [
    {
      field: 'dateTime',
      headerName: 'Date Time',
      filter: 'customDateFilter',
      filterParams: {
        suppressAndOrCondition : true,
        closeOnApply: true,
        comparator: function(filterLocalDate, cellValue) {
          filterLocalDate = new Date(filterLocalDate);
          // you need to handle the Z appended to the end of the cellValue string,
          // otherwise you will get the incorrect date you're expecting
          cellValue = new Date(cellValue.slice(0, -1));
          let filterBy = filterLocalDate.getTime();
          let filterMe = cellValue.getTime();

        //   console.log(filterBy, filterMe);
          if (filterBy === filterMe) {
            return 0;
          }

          if (filterMe < filterBy) {
            return -1;
          }

          if (filterMe > filterBy) {
            return 1;
          }
        }
      }
    }
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <AgGridReact
        columnDefs={COLUMN_DEFINITION}
        rowData={rowData}
        onFilterChanged={handleFilterChange}
        defaultColDef={{
          sortable: true,
          filter: true,
        }}
        frameworkComponents={{ customDateFilter: CustomDateFilter }}
        // frameworkComponents={{
        //     agDateInput: CustomDate
        //   }}
      />
    </div>
  );
};

export default DataGrid;
