import React, { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { languages } from "../data/langusges";
import styled from "styled-components";

import { setLang } from "../redux-thunk/actions/langAction";

const LanguageSwitcherSelector: FC = () => {
  const langType = useSelector((state: any) => state.lang);
  const dispatch = useDispatch();

  const onChange = (language: string) => {
    dispatch(setLang(language));
  };
  const options = languages.map((language) => {
    if (language.code != langType) {
      return (
        <li
          onClick={() => {
            onChange(language.code);
          }}
          key={language.code}
        >
          <div className={language.code}></div>
        </li>
      );
    }
  });

  return (
    <LangStyled>
      <div className="lang">
        <div className={langType}></div>
        <ul className="dropdown">{options}</ul>
      </div>
    </LangStyled>
  );
};

const LangStyled = styled.div`
  .lang {
    display: flex;
    flex-direction: column;
    align-items: center;

    .dropdown {
      position: relative;
      left: 0;
      display: none;
      margin: 0;
      padding: 0;
      list-style: none;
    }
  }

  .lang:hover {
    .dropdown {
      display: flex;
      flex-direction: column;
      align-items: center;
      li {
        margin: 0;
        display: block;
        padding: 5px 0;
        div:hover {
          width: 32px;
          height: 32px;
        }
      }
    }
  }

  .EN {
    background-image: url("../assets/images/lang/en.png");
    width: 32px;
    height: 32px;
  }

  .TH {
    background-image: url("../assets/images/lang/th.png");
    width: 32px;
    height: 32px;
  }
`;
export default LanguageSwitcherSelector;
