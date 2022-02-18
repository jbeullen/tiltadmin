import React, { useState } from "react";
import {
  Button,
  Flex,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@aws-amplify/ui-react";
import { DataStore } from "@aws-amplify/datastore";
import { Ride } from "../models";
import { API, Predicates, SortDirection } from "aws-amplify";

const WebsitePage = () => {
  const [calendarMessage, setCalendarMessage] = useState("");
  const [leaderBoardMessage, setLeaderBoardMessage] = useState("");

  const updateRides = async () => {
    setCalendarMessage("Updating...");
    const models = await DataStore.query(Ride, Predicates.ALL, {
      sort: (s) => s.date(SortDirection.ASCENDING),
    });
    try {
      const result = await API.post("websiteupdateapi", "/calendar", {
        body: models,
      });
      await setCalendarMessage(result.message);
      if (result.error) {
        console.log(result.error);
      }
    } catch (e) {
      await setCalendarMessage("Er liep iets fout, probeer later opnieuw.");
      console.log(e);
    }
  };

  const updateLeaderBoard = async () => {
    setLeaderBoardMessage("Updating...");

    try {
      const result = await API.post("websiteupdateapi", "/leaderboard", {
        body: [],
      });
      await setLeaderBoardMessage(result.message);
      if (result.error) {
        console.log(result.error);
      }
    } catch (e) {
      await setLeaderBoardMessage("Er liep iets fout, probeer later opnieuw.");
      console.log(e);
    }
  };

  return (
    <Flex direction="column">
      <Flex direction="row">
        <Flex direction="column" width="75%" alignItems="center">
          <Flex direction="row" width="100%" justifyContent="center">
            <Heading level={3}>Website</Heading>
          </Flex>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell as="th">Pagina</TableCell>
                <TableCell as="th">Actie</TableCell>
                <TableCell as="th">Boodschap</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Kalender</TableCell>
                <TableCell>
                  <Button onClick={() => updateRides()}>Publiceer</Button>
                </TableCell>
                <TableCell>{calendarMessage}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Klassment</TableCell>
                <TableCell>
                  <Button onClick={() => updateLeaderBoard()}>Publiceer</Button>
                </TableCell>
                <TableCell>{leaderBoardMessage}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default WebsitePage;
