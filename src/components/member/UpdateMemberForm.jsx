import React, { useState } from "react";
import {
  Button,
  Flex,
  TextField,
  IconSave,
  IconDelete,
  ButtonGroup,
} from "@aws-amplify/ui-react";

const UpdateMemberForm = ({ member, changeMember, removeMember }) => {
  const [oldValue, setOldValue] = useState(member);
  const [firstName, setFirstName] = useState(member.first_name);
  const [lastName, setLastName] = useState(member.last_name);

  const handleUpdate = () => {
    if (!firstName || !lastName) return;
    changeMember(oldValue, [firstName, lastName]);
  };

  const handleDelete = () => {
    removeMember(oldValue);
  };

  return (
    <Flex as="form" direction="row">
      <TextField
        value={firstName}
        isRequired={true}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        value={lastName}
        isRequired={true}
        onChange={(e) => setLastName(e.target.value)}
      />
      <ButtonGroup>
        <Button type="submit" onClick={handleUpdate}>
          <IconSave />
        </Button>
        <Button onClick={handleDelete}>
          <IconDelete />
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export default UpdateMemberForm;
