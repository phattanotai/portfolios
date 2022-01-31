import { SET_LANG } from "../types/langType";

export function setLang(lang: string) {
  localStorage.setItem("LANG", lang);
  return {
    type: SET_LANG,
    payload: lang,
  };
}

export function setLangAsync(lang: string) {
  return async function (dispatch: any) {
    setTimeout(() => {
      dispatch(setLang(lang));
    }, 1000);
  };
}
