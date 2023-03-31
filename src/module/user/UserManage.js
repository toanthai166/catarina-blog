import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActionDelete, ActionEdit, ActionView } from "../../components/action";
import { Button } from "../../components/button";
import LabelStatus from "../../components/label/LabelStatus";
import { Table } from "../../components/table";
import { db } from "../../firebase/firebase-config";
import { categoryStatus } from "../../utils/constants";
import DashboardHeading from "../dashboard/DashboardHeading";
import Swal from "sweetalert2/dist/sweetalert2.js";

import "sweetalert2/src/sweetalert2.scss";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

const UserManage = () => {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  useEffect(() => {
    const colRef = collection(db, "users");
    onSnapshot(colRef, (snapshot) => {
      let results = [];

      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUserList(results);
    });
  }, []);
  const handleDeleteUser = (user) => {
    const colRef = doc(db, "users", user);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDoc(colRef);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  const handleInputSearch = debounce((e) => {
    setFilter(e.target.value);
  }, 500);
  const handleUpdateUser = (docId) => {
    navigate(`/manage/update-user?id=${docId}`);
  };

  console.log(userList);
  return (
    <div className="w-full">
      <DashboardHeading
        title="Categories"
        desc="Manage your category"
      ></DashboardHeading>
      <div className="flex flex-col">
        <input
          type="text"
          onChange={handleInputSearch}
          placeholder="enter your category.."
          className="mb-10   border max-w-[250px] border-yellow-500 rounded-lg p-3 bg-yellow-50"
        />
        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Info</th>
              <th>Username</th>
              <th>Email Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{userList.map((user) => renderUserItem(user))}</tbody>
        </Table>
      </div>
    </div>
  );
};

const renderUserItem = (user) => (
  <tr key={user.id}>
    <td>{user.id.slice(0, 5) + "..."}</td>
    <td>{user?.fullname}</td>
    <td>{user?.username}</td>
    <td>{user?.email}</td>
    <td>
      <div className="flex items-center gap-x-3">
        <ActionView></ActionView>
        <ActionEdit
        // onClick={() => handleUpdateUser(user)}
        ></ActionEdit>
        <ActionDelete
        //  onClick={() => handleDeleteUser(user)}
        ></ActionDelete>
      </div>
    </td>
  </tr>
);

export default UserManage;
