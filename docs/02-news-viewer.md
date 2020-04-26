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

## newsapi API 키 발급받기

## 뉴스 뷰어 UI 만들기

## 데이터 연동하기

## 카테고리 기능 구현하기

## 리액트 라우터 적용하기

## usePromise 커스텀 Hook 만들기

## 정리
