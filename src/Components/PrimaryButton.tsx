import styled from "styled-components";

export type PropsType = {
  title: string;
  onClick: any;
};

const PrimaryButton = ({ title, onClick = "", style = {} }: any) => {
  if (onClick) {
    return (
      <PrimaryButtonStyled onClick={onClick} style={style}>
        {title}
      </PrimaryButtonStyled>
    );
  } else {
    return <PrimaryButtonStyled style={style}>{title}</PrimaryButtonStyled>;
  }
};

const PrimaryButtonStyled = styled.a`
  background-color: var(--primary-color);
  padding: 0.8rem 2.5rem;
  color: white;
  cursor: pointer;
  display: inline-block;
  font-size: inherit;
  text-transform: uppercase;
  position: relative;
  transition: all 0.4s ease-in-out;
  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0.2rem;
    transition: all 0.4s ease-in-out;
    left: 0;
    bottom: 0;
    opacity: 0.7;
  }
  &:hover::after {
    width: 100%;
    background-color: var(--white-color);
  }
`;
export default PrimaryButton;
