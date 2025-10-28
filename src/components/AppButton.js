import clsx from "clsx"; 
import "../components/style/AppButton.css"; 
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
  className,
  icon,
  type="button"
}) => {
  const buttonClasses = clsx(`btn ${className}`, {
    "btn-secondary": secondary,
    "btn-danger": danger,
    "btn-approved": approved,
    "btn-lg": large,
    "btn-sm": small,
    "mx-auto": center,
    "ml-auto": end,
    "btn-icon":icon
  });
  return (
    <button type={type} className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export default AppButton;
