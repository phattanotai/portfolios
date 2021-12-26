import React, { Component } from "react";
import { LangProvider } from "./LangContext";

const providers = [LangProvider];

const ContextProvider = (...components: React.FC[]): React.FC =>
  components.reduce(
    (AccumComponents, Component) =>
      ({ children }: any): JSX.Element =>
        (
          <AccumComponents>
            <Component>{children}</Component>
          </AccumComponents>
        ),
    ({ children }: any) => <>{children} </>
  );

export default ContextProvider(...providers);
