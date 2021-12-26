import React from "react";

export const VersionInfo: React.FC = () => {
  const info = process.env.REACT_APP_VERSION_INFO || "v1.0.0";
  if (!info) {
    console.info("No version information present at build time.");
    return <></>;
  }
  console.info(`Version: ${info}`);
  return <div>{info}</div>;
};
