import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button } from "../../components/button";
import { db } from "../../firebase/firebase-config";
import PostItem from "../post/PostItem";

const POST_PER_PAGE = 3;

const HomeFeature = () => {
  const [posts, setPosts] = useState([]);
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetch() {
      const colRef = collection(db, "posts");
      const result = [];
      const q = query(colRef, where("hot", "==", false), limit(POST_PER_PAGE));

      const documentSnapshots = await getDocs(q);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });

      onSnapshot(q, (snapshot) => {
        snapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
          setPosts(result);
        });
      });
      setLastDoc(lastVisible);
    }
    fetch();
  }, []);

  const handleLoadMorePost = async () => {
    const nextRef = query(
      collection(db, "posts"),
      where("hot", "==", false),
      startAfter(lastDoc || 0),
      limit(POST_PER_PAGE)
    );

    onSnapshot(nextRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts([...posts, ...results]);
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };
  if (posts.length < 0) return null;
  return (
    <div className="container flex gap-3">
      <div className="w-full">
        {posts.length > 0 &&
          posts.map((post) => (
            <div key={post.id}>
              <PostItem className="mb-20" big data={post}></PostItem>
            </div>
          ))}
        {total > posts.length && (
          <Button
            type="button"
            className="float-right max-w-[150px] text-sm rounded-sm"
            onClick={handleLoadMorePost}
          >
            <span>LoadMore</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default HomeFeature;
