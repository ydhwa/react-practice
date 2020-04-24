# immer를 사용하여 더 쉽게 불변성 유지하기

2020-04-25

## 들어가기 전에

전개 연산자와 배열의 내장 함수를 사용하면 간단하게 배열 혹은 객체를 복사하고 새로운 값을 덮어쓸 수 있다. 하지만 객체의 구조가 엄청나게 깊어지면 불변성을 유지하면서 이를 업데이트하는 것이 매우 힘들어진다.

이럴 때 immer 라이브러리를 사용하면, 구조가 복잡한 객체도 매우 쉽고 짧은 코드를 사용하여 불변성을 유지하면서 업데이트해줄 수 있다.

## immer를 설치하고 사용법 알아보기

### 프로젝트 준비

```bash
yarn create react-app immer-tutorial
cd immer-tutorial
yarn add immer
```

### immer를 사용하지 않고 불변성 유지

<코드 참고 - App.js>

### immer 사용법

```javascript
import produce from "immer";
const nextState = produce(originalState, (draft) => {
  // 바꾸고 싶은 값 바꾸기
  draft.somewhere.deep.inside = 5;
});
```

produce 함수는 두 가지 파라미터를 받는다.

- 첫 번째 파라미터: 수정하고 싶은 상태
- 두 번째 파라미터: 상태를 어떻게 업데이트할지 정의하는 함수

두 번째 파라미터로 전달되는 함수 내부에서 원하는 값을 변경하면, produce 함수가 불변성 유지를 대신해 주면서 새로운 상태를 생성해 준다.

이 라이브러리의 핵심은 **'불변성에 신경쓰지 않는 것처럼 코드를 작성하되 불변성 관리는 제대로 해주는 것'** 이다.

```javascript
import produce from "immer";

const originalState = [
  {
    id: 1,
    todo: "전개 연산자의 배열 내장 함수로 불변성 유지하기",
    checked: true,
  },
  {
    id: 2,
    todo: "immer로 불변성 유지하기",
    checked: false,
  },
];

const nextState = produce(originalState, (draft) => {
  // id가 2인 항목의 checked 값을 true로 설정
  const todo = draft.find((t) => t.id === 2); // id로 항목 찾기
  todo.checked = true; // 혹은 draft[1].checked true;

  // 배열에 새로운 데이터 추가
  draft.push({
    id: 3,
    todo: "일정 관리 앱에 immer 적용하기",
    checked: false,
  });

  // id = 1인 항목을 제거하기
  draft.splice(
    draft.findIndex((t) => t.id === 1),
    1
  );
});
```

### App 컴포넌트에 immer 적용하기

<코드 참고 - App.js>

immer를 사용하여 컴포넌트 상태를 작성할 때는 객체 안에 있는 값을 직접 수정하거나, 배열에 직접적인 변화를 일으키는 push, splice 등의 함수를 사용해도 무방하다. 때문에 불변성 유지에 익숙하지 않아도 자바스크립트에 익숙하다면 컴포넌트 상태에 원하는 변화를 쉽게 반영시킬 수 있다.

immer를 사용한다고 해서 무조건 코드가 간결해지지는 않는다. 즉 immer는 불변성을 유지하는 코드가 복잡할 때만 사용해도 충분하다.

## 정리
