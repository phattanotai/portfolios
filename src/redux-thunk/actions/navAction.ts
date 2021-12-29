import { OPEN_NAV } from "../types/navType";

export function openNav(nav: boolean) {
  const checkScreen = window.matchMedia(
    "only screen and (max-width: 1200px)"
  ).matches;
  if (!checkScreen) {
    return {
      type: OPEN_NAV,
      payload: false,
    };
  } else {
    return {
      type: OPEN_NAV,
      payload: nav,
    };
  }
}

export function openNavAsync(nav: boolean) {
  return async function (dispatch: any) {
    setTimeout(() => {
      dispatch(openNav(nav));
    }, 3000);
  };
}
