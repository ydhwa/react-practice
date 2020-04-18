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

## useMemo

## useCallback

## useRef

## 커스텀 Hooks 사용하기

## 다른 Hooks

## 정리
