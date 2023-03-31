import { async } from "@firebase/util";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import slugify from "slugify";
import Layout from "../components/layout/Layout";
import LayoutPost from "../components/layout/LayoutPost";
import { db } from "../firebase/firebase-config";
import PostItem from "../module/post/PostItem";

const POST_PER_PAGE = 5;

const SearchPage = () => {
  const { slug } = useParams();

  const [posts, setPosts] = useState([]);

  const slugSearch = slugify(slug);
  useEffect(() => {
    async function fetch() {
      const colRef = collection(db, "posts");
      const result = [];
      const newRef = slugSearch
        ? query(
            colRef,
            where("slug", ">=", slugSearch),
            where("slug", "<=", slugSearch + "utf8")
          )
        : query(colRef, limit(POST_PER_PAGE));

      onSnapshot(newRef, (snapshot) => {
        snapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
          setPosts(result);
        });
      });
    }
    fetch();
  }, [slugSearch]);

  return (
    <Layout>
      <LayoutPost>
        {posts.length > 0 || <div>No results found</div>}
        <div className="container flex gap-3">
          <div className="w-full">
            {posts.length > 0 &&
              posts.map((post) => (
                <div key={post.id}>
                  <PostItem className="mb-20" big data={post}></PostItem>
                </div>
              ))}
          </div>
        </div>
      </LayoutPost>
    </Layout>
  );
};

export default SearchPage;
