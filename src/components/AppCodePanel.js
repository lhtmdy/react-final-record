const AppCodePanel = ({ children }) => {
  return (
    <pre className="bg-[black] text-white w-full p-4 rounded">
      <code>{children}</code>
    </pre>
  );
};

export default AppCodePanel;
