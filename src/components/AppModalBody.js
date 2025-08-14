const AppModalBody = ({ children }) => {
  return (
    <div>
      <div className="p-[24px] overflow-y-auto  max-h-[calc(90vh-132px)]">
        {children}
      </div>
    </div>
  );
};

export default AppModalBody;