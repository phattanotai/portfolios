import { FC } from "react";

import styled from "styled-components";

export type PropsType = {
  continues3D: any;
  goToNormal: any;
  blocker: any;
};

const Blocker: FC<PropsType> = ({ goToNormal, continues3D, blocker }) => {
  return (
    <BlockerDiv style={{ display: blocker ? "block" : "none" }}>
      <div className="instructions">
        <p style={{ fontSize: "36px", marginBottom: "20px" }}>Click to play</p>
        <p>
          Move: WASD
          <br />
          Jump: SPACE
          <br />
          Look: MOUSE
        </p>
      </div>
      <div className="port-link">
        <p className="port-warning">
          ***อาจจะทำให้คอมพิวเตอร์ทำงานหนักและเกิดอาการช้าได้ เนื่องจากใช้ CPU
          และ Memory มาก
        </p>
        <p>คุณต้องการดำเนินการต่อไป กด</p>
        <a onClick={continues3D}>Continues</a>
        <p>or</p>
        <a onClick={goToNormal}>View Normal</a>
      </div>
    </BlockerDiv>
  );
};

export default Blocker;

const BlockerDiv = styled.div`
  width: 80vw;
  height: 100vh;
  background-color: black;
  align-items: center;
  display: grid;

  .instructions {
    display: grid;
    position: fixed;
    left: 48%;
    top: 20%;
  }

  .port-link {
    display: grid;
    position: fixed;

    left: 39%;
    top: 60%;
    text-align: center;

    .port-warning {
      color: brown;
      margin-bottom: 20px;
    }
    a {
      margin: 10px 0 10px 0;
      cursor: pointer;
    }

    a:hover {
      color: darkkhaki;
    }
  }
`;
