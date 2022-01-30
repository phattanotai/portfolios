import { FC, useState } from "react";
import styled from "styled-components";

export type PropsType = {
  filter: any;
  button: any;
};

const Button: FC<PropsType> = ({ filter, button }) => {
  const [activeButtons, setActiveButtons] = useState<string[]>([]);

  const handleActiveClick = (index: number, but: any) => {
    filter(but);
    let newArr = [...activeButtons];
    for (let i in newArr) {
      newArr[i] = "";
    }
    newArr[index] = "active";
    setActiveButtons(newArr);
  };

  return (
    <ButtonsStyled>
      {button.map((but: string, index: number) => {
        return (
          <ButtonStyled
            className={activeButtons[index]}
            key={index}
            onClick={() => handleActiveClick(index, but)}
          >
            {but}
          </ButtonStyled>
        );
      })}
    </ButtonsStyled>
  );
};

const ButtonStyled = styled.button`
  outline: none;
  border: none;
  background-color: var(--background-light-color-2);
  padding: 0.4rem 2rem;
  font-size: inherit;
  color: var(--white-color);
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  margin-bottom: 0.6rem;

  &:active,
  &:focus {
    background-color: var(--primary-color);
  }
  &:hover {
    background-color: var(--primary-color);
  }

  &:not(:last-child) {
    margin-right: 0.6rem;
  }
`;
const ButtonsStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  margin: 2.4rem auto;

  .active {
    background-color: var(--primary-color);
  }
`;
export default Button;
