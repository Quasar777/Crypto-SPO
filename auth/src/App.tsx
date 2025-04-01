import React, { useContext, useEffect, useState } from "react";
import { Context } from ".";
import { observer } from "mobx-react-lite";
import "./styles/App.css"
import WelcomePage from "./pages/WelcomePage";

function App() {
  return (
    <div>
      <WelcomePage />
    </div>
  );
}

export default observer(App);
