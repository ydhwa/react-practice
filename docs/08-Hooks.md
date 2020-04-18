# 8. Hooks

2020-04-18 ~ 2020-04-19

## 들어가기 전에

Hooks는 리액트 v16.8에 새로 도입된 기능으로 함수형 컴포넌트에서도 상태 관리를 할 수 있는 useState, 렌더링 직후 작업을 설정하는 useEffect 등의 기능을 제공하여 기존의 함수형 컴포넌트에서 할 수 없었던 다양한 작업을 할 수 있게 해준다.

```bash
yarn create react-app hooks-tutorial

yarn start
```

## useState

가장 기본적인 Hook으로, 함수형 컴포넌트에서도 가변적인 상태를 지닐 수 있게 해준다. 함수형 컴포넌트에서 상태를 관리해야 한다면 이 Hook을 사용하면 된다.

```javascript
const [value, setValue] = useState(0);
```

useState 함수의 파라미터에는 상태의 기본값을 넣어준다.

이 함수가 호출되면 배열을 반환하는데, 첫 번째 원소는 상태 값, 두 번째 원소는 상태를 설정하는 함수이다. 이 함수에 파라미터를 넣어서 호출하면 전달받은 파라미터로 값이 바뀌고 컴포넌트가 정상적으로 리렌더링 된다.

하나의 useState 함수는 하나의 상태 값만 관리할 수 있다. 컴포넌트에서 관리해야 할 상태가 여러 개라면 useState를 여러 번 사용하면 된다.

## useEffect

- 리액트 컴포넌트가 렌더링될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook
- 클래스형 컴포넌트의 componentDidMount + componentDidUpdate 형태

useEffect는 기본적으로 렌더링되고 난 직추마다 실행되며, 두 번째 파라미터 배열에 무엇을 넣는지에 따라 실행되는 조건이 달라진다.

컴포넌트가 언마운트되기 전이나 업데이트되기 직전에 어떠한 작업을 수행하고 싶다면 useEffect에서 뒷정리(cleanup) 함수를 반환해 주어야 한다.

뒷정리 함수는 렌더링될 때마다 호출되며, 호출 시 업데이트되기 적전의 값을 보여준다. 언마운트될 때만 뒷정리 함수를 호출하고 싶다면 useEffect 함수의 두 번째 파라미터에 비어 있는 배열을 넣으면 된다.

## useReducer

useState보다 더 다양한 컴포넌트 상황에 따라 다양한 상태를 다른 값으로 업데이트 해주고 싶을 때 사용하는 Hook.

Reducer는 현재 상태, 그리고 업데이트를 위해 필요한 정보를 담은 액션(action) 값을 전달받아 새로운 상태를 반환하는 함수이다. 리듀서 함수에서 새로운 상태를 만들 때는 반드시 불변성을 지켜줘야 한다.

```javascript
function reducer(state, action) {
  return {...}; // 불변성을 지키면서 업데이트한 새로운 상태를 반환한다.
}
```

액션 값은 주로 다음과 같은 형태로 이루어져 있다.

```javascript
{
  type: "INCREMENT",
  // 다른 값들이 필요하다면 추가로 들어감
}
```

리덕스에서 사용하는 액션 객체와 다르게 useReducer에서 사용하는 액션 객체는 반드시 type 필드를 가지고 있을 필요가 없다. 심지어 객체가 아니라 문자열이나 숫자여도 상관없다.

useReducer의 첫 번째 파라미터에는 리듀서 함수를 넣고, 두 번째 파라미터에는 해당 리듀서의 기본값을 넣어준다. 이 Hook 사용 시 state값과 dispatch 함수를 받아오는데, 여기서 state는 현재 가리키고 있는 상태이고, dispatch는 액션을 발생시키는 함수이다. dispatch(action)과 같은 형태로, 함수 안에 파라미터로 액션 값을 넣어 주면 리듀서 함수가 호출되는 구조이다.

useReducer 사용 시 가장 큰 장점은 컴포넌트 업데이트 로직을 컴포넌트 바깥으로 빼낼 수 있다는 점이다.

인풋이 여러개일 경우 useState는 여러 번 사용해야 하지만, useReducer를 사용하면 클래스형 컴포넌트에서 input 태그에 name 값을 할당하고 e.target.name을 참조하여 setState를 해준 것과 유사한 방식으로 작업을 처리할 수 있다.

useReducer에서의 액션은 어떤 값도 사용이 가능하다.

## useMemo

useMemo를 사용하면 함수형 컴포넌트 내부에서 발생하는 연산을 최적화할 수 있다.

렌더링하는 과정에서 특정 값이 바뀌었을 때만 연산을 실행하고, 원하는 값이 바뀌지 않았다면 이전에 연산했던 결과를 다시 사용하는 방식이다.

## useCallback

useMemo와 비슷한 함수로, 주로 렌더링 성능을 최적화해야 하는 상황에서 사용한다. 이 Hook을 사용하면 이벤트 핸들러 함수를 필요할 때만 생성할 수 있다.

이벤트 핸들러 함수는 컴포넌트가 리렌더링될 때마다 함수들이 새로 생성되는데, 대부분의 경우에는 문제가 없으나 컴포넌트 렌더링이 자주 발생하거나 렌더링해야 할 컴포넌트의 개수가 많아지면 최적화를 해줄 필요가 있다.

첫 번째 파라미터에는 생성하고 싶은 함수를 넣고, 두 번째 파라미터에는 배열을 넣는다. 이 배열에는 어떤 값이 바뀌었을 떄 함수를 새로 생성해야 하는지 명시한다.

함수 내부에서 상태 값에 의존해야 할 때는 그 값을 반드시 두 번째 파라미터 안에 포함시켜 주어야 한다.

useCallback은 결국 useMemo로 함수를 반환하는 상황에서 더 편하게 사용할 수 있는 Hook이다. 숫자, 문자열, 객체처럼 일반 값을 사용하려면 useMemo를 사용하고, 함수를 재사용하려면 useCallback을 사용하자.

```javascript
useCallback(() => {
  console.log("hello world!");
}, []);

useMemo(() => {
  const fn = () => {
    console.log("hello world!");
  };
  return fn;
}, []);
```

## useRef

useRef Hook은 함수형 컴포넌트에서 ref를 쉽게 사용할 수 있도록 해준다.

useRef를 사용하여 ref를 설정하면 useRef를 통해 만든 객체 안의 current 값이 실제 엘리먼트를 가리킨다.

컴포넌트 로컬 변수를 사용해야 할 때도 useRef를 활용할 수 있다. 여기서 로컬 변수란 렌더링과 상관 없이 바뀔 수 있는 값을 의미한다.

클래스형 컴포넌트 예시

```javascript
import React, { Component } from "react";

class MyComponent extends Component {
  id = 1;
  setId = (n) => {
    this.id = n;
  };
  printId = () => {
    console.log(this.id);
  };
  render() {
    return <div>MyComponent</div>;
  }
}

export default MyComponent;
```

함수형 컴포넌트 예시

```javascript
import React, { useRef } from "react";

const RefSample = () => {
  const id = useRef(1);
  const setId = (n) => {
    id.current = n;
  };
  const printId = () => {
    console.log(id.current);
  };
  return <div>refSample</div>;
};
```

ref 값이 바뀌어도 컴포넌트가 렌더링되지 않는다는 점에는 주의해야 한다. 렌더링과 관련되지 않은 값을 관리할 때만 이러한 방식으로 코드를 작성해야 한다.

## 커스텀 Hooks 사용하기

## 다른 Hooks

## 정리
