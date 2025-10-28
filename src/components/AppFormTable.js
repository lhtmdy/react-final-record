import "../components/style/AppFormTable.css";

const AppFormTable = ({ children, className }) => {
  return <table className={`app-form-table ${className}`}>{children}</table>;
};

export default AppFormTable;
