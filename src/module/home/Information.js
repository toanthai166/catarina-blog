import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { iconFollow } from "../../components/follow";
import FollowItem from "../../components/follow/FollowItem";
import { db } from "../../firebase/firebase-config";
import About from "../post/About";
import PostItem from "../post/PostItem";
import SidebarItem from "./SidebarItem";

const Information = () => {
  const [postInfo, setPostInfo] = useState();
  const [categories, setCategories] = useState();
  useEffect(() => {
    async function fetch() {
      const colRef = collection(db, "posts");
      const q = query(
        colRef,
        where("status", "==", 1),
        where("hot", "==", true)
      );
      onSnapshot(q, (snapshot) => {
        const results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
          setPostInfo(results);
        });
      });
    }
    fetch();
  }, []);
  useEffect(() => {
    const colRef = collection(db, "categories");
    const q = query(colRef, where("status", "==", 1));
    onSnapshot(q, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
        setCategories(results);
      });
    });
  }, []);

  return (
    <div className="w-[30%]">
      <SidebarItem title="About me">
        <About></About>
      </SidebarItem>
      <SidebarItem title="Follow Us">
        <div className="w-full justify-center grid grid-cols-2 gap-3 flex-col  ">
          {iconFollow.map((item) => (
            <div
              key={item.title}
              className=" flex justify-between text-sm mb-0"
            >
              <FollowItem data={item}></FollowItem>
            </div>
          ))}
        </div>
      </SidebarItem>
      <SidebarItem title="POPULAR POSTS">
        {postInfo?.slice(0, 4).map((post) => (
          <PostItem key={post.id} small className="mb-5" data={post}></PostItem>
        ))}
      </SidebarItem>{" "}
      <SidebarItem title="TAGS">
        <div className="grid grid-cols-3 gap-1">
          {categories?.map((category) => (
            <div
              key={category.id}
              className="p-2 text-slate-400  cursor-pointer hover:text-white font-medium hover:bg-yellow-300  "
            >
              {category.name}
            </div>
          ))}
        </div>
      </SidebarItem>
    </div>
  );
};

export default Information;
