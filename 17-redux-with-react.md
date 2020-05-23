# 리덕스를 사용하여 리액트 애플리케이션 상태 관리하기

2020-05-22

## 들어가기 전에

리액트 애플리케이션에러 리득스 사용 시 store 인스턴스를 직접 사용하기보다 주로 react-redux 라이브러리에서 제공하는 유틸 함수(connect)와 컴포넌트(Provider)를 사용하여 리덕스 관련 작업을 처리한다.

## 작업 환경 설정

```bash
yarn create react-app react-redux-tutorial

cd react-redux-tutorial
yarn add redux react-redux
```

.prettierrc

```json
{
  "singleQuote": true,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80
}
```

## UI 준비하기

리액트 프로젝트에서 리덕스 사용 시 가장 많이 사용하는 패턴은 프레젠테이셔널 컴포넌트와 컨테이너 컴포넌트를 분리하는 것이다.

- 프레젠테이셔널 컴포넌트: 주로 상태 관리가 이루어지지 않고, 그저 props를 받아 와서 화면에 UI를 보여주기만 하는 컴포넌트
- 컨테이너 컴포넌트: 리덕스와 연동되어 있는 컴포넌트로, 리덕스로부터 상태를 받아 오기도 하고 리덕스 스토어에 액션을 디스패치하기도 함

이 패턴은 필수 사항은 아니지만, 이 패턴을 사용하면 코드의 재사용성도 높아지고, 관심사의 분리가 이루어져 UI를 작성할 때 좀 더 집중할 수 있다.

- 프레젠테이셔널 컴포넌트: src/components
- 컨테이너 컴포넌트: src/containers

## 리덕스 관련 코드 작성하기

리덕스 사용 시 액션 타입, 액션 생성 함수, 리듀서 코드를 작성해야 하는데, 이 코드들을 각각 다른 파일에 작성하는 방법도 있고, 기능 별로 묶어서 하나에 작성하는 방법도 있다.

```
actions/
    - counter.js
    - todos.js
constants/
    - ActionTypes.js
reducers/
    - counter.js
    - todos.js
```

위 예시는 actions, constants, reducers라는 세 개의 디렉터리를 만들고 그 안에 기능별로 파일을 하나씩 만드는 방식이다. 코드를 종류에 따라 다른 파일에 작성하여 정리할 수 있어서 편하나, 새로운 액션을 만들 때마다 세 종류의 파일을 모두 수정해야 하기 때문에 불편하기도 하다. 이 방법은 리덕스 공식 문서에서도 사용되므로 가장 기본적이라고 할 수 있다.

```
modules/
    - counter.js
    - todos.js
```

위 예시는 액션 타입, 액션 생성 함수, 리듀서 함수를 기능별로 파일 하나에 몰아서 다 작성하는 방식이다. 이러한 방식을 Ducks 패턴이라고 부르며, 일반적인 구조로 리덕스를 사용하다가 불편함을 느낀 개발자들이 주로 사용한다.

예제에서는 Ducks 패턴을 사용한다.

## 리액트 애플리케이션에 리덕스 적용하기

### 사전 코드 작성

`export`와 `export default`의 차이점

- export
  - 여러 개를 내보낼 수 있다.
  - 불러올 땐 `import { increase, decrease } from './counter'`
- export default
  - 단 한 개만 내보낼 수 있다.
  - 불러올 땐 `import counter from './counter'`

이번 예제에서는 createStore 함수를 사용하여 스토어를 만들 때는 리듀서를 하나만 사용해야 한다. 때문에 기존에 만들었던 리듀서를 하나로 합쳐주는 작업이 필요하다. 이 작업은 리덕스에서 제공하는 `combineReducers`라는 유틸 함수를 사용하면 쉽게 처리할 수 있다.

### 리액트 애플리케이션에 리덕스 적용

`src/index.js`에서 스토어를 만들고 리액트 애플리케이션에 리덕스를 적용하는 작업을 실시한다.

리액트 컴포넌트에서 스토어를 사용할 수 있도록 App 컴포넌트를 react-redux에서 제공하는 **Provider** 컴포넌트로 감싸준다. 이 컴포넌트를 사용할 때는 store를 props로 전달해 주어야 한다.

### Redux DevTools의 설치 및 적용

Redux DevTools는 리덕스 개발자 도구이며, 크롬 확장 프로그램으로 설치하여 사용할 수 있다. (크롬 웹 스토어에서 Redux DevTools 검색 -> 설치)

```javascript
...
const store = createStore(
  rootReducer /* preloadedState, */,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
...
```

리덕스 스토어를 만드는 과정에서 위와 같이 적용해줄 수 있으나, 패키지를 설치하여 적용하면 코드가 훨씬 깔끔해진다.

```
yarn add redux-devtools-extension
```

```javascript
...
import { composeWithDevTools } from "redux-devtools-extension";
...

const store = createState(rootReducer, composeWithDevTools());
...
```

이후 크롬 개발자 도구에서 Redux 탭을 열고 State로 리덕스 스토어 내부 상태를 확인해보자.

## 컨테이너 컴포넌트 만들기

## 리덕스 더 편하게 사용하기

## Hooks를 사용하여 컨테이너 컴포넌트 만들기

## 정리
