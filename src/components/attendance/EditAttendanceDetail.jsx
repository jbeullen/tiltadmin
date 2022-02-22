import React, { useEffect, useState } from "react";
import {
  Button,
  IconAdd,
  IconCancel,
  IconCheck,
  IconDelete,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@aws-amplify/ui-react";
import { DataStore, Predicates, SortDirection } from "aws-amplify";
import { Member, RideMember } from "../../models";

const EditAttendanceDetail = ({ ride, disableEditMode }) => {
  const [currentRide, setRide] = useState(ride);
  const [rideMembers, setRideMembers] = useState([]);
  const [members, setMembers] = useState([]);

  // CRUD
  const createRideMember = async (rideMember) => {
    await DataStore.save(rideMember);
  };
  const retrieveRideMembers = async () => {
    const models = (await DataStore.query(RideMember)).filter(
      (rm) => rm.ride.id === currentRide.id
    );
    await setRideMembers(models);
  };

  const retrieveAllMembers = async () => {
    const models = await DataStore.query(Member, Predicates.ALL, {
      sort: (s) => s.last_name(SortDirection.ASCENDING),
    });
    await setMembers(models);
  };

  const deleteRideMember = async (rideMember) => {
    await DataStore.delete(rideMember);
  };

  // Update Functions
  const retrieveMembersAndAttendees = async () => {
    await retrieveAllMembers();
    await retrieveRideMembers();
  };

  const removeRideAttendance = async (memberId) => {
    await deleteRideMember(
      rideMembers.filter((rm) => rm.member.id === memberId)[0]
    );
    await retrieveMembersAndAttendees();
  };

  const addRideAttendance = async (member) => {
    await createRideMember(
      new RideMember({
        ride: currentRide,
        member: member,
      })
    );
    await retrieveMembersAndAttendees();
  };

  useEffect(() => {
    retrieveMembersAndAttendees();
  }, []);

  return (
    <>
      <TableRow>
        <TableCell>
          {new Date(currentRide.date).toLocaleString("be-NL")}
        </TableCell>
        <TableCell>{currentRide.description}</TableCell>
        <TableCell>
          <Button onClick={() => disableEditMode()}>
            <IconCancel />
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          colSpan={3}
          style={{
            backgroundColor: "#eee",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell as="th">Voornaam</TableCell>
                <TableCell as="th">Naam</TableCell>
                <TableCell as="th">Aanwezig</TableCell>
                <TableCell as="th">&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.first_name}</TableCell>
                  <TableCell>{member.last_name}</TableCell>

                  {rideMembers.map((rm) => rm.member.id).includes(member.id) ? (
                    <>
                      <TableCell as="th">
                        <IconCheck />
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => removeRideAttendance(member.id)}>
                          <IconDelete />
                        </Button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell as="th">&nbsp;</TableCell>
                      <TableCell>
                        <Button onClick={() => addRideAttendance(member)}>
                          <IconAdd />
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableCell>
      </TableRow>
    </>
  );
};

export default EditAttendanceDetail;
