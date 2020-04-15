import React from "react";
import PropTypes from "prop-types";

const MyComponent = ({ name, favoriteNumber, children }) => {
  return (
    <div>
      안녕하세요, 제 이름은 {name}입니다.
      <br />
      children 값은 {children}입니다.
      <br />
      제가 좋아하는 숫자는 {favoriteNumber}입니다.
    </div>
  );
};

MyComponent.defaultProps = {
  name: "기본 이름"
};

MyComponent.propTypes = {
  name: PropTypes.string,
  // isRequired: 필수값 지정(없으면 콘솔에 오류메시지 나옴)
  favoriteNumber: PropTypes.number.isRequired
};

// 다른 파일에서 이 파일을 import할 때, 위에서 선언한 MyComponent 클래스를 불러오도록 설정한다.
export default MyComponent;
