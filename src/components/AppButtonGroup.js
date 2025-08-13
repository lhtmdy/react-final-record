const AppButtonGroup = ({ children, end, center }) => {
  return (
    <div
      className={`flex flex-nowrap gap-[16px]  ${center ? "justify-center" : ""} ${
        end ? "justify-end" : ""
      }`}
    >
      {children}
    </div>
  );
};

export default AppButtonGroup;
