import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase-config";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostTitle from "./PostTitle";

const PostItem = ({ className = "", big, small, popular, data = {} }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        if (data.userId) {
          const docRef = doc(db, "users", data.userId);
          const docSnap = await getDoc(docRef);
          setUser(docSnap.data());
        }
      } catch (error) {
        console.log();
      }
    }
    fetchUser();
  }, [data.userId]);
  const date = new Date(data?.createAt?.seconds * 1000);
  const formatDate = new Date(date).toLocaleDateString("vi-VN");
  return (
    <div className={`flex gap-5  ${className}`}>
      <PostImage
        url={data.image}
        to={`/${data.slug}`}
        className="flex-1"
        small={small}
      ></PostImage>
      <div className="flex flex-col max-w-[360px]  max-h-[200px] overflow-hidden">
        {big && <PostCategory> {data.category?.name}</PostCategory>}
        <PostTitle to={`/${data.slug}`} small={small}>
          {data.title}
        </PostTitle>
        <div className="flex text-center justify-start gap-2  mt-1 text-xs">
          {!small ? (
            <>
              <div className="text-slate-500">by </div>
              <span className="  transition-all hover:text-yellow-600 hover:underline">
                {user?.fullname}
              </span>
            </>
          ) : (
            ""
          )}
          <div className="flex justify-start  bottom-0 text-slate-500 text-xs  gap-1 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className=" text-xs  "> {formatDate}</span>
          </div>
        </div>
        {big && (
          <span className="text-ellipsis text-slate-600  h-full ">
            {"Lorem ipsum dolor sit amet, consectetur adipisicing elit. "}{" "}
          </span>
        )}
      </div>
    </div>
  );
};

export default PostItem;
