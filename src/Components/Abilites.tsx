import { FC } from "react";
import styled from "styled-components";
import { InnerLayout } from "../styles/Layouts";
import Title from "./Title";
import AbiliteItem from "./AbiliteItem";

const Abilites: FC = () => {
  return (
    <ReviewsStyled>
      <Title title={"ABILITIES"} span={"Abilites"} />
      <InnerLayout>
        <div className="Abilites">
          <AbiliteItem
            title="Coding"
            text={` Python, Nodejs, PHP, SQL, C/C++, C#, Java, Javascript,Typescript,
            Flask, Express, Slim, Nestjs,
            Angular, Vue.js, React, Nextjs, React Native, Ionic,Jquery,
            Bootstrap, Material-ui,
            DevExtreme, Rxjs, Redux, Vuex,
            One Signal, Pusher, Selenium, Graphql, Apollo, Threejs,
            Sequelize, TypeORM, Mongoose,
            Google Map, Leaflet Map, Longdo Map,
            Polling, Server Sent Event, Websocket, SocketIO,
            OpenCv, EmguCV,
            Integrate Api e.g. dlt, scg, cpf, Integrate gamebrand e.g.,
             sexy, pg, sbobet send sms email, line api,
             Message Broker e.g. RabbitMQ,
            `}
          />
          <AbiliteItem
            title="Database"
            text={` Postgresql, Mysql, Sql Server, Mongodb, Redis, 
            SQLite,Config Replication Master and Slave Server,Postgis,
             Geo, Stored Procedure, Database trigger`}
          />
          <AbiliteItem
            title="Server"
            text={`Ubuntu, Window Server, Nginx , Load Balance, Cluster Mode,
                      Kubernetes, Docker, Docker Swarm, Kong Api Gateway,
                      Cloudflare, GCP, AWS, Netlify, CircleCI, Grafana, gRPC`}
          />
          <AbiliteItem
            title="General"
            text={`Gitlab, Bitbucket, Github, Jira, Asana`}
          />
          <AbiliteItem
            title="Learning"
            text={`  BigQuery, BigTable, Service Mesh Isito, Elasticsearch,
                      Opensearch, LevelDB, Flutter, Laravel, Spring Boot,
                      ASP.Net Core, FastAPI, Rust, Golang(fiber), Solidity,
                      Wab3, Ethers.js, Truffle, Kotlin, Swift, Unity, Firebase,
                      Facebook API, Robot Framework,cypress, Argo CD, Jenkins,
                      Apache Kafka`}
          />
        </div>
      </InnerLayout>
    </ReviewsStyled>
  );
};

const ReviewsStyled = styled.section`
  .Abilites {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 1.5rem;
    width: 100%;

    h1 {
      font-size: 2rem;
    }
    @media screen and (max-width: 650px) {
      grid-template-columns: repeat(1, 1fr);
      padding: 10px;

      p {
        font-size: 1.2rem;
      }
      h1 {
        font-size: 2rem;
      }
    }
  }
`;

export default Abilites;
