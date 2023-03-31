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

const CategoryManage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "categories");
    const newRef = filter
      ? query(
          colRef,
          where("name", ">=", filter),
          where("name", "<=", filter + "utf8")
        )
      : colRef;
    onSnapshot(newRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategoryList(results);
    });
  }, [filter]);
  const handleDeleteCategory = (docId) => {
    const colRef = doc(db, "categories", docId);
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
  const handleUpdateCategory = (docId) => {
    navigate(`/manage/update-category?id=${docId}`);
  };
  return (
    <div className="w-full">
      <DashboardHeading title="Categories" desc="Manage your category">
        <Button to="/manage/add-category" className="">
          <span className=" text-yellow-700">Create category</span>
        </Button>
      </DashboardHeading>
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
              <th>Name</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categoryList.length > 0 &&
              categoryList.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>
                    <span className="italic text-gray-500">
                      {category.slug}
                    </span>
                  </td>
                  <td>
                    {category.status === categoryStatus.APPROVED && (
                      <LabelStatus type="success">Approved</LabelStatus>
                    )}{" "}
                    {category.status === categoryStatus.UNAPPROVED && (
                      <LabelStatus type="warning">Unapproved</LabelStatus>
                    )}
                  </td>
                  <td>
                    <div className="flex items-center gap-x-3">
                      <ActionView></ActionView>
                      <ActionEdit
                        onClick={() => handleUpdateCategory(category.id)}
                      ></ActionEdit>
                      <ActionDelete
                        onClick={() => handleDeleteCategory(category.id)}
                      ></ActionDelete>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default CategoryManage;
