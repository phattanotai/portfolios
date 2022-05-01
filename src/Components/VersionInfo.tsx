const VersionInfo = ({ versionRef }: any) => {
  const info = process.env.REACT_APP_VERSION_INFO || "v1.0.0";
  return (
    <div className="versionApp" ref={versionRef}>
      {info}
    </div>
  );
};

export default VersionInfo;
