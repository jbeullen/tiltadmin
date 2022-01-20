import React, { useEffect, useState } from "react";
import { Flex, Heading, Text } from "@aws-amplify/ui-react";
import { DataStore } from "@aws-amplify/datastore";
import { Member } from "../models";
import { Predicates, SortDirection } from "aws-amplify";
import MemberCreateForm from "../components/member/CreateMemberForm";
import UpdateMemberForm from "../components/member/UpdateMemberForm";

const MembersPage = () => {
  const [members, setMembers] = useState([]);

  // CRUD Methods
  const createMember = async (firstName, lastName) => {
    await DataStore.save(
      new Member({
        first_name: firstName,
        last_name: lastName,
        rides: [],
      })
    );
  };

  const retrieveMembers = async () => {
    const models = await DataStore.query(Member, Predicates.ALL, {
      sort: (s) => s.last_name(SortDirection.ASCENDING),
    });
    setMembers(models);
  };

  const updateMember = async (oldMember, formData) => {
    const [firstName, lastName] = formData;
    await DataStore.save(
      Member.copyOf(oldMember, (item) => {
        item.first_name = firstName;
        item.last_name = lastName;
      })
    );
  };

  const deleteMember = async (member) => {
    await DataStore.delete(member);
  };

  // Refresh methods
  const addMember = async (firstName, lastName) => {
    await createMember(firstName, lastName);
    await retrieveMembers();
  };

  const changeMember = async (oldMember, formData) => {
    await updateMember(oldMember, formData);
    await retrieveMembers();
  };

  const removeMember = async (member) => {
    await deleteMember(member);
    await retrieveMembers();
  };

  useEffect(() => {
    retrieveMembers();
  }, []);

  return (
    <Flex direction="column">
      <Flex direction="row">
        <Flex direction="column" width="75%" alignItems="center">
          <Flex direction="row" width="100%" justifyContent="center">
            <Heading level={3}>Leden</Heading>
          </Flex>
          {members.map((member) => (
            <UpdateMemberForm
              key={member.id}
              member={member}
              changeMember={changeMember}
              removeMember={removeMember}
            />
          ))}
        </Flex>
        <MemberCreateForm addMember={addMember} />
      </Flex>
    </Flex>
  );
};

export default MembersPage;
