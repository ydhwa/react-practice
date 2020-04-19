# 프로젝트 준비

## 프로젝트 생성 및 라이브러리 설치

```bash
yarn create react-app todo-app
cd todo-app
yarn add node-sass classnames react-icons
```

- node-sass: Sass 사용 위해 설치
- classnames: 조건부 스타일링 편하게 하기 위해 설치
- react-icons: 리액트에서 제공하는 다양한 아이콘 사용하기 위해 설치
  - <https://react-icons.netlify.app/#/>

## Prettier 설정

프로젝트 최상위 디렉터리에 .prettierrc 파일 생성

```
{
  "singleQuote": true,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80
}
```

## index.css 수정

```css
body {
  margin: 0;
  padding: 0;
  background: #e9ecef;
}
```

## App 컴포넌트 초기화

<코드 참고>
