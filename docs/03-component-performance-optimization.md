# 컴포넌트 성능 최적화
2020-04-24

## 많은 데이터 렌더링하기
<코드 참고 - App.js>

## 크롬 개발자 도구를 통한 성능 모니터링
[크롬 개발자 도구] - [Performance]

녹화 버튼 누른 후 의도하는 동작을 하고, 변화가 반영되면 Stop 버튼을 누른다.

성능 분석 결과가 나오면 성능 분석 결과에 나타난 Timings를 열어 각 시간대에 컴포넌트의 어떤 작업이 처리되었는지 확인할 수 있다.

## 느려지는 원인 분석
컴포넌트는 다음과 같은 상황에서 리렌더링이 발생한다.

1. 자신이 전달받은 props가 변경될 때
2. 자신의 state가 바뀔 때
3. 부모 컴포넌트가 리렌더링될 때
4. forceUpdate 함수가 실행될 때

할 일 1 체크한 경우
1. App 컴포넌트의 state 변경
2. App 컴포넌트 리렌더링
3. App의 자식 컴포넌트인 TodoList 컴포넌트 리렌더링
4. TodoList 컴포넌트의 자식 컴포넌트의 TodoListItem들이 모두 리렌더링

컴포넌트 리렌더링 성능 최적화 해주는 작업 필요.(리렌더링이 불필요할 때는 리렌더링 방지 필요)

## React.memo를 사용하여 컴포넌트 성능 최적화
shouldComponentUpdate 라이프사이클 이용하면 되나, 함수형 컴포넌트에서는 라이프사이클 메서드 사용할 수 없다. -> React.memo 함수 사용(컴포넌트의 props가 바뀌지 않았다면 리렌더링하지 않도록 설정하여 함수형 컴포넌트의 리렌더링 성능을 최적화해줄 수 있다.)

<코드 참고 - TodoListItem.js>

## onToggle, onRemove 함수가 바뀌지 않게 하기
React.memo만으로는 충분하지 않다. 이유는 현재 프로젝트에서 todos. 배열이 업데이트되면 onRemove와 onToggle 함수도 새롭게 바뀌기 때문이다. onRemove와 onToggle 함수는 배열 상태를 업데이트하는 과정에서 최신 상태의 todos를 참조하므로 todos 배열이 바뀔 때마다 함수가 새로 만들어진다.

함수가 계속 만들어지는 상황을 방지하려면?
1. useState 의 함수형 업데이트 기능 사용
2. useReducer 사용

### useState의 함수형 업데이트
setter 함수를 사용할 때 새로운 상태를 파라미터로 넣는 대신, 상태 업데이트를 어떻게 할지 정의해 주는 업데이트 함수를 넣어주는 방법이다.

```javascript
const [number, setNumber] = useState(0)
// prevNumbers는 현재 number 값을 가리킨다.
const onInstance = useCallback(
    () => setNumber(prevNumber => prevNumber + 1),
    [],
)
```

<코드 참고 - App.js>

setTodos 사용 시 그 안에 `todos => `를 넣어주었다.

### useReducer 사용하기
<코드 참고 - App.js>

useReducer 사용 시 원래 두 번째 파라미터에 초기 상태를 넣어줘야 하는데, 여기서는 두 번째에 undefined, 세 번째에 초기 상태를 만들어주는 함수를 넣었다. 이렇게 되면 컴포넌트가 맨 처음 렌더링될 때만 초기 상태 만들어주는 함수가 호출된다.

useReducer 사용하는 방법은 기존 코드를 많이 고쳐야 하는 단점이 있으나, 상태를 업데이트하는 로직을 모아 컴포넌트 바깥에 둘 수 있다는 장점이 있다.

## 불변성의 중요성
리액트 컴포넌트에서 상태를 업데이트할 때 불변성을 지키는 것은 매우 중요하다.

기존 데이터를 수정 시 직접 수정하지 않고, 새로운 배열을 만든 다음에 새로운 객체를 만들어서 필요한 부분을 교체해 주는 방식으로 구현하게 되면, 업데이트가 필요한 곳에서는 아예 새로운 배열 혹은 새로운 객체를 만들어 내기 때문에 React.memo를 사용했을 때 props가 바뀌었는지 혹은 바뀌지 않았는지를 알아내서 리렌더링 성능을 최적화해 줄 수 있다.

이렇게 기존의 값을 직접 수정하지 않으면서 새로운 값을 만들어내는 것을 '불변성을 지킨다'라고 한다.

```javascript
const array = [1, 2, 3, 4, 5];

const nextArrayBad = array;     // 배열 복사 X. 똑같은 배열 가리킴
nextArrayBad[0] = 100;
console.log(array === nextArrayBad);    // 완전히 같은 배열이므로 true

const nextArrayGood = [...array];   // 배열 내부의 값을 모두 복사
nextArrayGood[0] = 100;
console.log(array === nextArrayGood);   // 다른 배열이기 때문에 false

const object = {
    foo: 'bar',
    value: 1
};

const nextObjectBad = object;   // 객체 복사 X. 똑같은 객체 가리킴
nextObjectBad.value = nextObjectBad.value + 1;
console.log(object === nextObjectBad);  // 같은 객체이므로 true

const nextObjectGood = {
    ...object,  // 기존에 있던 내용을 모두 복사해서 넣음
    value: object.value + 1 // 새로운 값을 덮어 씀
};
console.log(object === nextObjectGood); // 다른 객체이기 때문에 false
```

불변성이 지켜지지 않으면 객체 내부의 값이 새로워져도 바뀐 것을 감지하지 못한다. 그러면 React.memo에서 서로 비교하여 최적화하는 것이 불가능해진다.

전개 연산자(... 문법)를 사용하여 객체나 배열 내부의 값을 복사할 때는 얕은 복사(shallow copy)를 하게 된다. 즉, 내부의 값이 완전히 새로 복사되는 것이 아니라 가장 바깥쪽에 있는 값만 복사된다.

> 내부의 값이 객체 혹은 배열이라면 내부의 값 또한 따로 복사해주어야 한다.

```javascript
const todos = [{id: 1, checked: true}, {id: 2, checked: true}];
const nextTodos = [...todos];

nextTodos[0].checked = false;
console.log(todos[0] === nextTodos[0]); // 아직까지는 똑같은 객체를 가리키고 있기 때문에 true

nextTodos[0] = {
    ...nextTodos[0],
    checked: false
};
console.log(todos[0] === nextTodos[0]); // 새로운 객체를 할당해 주었기에 false
```

만약 객체 안에 있는 객체라면 불변성을 지키면서 새 값을 할당해야 하므로 다음과 같이 해줘야 한다.

```javascript
const nextComplexObject = {
    ...complexObject,
    objectInside: {
        ...complexObject.objectInside,
        enabled: false
    }
};
console.log(complexObject === nextComplexObject);   // false
console.log(complexObject.objectInside === nextComplexObject.objectInside); // false
```

배열 혹은 객체의 구조가 정말 복잡해진다면 이렇게 불변성을 유지하면서 업데이트하는 것도 까다로워진다. 이렇게 복잡한 상황일 경우 immer라는 라이브러리의 도움을 받으면 편하게 작업할 수 있다.

## TodoList 컴포넌트 최적화하기
리스트와 관련된 컴포넌트 최적화할 때는 리스트 내부에서 사용하는 컴포넌트도 최적화해야 하고, 리스트로 사용되는 컴포넌트 자체도 최적화해주는 것이 좋다.

<코드 참고 - TodoList.js>

추가한 최적화 코드는 현재 프로젝트 성능에 전혀 영향을 주지 않는다. 이유는 TodoList 컴포넌트의 부모 컴포넌트인 App 컴포넌트가 리렌더링되는 유일한 이유가 todos 배열이기 때문이다. 즉, 지금 TodoList 컴포넌트는 불필요한 리렌더링이 발생하지 않는다.

하지만 App 컴포넌트에 다른 state가 추가되어 해당 값들이 업데이트될 때는 TodoList 컴포넌트가 불필요한 리렌더링을 할 수도 있으므로, React.memo를 사용해서 미리 최적화 해준 것이다.

**리스트 관련 컴포넌트 작성 시 리스트 아이템과 리스트, 이 두 가지 컴포넌트를 최적화해주는 것을  잊지 말자.** 내부 데이터가 많지 않거나 업데이트가 자주 발생하지 않으면 최적화 작업을 반드시 해줄 필요는 없다.

## react-virtualized를 사용한 렌더링 최적화

## 정리

## Note
개발 서버를 통해 보이는 리액트 어플리케이션은 실제 프로덕션에서 구동될 때보다 처리 속도가 느리다. 실제 프로덕션 모드에서는 에러 시스템 및 Timing이 비활성화되어 처리 속도가 훨씬 빠르다.