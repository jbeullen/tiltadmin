import React from "react";
import { Flex, Heading } from "@aws-amplify/ui-react";
import CreateRideForm from "../components/ride/CreateRideForm";

const RidesPage = () => {
  return (
    <Flex direction="column">
      <Flex direction="row">
        <Flex direction="column" width="75%" alignItems="center">
          <Flex direction="row" width="100%" justifyContent="center">
            <Heading level={3}>Ritten</Heading>
          </Flex>
          <div>TODO: ritten lijst</div>
        </Flex>
        <CreateRideForm />
      </Flex>
    </Flex>
  );
};

export default RidesPage;
