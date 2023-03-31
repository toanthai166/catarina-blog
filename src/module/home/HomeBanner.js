import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import { BannerItem } from "../../components/banner";
import { db } from "../../firebase/firebase-config";

const HomeBanner = () => {
  const [posts, setPosts] = useState();
  useEffect(() => {
    async function fetch() {
      const colRef = collection(db, "posts");
      const result = [];
      const q = query(colRef, where("hot", "==", true));

      onSnapshot(q, (snapshot) => {
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
  }, []);
  if (!posts) return null;
  return (
    <div className="item-banner flex w-full  justify-center mb-20 ">
      <Swiper grabCursor="true" slidesPerView={"auto"}>
        {posts.length > 0 &&
          posts.map((post) => (
            <SwiperSlide key={post.id}>
              <BannerItem className="mb-20" big data={post}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default HomeBanner;
