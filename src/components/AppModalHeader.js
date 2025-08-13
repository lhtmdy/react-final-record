const AppModalHeader = ({ children ,className }) => {
  return (
      <div className={`px-[24px] py-[16px] border-b border-gray-03 flex items-center justify-between rounded-t ${className}` }>{children}</div>
  );
};

export default AppModalHeader;
