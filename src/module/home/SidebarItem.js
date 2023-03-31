const SidebarItem = ({ children, title = "" }) => {
  return (
    <div className="   flex flex-col mb-10">
      <span className=" w-full border text-center border-slate-300 py-2 mb-10">
        {title}
      </span>
      {children}
    </div>
  );
};

export default SidebarItem;
