import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@aws-amplify/ui-react";
import RideOverviewDetail from "./RideOverviewDetail";

const RidesOverview = ({ rides, removeRide, changeRide }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell as="th">Datum & Tijd</TableCell>
          <TableCell as="th">Omschrijving</TableCell>
          <TableCell as="th">Afstand</TableCell>
          <TableCell as="th">Hms</TableCell>
          <TableCell as="th">Punten</TableCell>
          <TableCell as="th">Start</TableCell>
          <TableCell as="th">GPX</TableCell>
          <TableCell as="th">Website</TableCell>
          <TableCell as="th">Type</TableCell>
          <TableCell as="th">&nbsp;</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rides.map((ride) => (
          <RideOverviewDetail
            key={ride.id}
            ride={ride}
            removeRide={removeRide}
            changeRide={changeRide}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default RidesOverview;
