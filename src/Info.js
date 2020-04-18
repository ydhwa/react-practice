import React, { useState, useEffect } from "react";

const Info = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    console.log("렌더링이 완료되었습니다.");
    console.log({
      name,
      nickname,
    });
  });

  // 마운트될 때만 실행하고 싶을 때
  // 두 번째 파라미터에 빈 배열을 넣어준다.
  useEffect(() => {
    console.log("마운트될 때만 실행됩니다.");
  }, []);

  // 특정 값이 업데이트될 때만 실행하고 싶을 때
  // 두 번째 파라미터로 전달되는 배열 안에 검사하고 싶은 값을 넣어준다.
  // 배열 안에는 useState를 통해 관리하고 있는 상태를 넣어 주어도 되고, props로 전달받은 값을 넣어 주어도 된다.
  useEffect(() => {
    console.log(name);
  }, [name]);

  // 뒷정리하기
  useEffect(() => {
    // 컴포넌트가 나타날 때 발생
    console.log("effect");
    console.log(name);
    return () => {
      // 컴포넌트가 사라질 때 발생
      console.log("cleanup");
      console.log(name);
    };
  });

  useEffect(() => {
    console.log("effect unmount");
    console.log(name);
    return () => {
      console.log("cleanup unmount");
      console.log(name);
    };
  }, []);

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  return (
    <div>
      <div>
        <input value={name} onChange={onChangeName} />
        <input value={nickname} onChange={onChangeNickname} />
      </div>

      <div>
        <div>
          <b>이름: </b>
          {name}
        </div>
        <div>
          <b>닉네임: </b>
          {nickname}
        </div>
      </div>
    </div>
  );
};

export default Info;
