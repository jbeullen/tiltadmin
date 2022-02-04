import React, { useState } from "react";
import AttendanceDetail from "./AttendanceDetail";
import EditAttendanceDetail from "./EditAttendanceDetail";

const AttendanceOverviewDetail = ({ ride }) => {
  const [editMode, setEditMode] = useState(false);

  const enableEditMode = () => {
    setEditMode(true);
  };

  const disableEditMode = () => {
    setEditMode(false);
  };

  return editMode ? (
    <EditAttendanceDetail ride={ride} disableEditMode={disableEditMode} />
  ) : (
    <AttendanceDetail ride={ride} enableEditMode={enableEditMode} />
  );
};

export default AttendanceOverviewDetail;
