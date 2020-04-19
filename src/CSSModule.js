import React from "react";
import classNames from "classnames/bind";
import styles from "./CSSModule.module.css";

const cx = classNames.bind(styles); // 미리 styles에서 클래스를 받아 오도록 설정하고

const CSSModule = () => {
  return (
    // <div className={styles.wrapper}>

    // CSS Module을 사용한 클래스 이름을 두 개 이상 적용할 때
    // 1. 템플릿 리터럴
    // <div className={`${styles.wrapper} ${styles.inverted}`}>
    // 2. 배열, join 이용
    // <div className={[styles.wrapper, styles.inverted].join(" ")}>

    // classnames 이용
    <div className={cx("wrapper", "inverted")}>
      안녕하세요, 저는 <span className="something">CSS Module!</span>
    </div>
  );
};

export default CSSModule;
