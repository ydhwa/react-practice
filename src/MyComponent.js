import React, { Component } from "react";
import PropTypes from "prop-types";

class MyComponent extends Component {
  // class 내부에서 defaultProps와 propTypes를 지정할 수 있다.
  static defaultProps = {
    name: "기본 이름"
  };
  static propTypes = {
    name: PropTypes.string,
    favoriteNumber: PropTypes.number.isRequired
  };

  render() {
    const { name, favoriteNumber, children } = this.props; // 비구조화 할당
    return (
      <div>
        안녕하세요, 제 이름은 {name}입니다.
        <br />
        children 값은 {children}입니다.
        <br />
        제가 좋아하는 숫자는 {favoriteNumber}입니다.
      </div>
    );
  }
}

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
