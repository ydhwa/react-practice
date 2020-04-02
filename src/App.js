import React, { Fragment } from 'react';      // 리액트를 불러와서 사용할 수 있게 해줌
import './App.css';

/*
 함수형 컴포넌트 사용.
 프로젝트에서 컴포넌트를 렌더링하면 함수에서 반환하고 있는 내용을 나타낸다.
 코드 안의 내용은 HTML 문법과 유사하나, HTML 코드가 아니며, 문자열 템플릿도 아니다.
 이런 코드를 JSX라고 부른다.
 */
function App() {
  const name = '리액트';
  return (
    <>
      <div className="react">{name}</div>
      <input></input>
    </>
  );
}

export default App;
