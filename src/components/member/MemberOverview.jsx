import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@aws-amplify/ui-react";
import MemberOverViewDetail from "./MemberOverViewDetail";

const MemberOverview = ({ members, removeMember, changeMember }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell as="th">Voornaam</TableCell>
          <TableCell as="th">Achternaam</TableCell>
          <TableCell as="th">&nbsp;</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {members.map((member) => (
          <MemberOverViewDetail
            key={member.id}
            member={member}
            removeMember={removeMember}
            changeMember={changeMember}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default MemberOverview;
