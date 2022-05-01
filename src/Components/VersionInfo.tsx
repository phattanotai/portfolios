const VersionInfo = ({ versionRef }: any) => {
  console.log(process.env.APP_VERSION_INFO);
  const info = process.env.APP_VERSION_INFO || "v1.0.0";
  return (
    <div className="versionApp" ref={versionRef}>
      {info}
    </div>
  );
};

export default VersionInfo;
