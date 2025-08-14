import AppIcon from "./AppIcon";
const AppModalHeader = ({ className, title,onClose }) => {
  return (
    <div
      className={`px-[24px] py-[16px] border-b border-gray-03 flex items-center justify-between rounded-t ${className}`}
    >
      <h4 className="text-white text-[20px] font-semibold">{title}</h4>
        <button className="text-white text-[24px] font-semibold " onClick={onClose}>
          <AppIcon name="close" />
        </button>
    </div>
  );
};

export default AppModalHeader;
