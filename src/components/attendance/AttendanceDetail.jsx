import React from "react";
import { Button, IconEdit, TableCell, TableRow } from "@aws-amplify/ui-react";

const AttendanceDetail = ({ ride, enableEditMode }) => {
  return (
    <TableRow>
      <TableCell>{new Date(ride.date).toLocaleString("be-NL")}</TableCell>
      <TableCell>{ride.description}</TableCell>
      <TableCell>
        <Button onClick={() => enableEditMode()}>
          <IconEdit />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default AttendanceDetail;
