import { OPEN_INFO } from "../types/mainType";

export function openInfo(info: boolean) {
  return {
    type: OPEN_INFO,
    payload: { info },
  };
}

export function openInfoAsync(info: boolean) {
  return async function (dispatch: any) {
    setTimeout(() => {
      dispatch(openInfo(info));
    }, 3000);
  };
}
