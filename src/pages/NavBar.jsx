import React from "react";
import { Button, Flex, Link } from "@aws-amplify/ui-react";
import { Link as ReactRouterLink } from "react-router-dom";

const NavBar = ({ signout }) => {
  return (
    <Flex direction={"row"} backgroundColor={"black"}>
      <Link as={ReactRouterLink} to="/">
        <Button variation={"link"}>Leden</Button>
      </Link>
      <Link as={ReactRouterLink} to="/rides">
        <Button variation={"link"}>Ritten</Button>
      </Link>
      <Link as={ReactRouterLink} to="/attendance">
        <Button variation={"link"}>Aanwezigheid</Button>
      </Link>
      <Link as={ReactRouterLink} to="/website">
        <Button variation={"link"}>Website</Button>
      </Link>
      <Button variation={"link"} onClick={signout}>
        Uitloggen
      </Button>
    </Flex>
  );
};

export default NavBar;
