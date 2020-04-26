# 외부 API를 연동하여 뉴스 뷰어 만들기

2020-04-26

## axios로 API 호출해서 데이터 받아 오기

axios는 현재 가장 많이 사용되고 있는 자바스크립트 HTTP 클라이언트이다. 이 라이브러리의 특징은 HTTP 요청을 Promise 기반으로 처리한다는 점이다.

```bash
yarn create react-app news-viewer
cd news-viewer
yarn add axios
```

Prettier로 코드 자동 정리 설정 (.prettierrc)

```json
{
  "singleQuote": true,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80
}
```

VS Code에서 파일 자동 불러오기 기능을 잘 활용하고 싶으면 jsconfig.json 파일 생성

```json
{
  "compilerOptions": {
    "target": "es6"
  }
}
```

화살표 함수에 async/await를 적용할 때는 `async () = {}`와 같은 형식으로 적용한다.

## newsapi API 키 발급받기

<https://newsapi.org/register> 에서 API 키 발급받는다.

```
0d306c2dabe8435baa10fa9491cca281
```

발급받은 API 키는 추후 API를 요청할 때 API 주소의 쿼리 파라미터로 넣어서 사용하면 된다.

한국 뉴스 가져오는 API 설명서 - <https://newsapi.org/s/south-korea-news-api>

**사용할 API 주소**

1. 전체 뉴스 불러오기
   ```
   GET https://newsapi.org/v2/top-headlines?country=kr&apiKey={API키}
   ```
2. 특정 카테고리 뉴스 불러오기
   ```
   GET https://newsapi.org/v2/top-headlines?country=kr&category={카테고리}&apiKey={API키}
   ```
   카테고리: business | entertainment | health | science | sports | technology

## 뉴스 뷰어 UI 만들기

<코드 참고 - NewsItem.js, NewsList.js, App.js>

## 데이터 연동하기

컴포넌트가 화면에 보이는 시점에 API 요청 - useEffect 사용. useEffect에 등록되는 함수에 async를 붙이면 안 된다. useEffect에서 반환해야 하는 값은 뒷정리 함수이기 때문이다.

useEffect 내부에서 async/await 사용하고 싶다면 함수 내부에 async 키워드가 붙은 또 다른 함수를 만들어서 사용해 주어야 한다.

loading 상태를 관리하여 API 요청이 대기 중인지도 판별한다. 요청이 대기 중일 때는 loading = true, 요청이 끝나면 loading = false가 되어야 한다.

<코드 참고 - NewsList.js>

데이터를 불러와서 뉴스 데이터 배열을 map 함수를 사용하여 컴포넌트 배열로 변환할 때 신경 써야 할 부분은, map 함수를 사용하기 전에 반드시 !articles를 조회하여 해당 값이 현재 null이 아닌지 검사해야 한다. 이 작업을 하지 않으면, 아직 데이터가 없을 때 null에는 map 함수가 없기 때문에 렌더링 과정에서 오류가 발생한다.

## 카테고리 기능 구현하기

<코드 참고>

NewsList.js 컴포넌트를 클래스형 컴포넌트로 만들게 된다면 componentDidMount와 componentDidUpdate에서 요청을 시작하도록 설정해 주어야 하는데, 함수형 컴포넌트라면 useEffect 한 번으로 컴포넌트가 맨 처음 렌더링될 때, 그리고 category 값이 바뀔 때 요청하도록 설정해줄 수 있다.

## 리액트 라우터 적용하기

```bash
yarn add react-router-dom
```

NewsPage.js

현재 선택된 category 값을 URL 파라미터로 통해 사용할 것이므로 Categories 컴포넌트에서 현재 선택된 카테고리 값을 알려 줄 필요도 없고, onSelect 함수를 따로 전달해 줄 필요도 없다.

App.js

Route 컴포넌트 안에 사용된 path에 /:category?와 같은 형태로 맨 뒤에 물음표 문자가 들어가는데, 이는 category값이 선택적(optional)이라는 의미이다. 즉, 있을 수도, 없을 수도 있다는 뜻이다. category URL 파라미터가 없다면 전체 카테고리를 선택한 것으로 간주한다.

## usePromise 커스텀 Hook 만들기

libs/usePromise.js

프로젝트의 다양한 곳에서 사용될 수 있는 유틸 함수들은 보통 src/lib 디렉터리를 만든 후 그 안에 작성한다.

생성한 usePromise Hook은 Promise의 대기 중, 완료 결과, 실패 결과에 대한 상태를 관리하며, usePromise의 의존 배열 deps를 파라미터로 받아 온다. 파라미터로 받아 온 deps 배열은 usePromise 내부에서 사용한 useEffect의 의존 배열로 설정되는데, 이 배열을 설정하는 부분에서 ESLint 경고가 나타나게 된다.

이 경고를 무시하려면 특정 줄에서만 ESLint 규칙으로 무시하도록 주석을 작성해줘야 한다. 에디터에 초록색 경고 줄이 그어졌을 때 그 위에 커서를 올리면 `빠른 수정...` 이라는 문구가 나타나는데, 이를 클릭하면 자동으로 ESLint 규칙을 비활성화시키는 주석을 입력할 수 있다.

## 정리
