import React, { useState } from "react";
import { Button, Flex, Heading, TextField } from "@aws-amplify/ui-react";

const CreateMemberForm = ({ addMember }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleClick = () => {
    if (!firstName || !lastName) return;
    addMember([firstName, lastName]);
    setFirstName("");
    setLastName("");
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
          isRequired={true}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="Achternaam"
          value={lastName}
          isRequired={true}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Button type="submit" onClick={handleClick}>
          Toevoegen
        </Button>
      </Flex>
    </Flex>
  );
};

export default CreateMemberForm;
