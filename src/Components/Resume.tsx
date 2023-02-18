import { FC } from "react";
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
        <div className="small-title ">
          <SmallTitle icon={school} title={"EDUCATION"} />
        </div>
        <div className="resume-content ">
          <ResumeItem
            year={"2012 - 2016"}
            title={"Bachelor of Science Program in Computer Science"}
            subTitle={"Suan Sunandha Rajabhat University"}
            tech={`
              Nodejs, PHP, Angularjs, Java, C/C++, VB, Mysql,
              C#`}
          />
          <ResumeItem
            year={"2009 - 2017"}
            title={"Pali language "}
            subTitle={"Wat Paknam Bhasicharoen"}
          />
        </div>

        <div className="small-title u-small-title-margin">
          <SmallTitle icon={briefcase} title={"WORK EXPERIENCE"} />
        </div>
        <div className="resume-content">
          <ResumeItem
            year={"2022 - Present"}
            title={"Frontend Developer"}
            subTitle={"DRIVEN DIGTAL"}
            tech={`
              Nuxtjs, Vuejs`}
            text={`
              Created frontend pages according to requirements, 
              Integrate third party app`}
          />
          <ResumeItem
            year={"2022 - Present"}
            title={"Software Developer"}
            subTitle={"FREELANCE"}
            tech={`
              Nodejs, Expressjs, Angular, Vuejs, React, Nextjs, Nestjs, Mongodb, 
              Mysql, Postresql, GCP, AWS, Nginx, Docker, Docker Swarm, Cloudflare, 
              Github, Bitbucket, Gather Town`}
            text={`
              Created frontend to requirements, 
              Created backend api for the frontend,
              Designed and created database,
              Write technical documents,
              Integrate third party app`}
          />
          <ResumeItem
            year={"2022 - 2022"}
            title={"Software Developer"}
            subTitle={"BE YOUR TECH"}
            tech={`
              Nodejs, Nestjs, Nextjs, Mysql, Bitbucket, Gather Town`}
            text={`
              Created frontend to requirements, 
              Created backend api for the frontend,
              Designed and created database,
              Write technical documents,
              Integrate third party app`}
          />
          <ResumeItem
            year={"2020 - 2022"}
            title={"Full Stack Developer"}
            subTitle={"OTEN INNOVATION"}
            tech={`
              Nodejs, Nestjs, React Native, React, Nextjs, Mongodb,  
              Mysql, GCP, AWS, Nginx, Docker, Cloudflare, Github, Kubernetes, Name.com`}
            text={`
              Created frontend to requirements, 
              Created mobile appliaction,
              Created backend api for the frontend,
              Designed and created database,
              Deployed on a cloud server,
              Connected cloud server to registered domain name,
              Write technical documents,
              Integrate third party app,
              Maintained the system until everything went satisfied`}
          />
          <ResumeItem
            year={"2020 - 2020"}
            title={"Full Stack Developer"}
            subTitle={"GAMES WAVE TECHNOLOGY"}
            tech={`
              Nodejs, Expressjs Mongodb,  
               GCP, Nginx, Cloudflare, Gitlab, Bitbucket`}
            text={`
              Created frontend to requirements, 
              Created mobile appliaction,
              Created backend api for the frontend,
              Designed and created database,
              Deployed on a cloud server,
              Connected cloud server to registered domain name,
              Write technical documents,
              Integrate third party app,
              Maintained the system until everything went satisfied`}
          />
          <ResumeItem
            year={"2019 - 2020"}
            title={"Programmer"}
            subTitle={"WORLD GPS TRACKER"}
            tech={`
              Nodejs, Expressjs, Angular, Vuejs, Ionic, Graphql, Apollo, PHP, Slim, 
              Postgresql, Mysql, Sql Server, Mongodb, Redis, Websocket, MDVR,
              Postgis, Nginx, Google Map, Leaflet Map, Longdo Map, Asana, Bitbucket
              `}
            text={`
            Website: http://wgtgps.net,
            Created frontend to requirements, 
            Created mobile appliaction,
            Created backend api for the frontend and the mobile appliaction,
            Designed and created database,
            Design software system architecture,
            Write technical documents,
            Integrate third party app e.g. dlt scg cpf MDVR`}
          />
          <ResumeItem
            year={"2017 – 2019"}
            title={""}
            subTitle={"Fort Mengraimaharaj Hospital"}
            tech={"PHP, Mysql, Nodejs"}
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

  @media screen and (max-width: 700px) {
    h3 {
      font-size: 1.5rem;
    }
  }
`;
export default Resume;
