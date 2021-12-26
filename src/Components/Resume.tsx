import React, { FC } from "react";
import styled from "styled-components";
import { InnerLayout } from "../styles/Layouts";
import Title from "./Title";
import SmallTitle from "./SmallTitle";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import SchoolIcon from "@material-ui/icons/School";
import ResumeItem from "./ResumeItem";

const Resume: FC = () => {
  const briefcase = <BusinessCenterIcon />;
  const school = <SchoolIcon />;
  return (
    <ResumeStyled>
      <Title title={"Resume"} span={"resume"} />
      <InnerLayout>
        <div className="small-title">
          <SmallTitle icon={briefcase} title={"Working Experience"} />
        </div>
        <div className="resume-content">
          <ResumeItem
            year={"2020 - 2021"}
            title={"Full Stack Developer"}
            subTitle={"OTEN INNOVAT GROUP"}
            text={`
              Nodejs, Express.js, React Native, React, Nextjs, PHP, Mongodb, 
              Mysql, GCP, AWS, Nginx, Docker, Cloudflare, Github, Kubernetes`}
          />
          <ResumeItem
            year={"2020 - 2020"}
            title={"Developer"}
            subTitle={"GWT"}
            text={`
              Nodejs, Express.js, Mongodb, Jquery, Nginx, Nifty, Api Gateway, 
              Line Api, Gitlab, Jira, Cloudflare, Selenium, GCP`}
          />
          <ResumeItem
            year={"2019 - 2020"}
            title={"Programmer"}
            subTitle={"WORLD GPS TRACKER"}
            text={`
              Nodejs, Express.js, Angular, Vuejs, Ionic, Graphql, Apollo, PHP, Slim, 
              Postgresql, Mysql, Sql Server, Mongodb, Redis, Websocket,
              Postgis, Nginx, Google Map, Leaflet Map, Longdo Map, Asana, Bitbucket
              `}
          />
          <ResumeItem
            year={"2018 - 2019"}
            title={"Programmer"}
            subTitle={"Fort Mengraimaharaj Hospital"}
            text={"PHP, Mysql "}
          />
        </div>

        <div className="small-title u-small-title-margin">
          <SmallTitle icon={school} title={"Educational Qualifications"} />
        </div>
        <div className="resume-content ">
          <ResumeItem
            year={"2012 - 2016"}
            title={"Bachelor of Science Program in Computer Science"}
            subTitle={"Suan Sunandha Rajabhat University"}
            text={""}
          />
          <ResumeItem
            year={"2015 - 2017"}
            title={"Pali language "}
            subTitle={"Wat Paknam Bhasicharoen"}
            text={""}
          />
        </div>
      </InnerLayout>
    </ResumeStyled>
  );
};

const ResumeStyled = styled.section`
  .small-title {
    padding-bottom: 3rem;
  }
  .u-small-title-margin {
    margin-top: 4rem;
  }

  .resume-content {
    border-left: 2px solid var(--border-color);
  }
`;
export default Resume;
