import React from "react";
import {
  Button,
  ButtonGroup,
  IconDelete,
  IconEdit,
  TableCell,
  TableRow,
} from "@aws-amplify/ui-react";

const MemberDetail = ({ member, removeMember, enableEditMode }) => {
  return (
    <TableRow>
      <TableCell>{member.first_name}</TableCell>
      <TableCell>{member.last_name}</TableCell>
      <TableCell>
        <ButtonGroup>
          <Button onClick={() => enableEditMode()}>
            <IconEdit />
          </Button>
          <Button onClick={() => removeMember(member)}>
            <IconDelete />
          </Button>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
};

export default MemberDetail;
