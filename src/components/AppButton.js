import clsx from "clsx"; // 或使用其他 className 合併工具
import "../components/style/AppButton.css"; // 將 CSS 樣式移到單獨的文件
const AppButton = ({
  children,
  end,
  center,
  secondary,
  danger,
  approved,
  large,
  small,
  onClick,
}) => {
  const buttonClasses = clsx("btn", {
    "btn-secondary": secondary,
    "btn-danger": danger,
    "btn-approved": approved,
    "btn-lg": large,
    "btn-sm": small,
    "mx-auto": center,
    "ml-auto": end,
  });
  return (
    <button type="button" className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export default AppButton;
