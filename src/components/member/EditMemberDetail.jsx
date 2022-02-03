import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  IconCancel,
  IconSave,
  TableCell,
  TableRow,
  TextField,
} from "@aws-amplify/ui-react";

const EditMemberDetail = ({ member, changeMember, disableEditMode }) => {
  const [oldValue, setOldValue] = useState(member);
  const [firstName, setFirstName] = useState(member.first_name);
  const [lastName, setLastName] = useState(member.last_name);

  const handleUpdate = () => {
    if (!firstName || !lastName) return;
    changeMember(oldValue, [firstName, lastName]);
    disableEditMode();
  };

  return (
    <TableRow>
      <TableCell>
        <TextField
          label=""
          value={firstName}
          isRequired={true}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </TableCell>
      <TableCell>
        <TextField
          label=""
          value={lastName}
          isRequired={true}
          onChange={(e) => setLastName(e.target.value)}
        />
      </TableCell>
      <TableCell>
        <ButtonGroup>
          <Button onClick={() => disableEditMode()}>
            <IconCancel />
          </Button>
          <Button type="submit" onClick={handleUpdate}>
            <IconSave />
          </Button>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
};

export default EditMemberDetail;
