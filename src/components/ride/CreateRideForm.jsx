import React, { useState } from "react";
import { Button, Flex, Heading, TextField } from "@aws-amplify/ui-react";
import DateTimePicker from "react-datetime-picker";

const CreateRideForm = ({ addRide }) => {
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [distance, setDistance] = useState(0);
  const [elevationGain, setElevationGain] = useState(0);
  const [location, setLocation] = useState("");
  const [points, setPoints] = useState(0);
  const [rideType, setRideType] = useState("");
  const [gpx, setGpx] = useState("");
  const [website, setWebsite] = useState("");

  const handleClick = () => {
    if (!date || !description || !distance || !points) return;
    addRide([
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
    setDate(new Date());
    setDescription("");
    setDistance(0);
    setElevationGain(0);
    setLocation("");
    setPoints(0);
    setRideType("");
    setGpx("");
    setWebsite("");
  };

  return (
    <Flex direction="column">
      <Flex direction="row" width="100%">
        <Heading level={3}>Voeg Nieuwe Rit Toe</Heading>
      </Flex>
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
        <Button type="submit" onClick={handleClick}>
          Toevoegen
        </Button>
      </Flex>
    </Flex>
  );
};

export default CreateRideForm;
