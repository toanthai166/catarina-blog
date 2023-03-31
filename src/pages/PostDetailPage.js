import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import LayoutPost from "../components/layout/LayoutPost";
import { db } from "../firebase/firebase-config";
import PostCategory from "../module/post/PostCategory";
import PostImage from "../module/post/PostImage";
import PostTitle from "../module/post/PostTitle";
import NotFoundPage from "./NotFoundPage";
import parse from "html-react-parser";
import { iconFollow } from "../components/follow";
import FollowItem from "../components/follow/FollowItem";
import PostItem from "../module/post/PostItem";

const PostDetailPage = () => {
  const { slug } = useParams();
  const [postInfo, setPostInfo] = useState();

  useEffect(() => {
    async function fetch() {
      const colRef = query(collection(db, "posts"), where("slug", "==", slug));
      onSnapshot(colRef, (snapshot) => {
        snapshot.forEach((doc) => {
          doc.data() && setPostInfo(doc.data());
        });
      });
    }
    fetch();
  }, [slug]);
  const categoryId = postInfo?.categoryId;
  const [postPopular, setPostPopular] = useState();
  useEffect(() => {
    async function fetch() {
      const colRef = collection(db, "posts");
      const q = query(colRef, where("categoryId", "==", categoryId));
      onSnapshot(q, (snapshot) => {
        const results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
          setPostPopular(results);
        });
      });
    }
    fetch();
  }, [categoryId]);
  const formatDate = new Date().toLocaleDateString("vi-VN");

  if (!slug) return <NotFoundPage></NotFoundPage>;
  if (!postInfo) return;
  return (
    <>
      <Layout>
        <LayoutPost>
          <div className="flex flex-col">
            <PostCategory> {postInfo.category.name}</PostCategory>
            <PostTitle>{postInfo.title}</PostTitle>
            <div className="flex gap-3 text-center text-slate-500">
              by
              <span className="w-[100px] h-[30px] transition-all hover:text-yellow-600 hover:underline">
                {postInfo.user.fullname}
              </span>
              <div className="flex w-full translate-y-1">
                <div className="flex text-center justify-start gap-5 text-sm"></div>
                <div className="flex text-center  justify-start gap-1 mb-3">
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
                  <span className="text-xs  ">{formatDate}</span>
                </div>
              </div>
            </div>
            <PostImage
              url={postInfo.image}
              // to={`/${data.slug}`}
              className="flex-1 w-full h-full max-h-[430px]  my-3  mb-5 max-w-[650px]"
            ></PostImage>

            <div className="w-full max-w-[650px] text-sm mb-10 text-slate-600">
              {content}
              {/* parse(postInfo?.content) */}
            </div>
            <div className="w-full  cursor-pointer justify-center mb-20 flex gap-3 ">
              {iconFollow.slice(0, 4).map((item) => (
                <div
                  key={item.title}
                  className=" flex w-full justify-between  mb-0"
                >
                  <FollowItem className="" data={item}></FollowItem>
                </div>
              ))}
            </div>
            <h2 className=" text-lg mb-5 font-bold">
              YOU MAY LIKE THESE POSTS
            </h2>
            <div className="flex gap-5 ">
              {postPopular?.slice(0, 4).map((post) => (
                <PostItem
                  key={post.id}
                  small
                  className="mb-5 flex-col "
                  data={post}
                ></PostItem>
              ))}
            </div>
          </div>
        </LayoutPost>
      </Layout>
    </>
  );
};
const content = (
  <span className=" w-full max-w-[650px] text-ellipsis mb-20 ">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos, est quis.
    Commodi dolorem perspiciatis magnam repudiandae recusandae nam, quae, quasi
    culpa exercitationem consequatur nisi pariatur quas, praesentium quibusdam
    odio voluptas.
    <br /> <br />
    <div className="font-style: italic border-l-4 p-3 border-l-yellow-400 bg-slate-50">
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It was popularised in the 1960s with the
    </div>
    <br /> <br />
    It was popularised in the 1960s with the release of Letraset sheets
    containing Lorem Ipsum passages, and more recently with desktop publishing
    software like Aldus PageMaker including versions of Lorem Ipsum.
    <br /> <br />
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa debitis eius
    sit quos accusamus! Inventore doloribus cupiditate quibusdam totam
    voluptatibus maxime pariatur? In eos, molestiae iure inventore ullam impedit
    amet.
    <br /> <br />
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste illo aperiam
    quae eligendi earum, qui perferendis commodi error doloribus sed eius
    doloremque ipsa eveniet! Illum sunt magni nulla autem possimus.
    <br /> <br />
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque distinctio
    error similique ea dolor impedit corporis beatae eligendi vel dignissimos
    incidunt, nesciunt alias neque debitis nemo! Adipisci at consequuntur
    corporis.
  </span>
);

export default PostDetailPage;
