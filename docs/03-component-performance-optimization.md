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

## 불변성의 중요성

## TodoList 컴포넌트 최적화하기

## react-virtualized를 사용한 렌더링 최적화

## 정리

## Note
개발 서버를 통해 보이는 리액트 어플리케이션은 실제 프로덕션에서 구동될 때보다 처리 속도가 느리다. 실제 프로덕션 모드에서는 에러 시스템 및 Timing이 비활성화되어 처리 속도가 훨씬 빠르다.