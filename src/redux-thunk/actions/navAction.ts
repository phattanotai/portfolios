import { OPEN_NAV } from "../types/navType";

export function openNav(nav: boolean) {
  const checkMobile = window.matchMedia(
    "only screen and (max-width: 1024px)"
  ).matches;
  if (!checkMobile) {
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
