import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import loadable from "@loadable/component";

const SplitMe = loadable(() => import("./SplitMe"), {
  // 로딩 중에 다른 UI를 보여주고 싶을 때
  fallback: <div>laoding...</div>,
});

function App() {
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(true);
  };
  // 컴포넌트 미리 불러오기
  const onMouseOver = () => {
    SplitMe.preload();
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={onClick} onMouseOver={onMouseOver}>
          Hello React!
        </p>
        {visible && <SplitMe />}
      </header>
    </div>
  );
}

export default App;
