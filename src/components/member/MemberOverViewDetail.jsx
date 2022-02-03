import React, { useState } from "react";
import MemberDetail from "./MemberDetail";
import EditMemberDetail from "./EditMemberDetail";

const MemberOverViewDetail = ({ member, removeMember, changeMember }) => {
  const [editMode, setEditMode] = useState(false);

  const enableEditMode = () => {
    setEditMode(true);
  };

  const disableEditMode = () => {
    setEditMode(false);
  };

  return editMode ? (
    <EditMemberDetail
      member={member}
      changeMember={changeMember}
      disableEditMode={disableEditMode}
    />
  ) : (
    <MemberDetail
      member={member}
      removeMember={removeMember}
      enableEditMode={enableEditMode}
    />
  );
};

export default MemberOverViewDetail;
