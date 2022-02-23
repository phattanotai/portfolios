export const OPEN_INFO = "OPEN_INFO";

export type stateType = {
  info: boolean;
};

export type actionType = {
  type: string;
  payload: stateType;
};
