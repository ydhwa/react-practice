# Context API

2020-05-01 ~ 2020-05-05

## 들어가기 전에

Context API는 리액트 프로젝트에서 전역적으로 사용할 데이터가 있을 때 유용한 기능이다. 이를테면 사용자 로그인 정보, 애플리케이션 환경 설정, 테마 등 여러 종류가 있을 것이다. Context API는 리액트 v16.3부터 사용하기 쉽게 많이 개선되었고, 리액트 관련 라이브러리(리덕스, 라우터, styled-components)에서도 많이 사용되고 있다.

## Context API를 사용한 전역 상태 관리 흐름 이해하기

리액트 애플리케이션은 컴포넌트 간에 데이터를 props로 전달하기 때문에 컴포넌트 여기저기서 필요한 데이터가 있을 때는 주로 최상위 컴포넌트인 App에 state에 넣어서 관리한다.

하지만 state에 넣어서 관리할 경우, 거쳐갈 컴포넌트가 많아지게 되면 여러 번 거쳐서 전달해야 하므로 유지 보수성이 낮아진다.

그렇기 때문에 리덕스나 MobX 같은 상태 관리 라이브러리를 사용하여 전역 상태 관리 작업을 더 편하게 처리하기도 하는데, 리액트 v16.3 업데이트 이후에는 Context API가 많이 개선되었으므로 별도의 라이브러리를 사용하지 않아도 전역 상태를 손쉽게 관리할 수 있다.

## Context API 사용법 익히기

```bash
yarn create react-app context-tutorial
```

- Context
  - 새 Context를 만들 때는 createContext 함수를 사용한다. 파라미터에는 해당 Context의 기본 상태를 지정한다.
- Consumer
  - Context의 값을 참조할 때 사용한다.
- Provider
  - Context의 value를 변경할 수 있다.

기존 createContext 함수를 사용할 때는 파라미터로 Context의 기본 상태를 넣어주었으나, 이 기본값은 Provider를 사용하지 않았을 때만 사용된다. Provider를 사용했으나 value를 명시하지 않는다면 이 기본값을 사용하지 않으므로 오류가 발생한다.

## 동적 Context 사용하기

Context의 value에는 무조건 상태 값만 있어야 하는 것이 아니라, 함수를 전달해 줄 수도 있다.

<코드 참고 - color.js, App.js, ColorBox.js, SelectColors.js>

createContext의 기본값을 실제 Provider의 value에 넣는 객체의 형태와 일치시켜주는 것이 좋다. 그렇게 하면 Context 코드를 볼 때 내부 값이 어떻게 구성되어 있는지 파악하기도 쉽고, 실수로 Provider를 사용하지 않았을 때 리액트 애플리케이션에서 에러가 발생하지 않는다.

## Consumer 대신 Hook 또는 static contextType 사용하기

## 정리

## Note

### Function as a child(or Render Props)

src/components/ColorBox.js

컴포넌트의 children이 있어야 할 자리에 일반 JSX 혹은 문자열이 아닌 함수를 전달해주는 패턴을 말한다.

```javascript
import React from "react";

const RenderPropsSample = ({ children }) => {
  return <div>결과: {children(5)}</div>;
};

export default RenderPropsSample;
```

만약 위와 같은 컴포넌트가 있다면 추후 사용할 때 다음과 같이 사용할 수 있다.

```javascript
<RenderPropsSample>{(value) => 2 * value}</RenderPropsSample>
```
