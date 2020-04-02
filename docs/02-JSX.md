# 2. JSX
2020-04-02

## 코드 이해하기
리액트 프로젝트 생성 시 `node_modules`라는 디렉터리도 함께 생성되는데, `node_modules` 디렉터리에 react 모듈이 설치된다. 이로 인해 `import` 구문으로 리액트를 불러와서 사용할 수 있게 된다.

모듈을 불러와서 사용하는 것은 브라우저가 아닌 환경에서 자바스크립트를 실행할 수 있게 해주는 환경인 `Node.js`에서 지원하는 기능이다. 이 기능을 브라우저에서 사용하기 위해 번들러(bundler)를 사용한다.

번들러의 종류에는 웹팩, Parcel, browserify라는 도구들이 있으며, 리액트에서는 주로 편의성과 확장성이 뛰어난 웹팩을 사용한다. 번들러 도구를 사용하면 모듈을 불러왔을 때 불러온 모듈을 모두 합쳐서 하나의 파일을 생성해주고, 최적화 과정에서 여러 개의 파일로 분리될 수도 있다.

웹팩을 사용하면 SVG 파일과 CSS 파일도 불러와서 사용할 수 있는데, 이렇게 파일을 불러오는 것은 웹팩의 로더(loader)라는 기능이 담당한다. 로더에는 css-loader, file-loader, babel-loader 등 여러 가지 종류가 있다.


## JSX(JavaScript XML)란?
<https://www.reactenlightenment.com/react-jsx/5.1.html>

> JSX is an XML/HTML-like syntax used by React that extends ECMAScript so that XML/HTML-like text can co-exist with JavaScript/React code. The syntax is intended to be used by preprocessors (i.e., transpilers like Babel) to transform HTML-like text found in JavaScript files into standard JavaScript objects that a JavaScript engine will parse.

JSX 코드는 브라우저에서 실행되기 전에 코드가 번들링되는 과정에서 바벨을 사용하여 일반 자바스크립트 형태의 코드로 변환된다.

_JSX_
```javascript
function App() {
    return (
        <div>
            Hello <b>react</b>
        </div>
    );
}
```

_변환된 코드_
```javascript
function App() {
    return React.createElement("div", null, "Hello ", React.createElement("b", null, "react"));
}
```

JSX는 리액트로 프로젝트를 개발할 때 사용되므로 공식적인 자바스크립트 문법은 아니다.


## JSX의 장점
- 보기 쉽고 익숙하다.
- 활용도가 높다.


## JSX 문법
### 감싸인 요소
컴포넌트에 여러 요소가 있다면 반드시 부모 요소 하나로 감싸야 한다.

Virtual DOM에서 컴포넌트 변화를 감지해낼 때 효율적으로 비교할 수 있도록 컴포넌트 내부는 하나의 DOM 트리 구조로 이루어져야 한다는 규칙이 있기 때문이다.

`div` 요소를 사용하고 싶지 않을 경우, 리액트 v16 이상부터 도입된 `Fragment`라는 기능을 사용하면 된다. `Fragment`는 `<>...</>`의 형태로도 표현할 수 있다.

### 자바스크립트 표현
JSX 안에서는 자바스크립트 표현식을 사용할 수 있다. 표현식 작성을 위해서는 코드를 `{ }`로 감싸면 된다.

### If문 대신 조건부 연산자(삼항 연산자)
JSX 내부의 자바스크립트 표현식에서 **`if`문을 사용할 수 없다.** 조건에 따라 다른 내용을 렌더링해야 하면,
1. JSX 밖에서 `if`문을 사용하여 사전에 값을 설정하거나,
2. `{ }` 안에 조건부 연산자를 사용한다.

```javascript
import React, { Fragment } from 'react';

function App() {
  const name = '리액트'
  return (
    <>
      {name === '리액트' ? (
        <h1>리액트입니다.</h1>
      ) : (
        <h1>리액트가 아닙니다.</h1>
      )}
    </>
  );
}

export default App;
```

### AND 연산자(&&)를 사용한 조건부 렌더링
`null`을 렌더링하면 아무것도 보여주지 않는다.

_조건부 연산자를 통한 렌더링_
```javascript
import React, { Fragment } from 'react';

function App() {
  const name = '리액트'
  return (
    <>
      {name === '리액트' ? <h1>리액트입니다.</h1> : null}
    </>
  );
}

export default App;
```

_&& 연산자 사용_
```javascript
import React, { Fragment } from 'react';

function App() {
  const name = '리액트'
  return (
    <>
      {name === '리액트' && <h1>리액트입니다.</h1>}
    </>
  );
}

export default App;
```
리액트에서 `false`로 렌더링할 때는 `null`과 마찬가지로 아무것도 나타나지 않지만, `falsy`한 값인 0은 예외적으로 화면에 나타난다.

### `undefined` 렌더링하지 않기
리액트 컴포넌트에서는 함수에서 `undefined`만 반환하여 렌더링하는 상황을 만들면 안된다(오류발생). 어떤 값이 `undefined`일 수 있다면, OR(||) 연산자를 통해 `undefined`일 때 사용할 값을 지정하여 오류를 방지할 수 있다.
```javascript
import React, { Fragment } from 'react';

function App() {
  const name = undefined;
  return name || '값이 undefined 입니다!';
}

export default App;
```

반면 JSX 내부에서 `undefined`를 렌더링하는 것은 괜찮다.
```javascript
import React, { Fragment } from 'react';

function App() {
  const name = undefined;
  return <>{name}</>;
}

export default App;
```


### 인라인 스타일링
리액트에서 DOM 요소에 스타일을 적용할 때는 문자열 형태로 넣는 것이 아니라 객체 형태로 넣어 주어야 한다. 스타일 이름 중 `background-color`처럼 `-`가 포함되는 이름은 `backgroundColor`처럼 낙타 표기법으로 작성해야 한다.

```javascript
import React, { Fragment } from 'react';

function App() {
  const name = '리액트';
  const style = {
    backgroundColor: 'black',
    color: 'aqua',
    fontSize: '48px',
    fontWeight: 'bold',
    padding: 16
  }
  return <div style={style}>{name}</div>;
}

export default App;
```

```javascript
import React, { Fragment } from 'react';

function App() {
  const name = '리액트';
  return <div style={
    {
      backgroundColor: 'black',
      color: 'aqua',
      fontSize: '48px',
      fontWeight: 'bold',
      padding: 16
    }
  }>{name}</div>;
}

export default App;
```


### `class` 대신 `className`
_App.css_
```css
.react {
  background: aqua;
  color: black;
  font-size: 48px;
  font-weight: bold;
  padding: 16px;
}
```
_App.js_
```javascript
import React, { Fragment } from 'react';
import './App.css';

function App() {
  const name = '리액트';
  return <div className="react">{name}</div>;
}

export default App;
```
요즘 버전에서는 `class`를 사용해도 오류가 발생하지 않으나, 브라우저 개발자 도구의 console 창으로 확인해보면 경고를 남기고 `className`으로 변환된다.


### 꼭 닫아야 하는 태그
`input` HTML 요소는 태그를 닫지 않아도 정상동작하나, JSX에서는 태그를 닫지 않으면 오류가 발생한다.


### 주석
- JSX 내부: `{/* ... */}`
- 시작 태그 내부: `// ...`


## Note
### ES6의 `const`와 `let`
- `const`: ES6 문법에서 새로 도입되었으며, 한 번 지정하고 나면 변경이 불가능한 상수를 선언할 때 사용하는 키워드이다.
- `let`: 동적인 값을 담을 수 있는 변수를 선언할 때 사용하는 키워드이다.

ES6 이전에는 값을 담는 데 `var` 키워드를 사용했는데, `var` 키워드의 scope는 블록단위가 아닌 함수 단위이다. 이런 문제를 해결하기 위해 `let`과 `const`가 등장하였다.

`let`과 `const`는 함수 단위가 아닌 블록 단위이다. 사용 시 **같은 블록 내부에서 중복 선언이 불가능함**에 주의해야 한다.

ES6 문법에서 `var`를 사용할 일은 없고, 변수 사용 시 `let`을, 상수 사용 시 `const`를 사용한다. 즉 기본적으로 `const`를 사용하되, 해당 값을 변경해야 할 때는 `let`을 사용하면 된다.

### JSX는 언제 괄호로 감싸야 하는가?
본인의 자유이나 주로 JSX를 여러 줄로 작성할 때 괄호로 감싸고, 한 줄로 표현할 수 있는 JSX는 감싸지 않는다.