import React from "react";
import {Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography} from '@mui/material'

// https://codesandbox.io/p/sandbox/material-ui-table-dynamic-wrod4?file=%2Fsrc%2Findex.js%3A10%2C7
function DataTable({ title, data }) {
  const headers = Object.keys(data[0]);

  return (
    <Paper>
      <Typography variant="h4" color="inherit">
        {title}
      </Typography>

      <hr />

      <Table>
        <TableHead>
          <TableRow>
            {headers.map(header => (
              <TableCell align="right">{header.toUpperCase()}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((emp, index) => (
            <TableRow key={index}>
              {headers.map(header => (
                <TableCell align="right">{emp[header]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

DataTable.defaultProps = {
  title: "No Title"
};

export default DataTable;
