import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import React from "react";

const columns = [
  { id: "idx", label: "#순번", minWidth: 100 },
  { id: "voltage", label: "전압(V)", minWidth: 100 },
  { id: "temperature", label: "온도(°C)", minWidth: 100 },
  { id: "resistance", label: "저항(mΩ)", minWidth: 100 },
  { id: "soc", label: "SOC(%)", minWidth: 100 },
  { id: "soh", label: "SOH(%)", minWidth: 100 },
];

const List = ({ batteryHistory }) => {
  return (
    <TableContainer
      sx={{
        border: "1px solid rgba(224, 224, 224, 1)",
        boxShadow: "none",
      }}
      component={Paper}
    >
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align="left"
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(batteryHistory).length > 0 &&
            Object.values(batteryHistory).map((history, idx) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                {columns.map((column) => (
                  <TableCell key={column.id} align="left">
                    {!history[column.id] && history[column.id] !== 0
                      ? idx + 1
                      : history[column.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
