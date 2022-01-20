import React, { useState } from "react";
import { Button, Flex, Heading, TextField } from "@aws-amplify/ui-react";

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

  const handleFirstNameChange = (firstName) => {
    setFirstName(firstName);
  };
  const handleLastNameChange = (lastName) => {
    setLastName(lastName);
  };

  return (
    <Flex as="form" direction="row" alignItems="stretch">
      <TextField
        value={firstName}
        onChange={(e) => handleFirstNameChange(e.target.value)}
      />
      <TextField
        value={lastName}
        onChange={(e) => handleLastNameChange(e.target.value)}
      />
      <Button onClick={handleUpdate}>Aanpassen</Button>
      <Button onClick={handleDelete}>Verwijderen</Button>
    </Flex>
  );
};

export default UpdateMemberForm;
