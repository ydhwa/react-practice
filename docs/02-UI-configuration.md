# UI 구성하기

## 생성할 컴포넌트

- TodoTemplate: 화면을 가운데에 정렬시켜주며, 앱 타이틀(일정 관리)을 보여준다. children으로 내부 JSX를 props로 받아 와서 렌더링 해준다.
- TodoInsert: 새로운 항목을 입력하고 추가할 수 있는 컴포넌트. state를 통해 인풋의 상태를 관리한다.
- TodoListItem: 각 할 일 항목에 대한 정보를 보여주는 컴포넌트. todo 객체를 props로 받아 와서 상태에 따라 다른 스타일의 UI를 보여준다.
- TodoList: todos 배열을 props로 받아온 후, 이를 배열 내장 함수 map을 사용해서 여러 개의 TodoListItem 컴포넌트로 변환하여 보여 준다.

## TodoTemplate 만들기

<코드 참고>

### 자동 완성 설정

프로젝트 최상위 디렉터리에 jsconfig.json 파일 생성 후 파일을 열어서 `ctrl + space` 눌러 자동완성

```json
{
  "compilerOptions": {
    "target": "es6"
  }
}
```

위 파일을 저장하고 나면 불러오려는 컴포넌트 파일이 열려 있지 않아도 자동 완성을 통해 컴포넌트를 불러와서 사용할 수 있다.

### display 속성 flex

<http://flexboxfroggy.com/#ko>

## TodoInsert 만들기

<코드 참고>

<https://react-icons.netlify.app/#/icons/md> 에서 사용하고 싶은 아이콘을 고르고 import 구문을 사용하여 불러온 후 컴포넌트처럼 사용하면 된다.

```javascript
import { 아이콘명 } from 'react-icons/md';
```

## TodoListItem과 TodoList 만들기

<코드 참고>
