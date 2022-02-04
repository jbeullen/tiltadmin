import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@aws-amplify/ui-react";
import { DataStore, Predicates, SortDirection } from "aws-amplify";
import { Ride } from "../../models";
import AttendanceOverviewDetail from "./AttendanceOverviewDetail";

const AttendanceOverview = () => {
  const [rides, setRides] = useState([]);

  // CRUD
  const retrieveRides = async () => {
    const models = await DataStore.query(Ride, Predicates.ALL, {
      sort: (s) => s.date(SortDirection.ASCENDING),
    });
    await setRides(models);
  };

  useEffect(() => {
    retrieveRides();
  }, []);
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell as="th">Datum & Tijd</TableCell>
          <TableCell as="th">Omschrijving</TableCell>
          <TableCell as="th">&nbsp;</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rides.map((ride) => (
          <AttendanceOverviewDetail key={ride.id} ride={ride} />
        ))}
      </TableBody>
    </Table>
  );
};

export default AttendanceOverview;
