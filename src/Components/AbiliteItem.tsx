import { FC, useEffect, useState } from "react";
import styled from "styled-components";

export type PropsType = {
  title: string;
  text: any;
};

const AbiliteItem: FC<PropsType> = ({ title, text }) => {
  const [textArr, setTextArr] = useState<string[]>([]);

  useEffect(() => {
    const myArray = text.split("\n");
    setTextArr(myArray);
  }, [text]);

  return (
    <AbiliteItemStyled>
      <h1>{title}</h1>

      {textArr.map((item: string, index: number) => {
        return <p key={index}>{item}</p>;
      })}
    </AbiliteItemStyled>
  );
};

const AbiliteItemStyled = styled.div`
  padding: 2rem 1rem;
  border-left: 6px solid var(--border-color);
  background-color: var(--background-dark-grey);
  position: relative;
  width: 100%;
  margin-bottom: 10px;
  &:not(:first-child) {
  }
  &::after {
    content: "";
    position: absolute;
    left: 2rem;
    border-width: 0.8rem;
    top: 100%;
    border-style: solid;
    border-color: var(--background-dark-grey) transparent transparent
      var(--background-dark-grey);
  }
  p {
    padding: 2px 50px;
  }
  &:hover {
    border-left: 8px solid var(--primary-color);
    transform: translateX(25px) translateZ(15px);
  }
  @media screen and (max-width: 670px) {
    p {
      padding: 2px 10px;
    }
  }
`;

export default AbiliteItem;
