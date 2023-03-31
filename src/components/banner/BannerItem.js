import React from "react";

const BannerItem = ({ data, to }) => {
  const date = new Date(data?.createAt?.seconds * 1000);
  const formatDate = new Date(date).toLocaleDateString("vi-VN");
  return (
    <div className="banneritem h-[360px] w-full relative">
      <a href={data.slug}>
        <img src={data.image} alt="" className="w-full h-full object-cover " />
      </a>
      <div className="flex flex-col absolute bottom-0 bg-[rgba(0,0,0,0.3)] text-white w-full px-10 py-3 h-[116px]">
        <span className=" bg-yellow-200 p-0 rounded max-w-[80px] text-slate-900 text-sm font-medium  w-full text-center mb-2">
          {data.category.name}
        </span>
        <a
          href={data.slug}
          className="text-lg font-medium mb-3 hover:underline"
        >
          <span>{data.title}</span>
        </a>
        <div className="flex justify-start  bottom-0 text-slate-500 text-xs  gap-1 mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className=" text-xs text-white  "> {formatDate}</span>
        </div>
      </div>
    </div>
  );
};

export default BannerItem;
