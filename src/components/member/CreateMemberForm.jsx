import React, { useState } from "react";
import { Button, Flex, Heading, TextField } from "@aws-amplify/ui-react";

const CreateMemberForm = ({ addMember }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleClick = () => {
    if (!firstName || !lastName) return;
    addMember(firstName, lastName);
    setFirstName("");
    setLastName("");
  };

  const handleFirstNameChange = (firstName) => {
    setFirstName(firstName);
  };
  const handleLastNameChange = (lastName) => {
    setLastName(lastName);
  };

  return (
    <Flex direction="column">
      <Flex direction="row" width="100%">
        <Heading level={3}>Voeg Nieuw Lid Toe</Heading>
      </Flex>
      <Flex as="form" direction="column">
        <TextField
          label="Voornaam"
          value={firstName}
          onChange={(e) => handleFirstNameChange(e.target.value)}
        />
        <TextField
          label="Achternaam"
          value={lastName}
          onChange={(e) => handleLastNameChange(e.target.value)}
        />
        <Button onClick={handleClick}>Toevoegen</Button>
      </Flex>
    </Flex>
  );
};

export default CreateMemberForm;
