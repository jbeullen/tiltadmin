import React from "react";
import {
  Button,
  ButtonGroup,
  IconDelete,
  IconEdit,
  Link,
  TableCell,
  TableRow,
} from "@aws-amplify/ui-react";

const RideDetail = ({ ride, removeRide, enableEditMode }) => {
  return (
    <TableRow>
      <TableCell>{new Date(ride.date).toLocaleString("be-NL")}</TableCell>
      <TableCell>{ride.description}</TableCell>
      <TableCell>{ride.distance}km</TableCell>
      <TableCell>
        {!ride.elevation_gain ? "" : ride.elevation_gain + "m"}
      </TableCell>
      <TableCell>{ride.points}</TableCell>
      <TableCell>{ride.location}</TableCell>
      <TableCell>
        {!ride.gpx ? (
          ""
        ) : (
          <Link href={ride.gpx} isExternal={true}>
            gpx
          </Link>
        )}
      </TableCell>
      <TableCell>
        {!ride.website ? (
          ""
        ) : (
          <Link href={ride.website} isExternal={true}>
            link
          </Link>
        )}
      </TableCell>
      <TableCell>{ride.type}</TableCell>
      <TableCell>
        <ButtonGroup>
          <Button onClick={() => enableEditMode()}>
            <IconEdit />
          </Button>
          <Button onClick={() => removeRide(ride)}>
            <IconDelete />
          </Button>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
};

export default RideDetail;
