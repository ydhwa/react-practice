import React from "react";

const data = {
  ydhwa: {
    name: "양동화",
    description: "주니어 개발자",
  },
  gildong: {
    name: "홍길동",
    description: "아버지를 아버지라 부르지 못하는 사람",
  },
};

const Profile = ({ match }) => {
  const { username } = match.params;
  const profile = data[username];

  if (!profile) {
    return <div>존재하지 않는 사용자입니다!</div>;
  }

  return (
    <div>
      <h3>
        {username}({profile.name})
      </h3>
      <p>{profile.description}</p>
    </div>
  );
};

export default Profile;
