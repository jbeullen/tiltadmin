import React from "react";
import { Flex, Heading } from "@aws-amplify/ui-react";
import AttendanceOverview from "../components/attendance/AttendanceOverview";

const AttendancePage = () => {
  return (
    <Flex direction="column">
      <Flex direction="row">
        <Flex direction="column" width="75%" alignItems="center">
          <Flex direction="row" width="100%" justifyContent="center">
            <Heading level={3}>Rittenbladen</Heading>
          </Flex>
          <AttendanceOverview />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AttendancePage;
