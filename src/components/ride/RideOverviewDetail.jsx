import React, { useState } from "react";
import RideDetail from "./RideDetail";
import EditRideDetail from "./EditRideDetail";

const RideOverviewDetail = ({ ride, removeRide, changeRide }) => {
  const [editMode, setEditMode] = useState(false);

  const enableEditMode = () => {
    setEditMode(true);
  };

  const disableEditMode = () => {
    setEditMode(false);
  };

  return editMode ? (
    <EditRideDetail
      ride={ride}
      changeRide={changeRide}
      disableEditMode={disableEditMode}
    />
  ) : (
    <RideDetail
      ride={ride}
      removeRide={removeRide}
      enableEditMode={enableEditMode}
    />
  );
};

export default RideOverviewDetail;
