# 리덕스 라이브러리 이해하기

2020-05-21

## 들어가기 전에

리덕스는 가장 많이 사용하는 리액트 상태 관리 라이브러리이다. 리덕스를 사용하면 컴포넌트의 상태 업데이트 관련 로직을 다른 파일로 분리시켜서 더욱 효율적으로 관리할 수 있다. 또한, 컴포넌트끼리 똑같은 상태를 공유해야 할 때도 여러 컴포넌트를 거치지 않고 손쉽게 상태값을 전달하거나 업데이트 할 수 있다.

리덕스 라이브러리는 전역 상태 관리 시 매우 효과적이나, 유일한 해결책은 아니다.(Context API 사용 등)

단순한 전역 상태 관리의 목적으로는 Context API를 사용하는 것만으로도 충분하나, 리덕스 사용 시 더욱 체계적으로 관리할 수 있으므로 프로젝트의 규모가 클 경우에는 코드의 유지 보수성을 높여주고 작업 효율도 극대화 해주는 리덕스를 사용하는 것이 좋다. 추가로 편리한 개발자 도구를 지원해주고, 미들웨어 기능의 제공으로 비동기 작업을 훨씬 효율적으로 관리할 수 있게 해주기도 한다.

## 개념 미리 정리하기

### 액션

상태에 어떤 변화가 필요하면 액션(action)이 발생한다. 이는 하나의 객체로 표현된다.

```
{
    type: 'TOGGLE_VALUE'
}
```

액션 객체는 type 필드를 반드시 가지고 있어야 한다. 이 값을 액션의 이름이라고 생각하면 된다. 그 외의 값들은 상태 업데이트 시 참고해야 할 값이며, 작성자 마음대로 넣을 수 있다.

```
{
    type: 'ADD_TODO',
    data: {
        id: 1,
        text: '리덕스 배우기'
    }
}
```

### 액션 생성 함수

액션 생성 함수(action creator)는 액션 객체를 만들어주는 함수이다.

```javascript
function addTodo(data) {
  return {
    type: "ADD_TODO",
    data,
  };
}

// 화살표 함수로도 생성 가능
const changeInput = (text) => ({
  type: "CHANGE_INPUT",
  text,
});
```

어떤 변화를 일으켜야 할 때마다 액션 객체를 만들어야 하는데, 매번 액션 객체를 직접 작성하기 번거로울 수 있고 실수가 생길 수도 있다. 이러한 일을 방지하기 위해 이를 함수로 만들어서 관리한다.

### 리듀서

리듀서(reducer)는 변화를 일으키는 함수이다. 액션을 만들어서 발생시키면 리듀서가 현재 상태와 전달받은 액션 객체를 파라미터로 받아 온다. 그리고 그 값을 참고하여 새로운 상태를 만들어서 반환해준다.

```javascript
const initialState = {
  counter: 1,
};
function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        counter: state.counter + 1,
      };
    default:
      return state;
  }
}
```

### 스토어

프로젝트에 리덕스를 적용하기 위해 스토어(store)를 만든다. 하나의 프로젝트는 단 하나의 스토어만 가질 수 있다. 스토어 안에는 현재 애플리케이션 상태와 리듀서가 들어가 있으며, 그 외에도 몇 가지 중요한 내장 함수를 지닌다.

### 디스패치

디스패치(dispatch)는 스토어의 내장 함수 중 하나이다. 디스패치는 '액션을 발생시키는 것'이라고 이해하면 된다. 이 함수는 `dispatch(action)`과 같은 형태로 액션 객체를 파라미터로 넣어서 호출한다.

이 함수가 호출되면 스토어는 리듀서 함수를 실행시켜서 새로운 상태를 만들어 준다.

### 구독

구독(subscribe)도 스토어의 내장 함수 중 하나이다. subscribe 함수 안에 리스너 함수를 파라미터로 넣어서 호출해 주면, 이 리스너 함수의 액션이 디스패치되어 상태가 업데이트될 때마다 호출된다.

```javascript
const listener = () => {
  console.log("상태가 업데이트됨");
};
const unsubscribe = store.subscribe(listener);

unsubscribe(); // 추후 구독을 비활성화할 때 함수를 호출
```

## 리액트 없이 쓰는 리덕스

리덕스는 리액트에 종속되는 라이브러리가 아니다. angular-redux, ember redux, Vue에서도 사용이 가능하나 Vue에서는 리덕스와 유사한 vuex를 주로 사용한다.

리덕스는 바닐라 자바스크립트와 함께 사용할 수 있다. 바닐라 자바스크립트는 라이브러리나 프레임워크 없이 사용하는 순수 자바스크립트 그 자체를 의미한다.

### Parcel로 프로젝트 만들기

```bash
yarn global add parcel-bundler
# yarn global이 잘 설치되지 않으면 npm install -g parcel-bundler로 설치

mkdir vanilla-redux
cd vanilla-redux

# package.json 파일 생성
yarn init -y

# index.html, index.js 생성

# 개발용 서버 실행 (http://localhost:1234)
parcel index.html

# 리덕스 모듈 설치
yarn add redux
```

vanilla-redux 프로젝트 참고

## 리덕스의 세 가지 규칙

## 정리
