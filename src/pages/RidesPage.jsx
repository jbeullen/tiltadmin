import React, { useEffect, useState } from "react";
import { Flex, Heading } from "@aws-amplify/ui-react";
import CreateRideForm from "../components/ride/CreateRideForm";
import { DataStore } from "@aws-amplify/datastore";
import { Ride } from "../models";
import { Predicates, SortDirection } from "aws-amplify";
import RidesOverview from "../components/ride/RidesOverview";

const RidesPage = () => {
  const [rides, setRides] = useState([]);

  // CRUD
  const createRide = async (formData) => {
    const [
      date,
      description,
      distance,
      elevation_gain,
      location,
      points,
      rideType,
      gpx,
      website,
    ] = formData;
    await DataStore.save(
      new Ride({
        date: !date ? null : date.toISOString(),
        description: description,
        distance: distance,
        elevation_gain: elevation_gain,
        location: location,
        points: points,
        type: rideType,
        gpx: !gpx ? null : gpx,
        website: !website ? null : website,
        attendance: [],
      })
    );
  };

  const retrieveRides = async () => {
    const models = await DataStore.query(Ride, Predicates.ALL, {
      sort: (s) => s.date(SortDirection.ASCENDING),
    });
    await setRides(models);
  };

  const updateRide = async (oldRide, formData) => {
    const [
      date,
      description,
      distance,
      elevation_gain,
      location,
      points,
      rideType,
      gpx,
      website,
    ] = formData;
    await DataStore.save(
      Ride.copyOf(oldRide, (item) => {
        item.date = date.toISOString();
        item.description = description;
        item.distance = distance;
        item.elevation_gain = elevation_gain;
        item.location = location;
        item.points = points;
        item.type = rideType;
        item.gpx = !gpx ? null : gpx;
        item.website = !website ? null : website;
      })
    );
  };

  const deleteRide = async (ride) => {
    await DataStore.delete(ride);
  };

  // Updating State
  const removeRide = async (ride) => {
    await deleteRide(ride);
    await retrieveRides();
  };

  const addRide = async (formData) => {
    await createRide(formData);
    await retrieveRides();
  };

  const changeRide = async (oldRide, formData) => {
    await updateRide(oldRide, formData);
    await retrieveRides();
  };

  useEffect(() => {
    retrieveRides();
  }, []);

  // UI
  return (
    <Flex direction="column">
      <Flex direction="row">
        <Flex direction="column" width="75%" alignItems="center">
          <Flex direction="row" width="100%" justifyContent="center">
            <Heading level={3}>Ritten</Heading>
          </Flex>
          <RidesOverview
            rides={rides}
            removeRide={removeRide}
            changeRide={changeRide}
          />
        </Flex>
        <CreateRideForm addRide={addRide} />
      </Flex>
    </Flex>
  );
};

export default RidesPage;
