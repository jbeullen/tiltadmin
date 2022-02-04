import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Flex,
  IconCancel,
  IconSave,
  TableCell,
  TableRow,
  TextField,
} from "@aws-amplify/ui-react";
import DateTimePicker from "react-datetime-picker";

const EditRideDetail = ({ ride, changeRide, disableEditMode }) => {
  const [oldValue, setOldValue] = useState(ride);
  const [date, setDate] = useState(new Date(ride.date));
  const [description, setDescription] = useState(ride.description);
  const [distance, setDistance] = useState(ride.distance);
  const [elevationGain, setElevationGain] = useState(ride.elevation_gain);
  const [location, setLocation] = useState(ride.location);
  const [points, setPoints] = useState(ride.points);
  const [rideType, setRideType] = useState(ride.type);
  const [gpx, setGpx] = useState(!ride.gpx ? "" : ride.gpx);
  const [website, setWebsite] = useState(!ride.website ? "" : ride.website);

  const handleUpdate = () => {
    if (!date || !description || !distance || !points) return;
    changeRide(oldValue, [
      date,
      description,
      distance,
      elevationGain,
      location,
      points,
      rideType,
      gpx,
      website,
    ]);
    disableEditMode();
  };

  return (
    <TableRow>
      <TableCell
        colSpan="10"
        style={{
          backgroundColor: "#eee",
        }}
      >
        <Flex as="form" direction="column">
          <DateTimePicker
            onChange={setDate}
            value={date}
            required={true}
            format={"d/M/yyyy H:m"}
            className={"amplify-field-group"}
            disableClock={true}
            showLeadingZeros={false}
          />
          <TextField
            label="Omschrijving"
            value={description}
            isRequired={true}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            label="Afstand"
            type="number"
            value={distance}
            isRequired={true}
            onChange={(e) => setDistance(e.target.valueAsNumber)}
          />
          <TextField
            label="Hoogtemeters"
            type="number"
            value={elevationGain}
            onChange={(e) => setElevationGain(e.target.valueAsNumber)}
          />
          <TextField
            label="Start Locatie"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <TextField
            label="Punten"
            type="number"
            value={points}
            isRequired={true}
            onChange={(e) => setPoints(e.target.valueAsNumber)}
          />
          <TextField
            label="Type"
            value={rideType}
            onChange={(e) => setRideType(e.target.value)}
          />
          <TextField
            label="Garmin GPX Link"
            placeholder="https://connect.garmin.com/modern/course/12345678"
            value={gpx}
            onChange={(e) => setGpx(e.target.value)}
          />
          <TextField
            label="Website"
            placeholder="https://www.wtcdazalgaan.be"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
          <ButtonGroup>
            <Button onClick={() => disableEditMode()}>
              <IconCancel />
            </Button>
            <Button type="submit" onClick={handleUpdate}>
              <IconSave />
            </Button>
          </ButtonGroup>
        </Flex>
      </TableCell>
    </TableRow>
  );
};

export default EditRideDetail;
