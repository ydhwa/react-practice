// 스토어 생성
import { createStore } from "redux";

// DOM 레퍼런스
const divToggle = document.querySelector(".toggle");
const counter = document.querySelector("h1");
const btnIncrease = document.querySelector("#increase");
const btnDecrease = document.querySelector("#decrease");

// 액션 타입과 액션 생성 함수 정의
// 액션 이름은 문자열 형태로, 주로 대문자로 작성하며, 고유해야 한다.
const TOGGLE_SWITCH = "TOGGLE_SWITCH";
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

// 액션 이름을 사용하여 액션 객체를 만드는 액션 생성 함수 작성
// 액션 객체는 type 값을 반드시 가지고 있어야 한다.
const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
const increase = (difference) => ({ type: INCREASE, difference });
const decrease = () => ({ type: DECREASE });

// 초기값 설정
const initialState = {
  toggle: false,
  counter: 0,
};

// 리듀서 함수 정의
// 변화를 일으키는 함수로, 파라미터로는 state와 action 값을 받아온다.
// state가 undefined일 때는 initialState를 기본값으로 사용
/*
리듀서에서는 상태의 불변성을 유지하면서 데이터에 변화를 일으켜 주어야 한다.
이 작업을 할 때 spread 연산자(...)를 사용하면 편하다.
단, 객체의 구조가 복잡해지면 spread 연산자로 불변성을 관리하며 업데이트 하는 것이 번거로워질 수 있고 가독성도 나빠지므로
리덕스의 상태는 최대한 깊지 않은 구조로 진행하는 것이 좋다.
객체의 구조가 복잡해지거나 배열도 함께 다루는 경우 immer 라이브러리를 사용하면 조금 더 쉽게 리듀서 작성이 가능하다.
*/
function reducer(state = initialState, action) {
  // action.type에 따라 다른 작업을 처리함
  switch (action.type) {
    case TOGGLE_SWITCH:
      return {
        ...state, // 불변성 유지
        toggle: !state.toggle,
      };
    case INCREASE:
      return {
        ...state,
        counter: state.counter + action.difference,
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
}

// 스토어 생성
const store = createStore(reducer);

// render 함수 만들기
// 이 함수는 상태가 업데이트 될 때마다 호출되며, 리액트의 render 함수와 다르게
// 이미 html을 사용하여 만들어진 UI 속성을 상태에 따라 변경해준다.
const render = () => {
  const state = store.getState(); // 현재 상태를 불러온다.
  // 토글 처리
  if (state.toggle) {
    divToggle.classList.add("active");
  } else {
    divToggle.classList.remove("active");
  }
  // 카운터 처리
  counter.innerText = state.counter;
};

render();
// 상태가 업데이트될 때마다 render 함수 호출
store.subscribe(render);

// 구독하기
// 스토어의 상태가 바뀔 때마다 render 함수가 호출되도록 해준다.
// subscribe 함수의 파라미터로는 함수 형태의 값을 전달해준다.
/*
추후 리액트 프로젝트에서 리덕스 사용 시 subscribe 함수를 직접 사용하지는 않는다.
컴포넌트에서 리덕스 상태를 조회하는 과정에서 react-redux라는 라이브러리가 이 작업을 대신해주기 때문이다.
*/
const listener = () => {
  console.log("상태가 업데이트됨");
};
const unsubscribe = store.subscribe(listener);

unsubscribe(); // 추후 구독을 비활성화 할 때 함수를 호출

// 액션 발생시키기
divToggle.onclick = () => {
  store.dispatch(toggleSwitch());
};
btnIncrease.onclick = () => {
  store.dispatch(increase(1));
};
btnDecrease.onclick = () => {
  store.dispatch(decrease());
};
