# 5. ref: DOM에 이름 달기
2020-04-17 ~ 2020-04-18

## 들어가기 전에
일반 HTML 요소에서 DOM 요소에 이름을 달 때는 id를 사용한다.

리액트 프로젝트 내부에서 ref(reference) 개념을 사용하면 DOM에 이름을 달 수 있다.

### Note
리액트 컴포넌트 안에서도 id를 사용할 수는 있으나, 특수한 경우가 아니면 사용을 권장하지 않는다. DOM의 id는 기본적으로 unique해야 하는데, 컴포넌트 재사용을 하게 되면 이 규칙이 어긋날 수 있기 때문이다.

반면 ref는 전역적으로 작동하지 않고 컴포넌트 내부에서만 작동하므로 이러한 문제가 발생하지 않는다.

다른 라이브러리나 프레임워크와 함께 id를 사용해야 하는 경우, 컴포넌트를 만들 때마다 id 뒷부분에 추가 텍스트를 붙여서 중복 id가 발생하는 것을 방지해야 한다.

## ref는 어떤 상황에서 사용해야 할까?
> DOM을 꼭 직접적으로 건드려야 할 때

### DOM을 꼭 사용해야 하는 상황
- 특정 input에 포커스 주기
- 스크롤 박스 조작하기
- Canvas 요소에 그림 그리기 등

이런 경우에 ref를 사용한다.

## ref 사용
### 1. 콜백 함수를 통한 ref 설정
ref를 달고자 하는 요소에 ref라는 콜백 함수를 props로 전달해준다.

이 콜백 함수는 ref 값을 파라미터로 전달받아, 함수 내부에서 파라미터로 받은 ref를 컴포넌트의 멤버 변수로 설정해 준다.

```javascript
<input ref={(ref) => {this.input=ref}}/>
```

위 경우, this.input은 input 요소의 DOM을 가리킨다. ref 이름은 DOM 타입과 관계 없이 자유롭게 지정할 수 있다.

### 2. createRef를 통한 ref 설정
리액트에 내장되어 있는 createRef 함수를 사용한다. 리액트 v1.6.3부터 도입되었고, 이전 버전에서는 작동하지 않는다.

```javascript
import React, {Component} from 'react';

class RefSample extends Component {
    input = React.createRef();

    handleFocus = () => {
        this.input.current.focus();
    }

    render() {
        return (
            <div>
                <input ref={this.input} />
            </div>
        );
    }
}

export default RefSample;
```

1. 컴포넌트 내부에서 멤버 변수로 React.createRef()를 담아주고,
2. 해당 멤버 변수를 ref를 달고자 하는 요소에 ref props로 넣어주면 ref 설정이 완료된다.

설정 후 ref를 설정해 준 DOM에 접근하려면 this.input.current를 조회한다.

## 컴포넌트에 ref 달기
주로 컴포넌트 내부에 있는 DOM을 컴포넌트 외부에서 사용하는 용도로 컴포넌트에 ref를 단다. DOM에 ref를 다는 방법과 동일하다.

### 사용법
```javascript
<MyComponent
    ref={(ref) => {this.myComponent=ref}}
/>
```

위와 같이 사용하면 MyComponent 내부의 메서드 및 멤버 변수에도 접근할 수 있으며, 내부의 ref에도 접근할 수 있다.(ex) myComponent.handleClick, myComponent.input, ...)

### Note
DOM 노드가 가지고 있는 값
- scrollTop: 세로 스크롤바 위치
- scrollHeight: 스크롤이 있는 박스 안의 div 높이
- clientHeight: 스크롤이 있는 박스의 높이

맨 밑으로: scrollHeight - clientHeight

## 정리
컴포넌트 내부에서 DOM에 직접 접근해야 할 때는 ref를 사용한다. 먼저 ref를 사용하지 않고도 원하는 기능을 구현할 수 있는지 반드시 고려한 후에 활용해야 한다.

서로 다른 컴포넌트끼리 데이터 교류 시 ref를 사용하는 것은 잘못된 사용이다. 불가능한 것은 아니지만 리액트 사상에 어긋나는 설계이며, 앱 규모가 커질 경우 유지 보수가 힘들어진다.

컴포넌트끼리 데이터를 교류할 때는 언제나 데이터를 부모<->자식 흐름으로 교류해야 한다. 나중에 리덕스 혹은 Context API를 사용하여 효율적으로 교류할 수 있다.

함수형 컴포넌트에서는 useRef라는 Hook 함수를 사용하여 ref를 사용할 수 있다. 사용법은 React.createRef와 유사하다.