import { FC, useEffect, useState } from "react";
import styled from "styled-components";

export type PropsType = {
  year: any;
  title: any;
  subTitle: any;
  text?: any;
  tech?: any;
};

const ResumeItem: FC<PropsType> = ({
  year,
  title,
  subTitle,
  tech,
  text = "",
}) => {
  const [textArr, setTextArr] = useState<string[]>([]);

  useEffect(() => {
    const myArray = text.split(",");
    setTextArr(myArray);
  }, [text]);

  return (
    <ResumeItemStyled>
      <div className="left-content">
        <p>{year}</p>
      </div>
      <div className="right-content">
        <h5>{title}</h5>
        <h6>{subTitle}</h6>
        {tech ? <p>{tech}</p> : ""}

        {text ? (
          <div>
            <ul>
              {textArr.map((item: string, index: number) => {
                return <li key={index}>{item}</li>;
              })}
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
    </ResumeItemStyled>
  );
};

const ResumeItemStyled = styled.div`
  display: flex;

  &:not(:last-child) {
    padding-bottom: 3rem;
  }

  &:hover {
    .left-content {
      &::before {
        background-color: var(--primary-color);
      }
    }

    .right-content {
      &::before {
        background-color: var(--primary-color);
      }
    }
  }

  .left-content {
    width: 20%;
    padding-left: 20px;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      left: -10px;
      top: 0px;
      height: 15px;
      width: 15px;
      border-radius: 50%;
      border: 2px solid var(--border-color);
      background-color: var(--background-dark-color);
    }

    p {
      display: inline-block;
    }
  }
  .right-content {
    width: 80%;
    padding-left: 5rem;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 15px;
      height: 2px;
      width: 3rem;
      background-color: var(--border-color);
    }
    h5 {
      color: var(--primary-color);
      font-size: 2rem;
      padding-bottom: 0.4rem;
    }
    h6 {
      padding-bottom: 0.6rem;
      font-size: 1.5rem;
    }

    ul {
      padding-top: 10px;
      padding-left: 30px;
      li {
        padding-bottom: 10px;
        ::before {
          content: "";
          position: absolute;
          left: 90px;
          margin-top: 10px;
          height: 10px;
          width: 10px;
          border-radius: 50%;
          border: 2px solid var(--border-color);
          background-color: #18d26e;
        }

        &:hover {
          ::before {
            background-color: red;
          }

          cursor: pointer;
        }
      }
    }
  }

  @media screen and (max-width: 421px) {
    p,
    h5,
    h6 {
      font-size: 80%;
    }

    .left-content {
      width: 52%;
      padding-left: 20px;
      position: initial;
    }

    .right-content {
      width: 128%;
      padding-left: 1rem;
      position: initial;

      h5 {
        font-size: 1.5rem;
      }

      h6 {
        font-size: 1rem;
      }

      p {
        font-size: 90%;
      }

      ul {
        padding-top: 40px;
        padding-left: 0px;
        li {
          ::before {
            left: 105px;
            margin-top: 10px;
            height: 5px;
            width: 5px;
          }
        }
      }
    }
  }
`;
export default ResumeItem;
