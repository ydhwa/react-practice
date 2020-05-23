/**
 * 액션 타입 정의하기.
 * - 액션 타입은 대문자로 정의
 * - 문자열 내용은 '모듈 이름/액션 이름'과 같은 형태로 작성
 *      - 문자열 안에 모듈 이름을 넣음으로써, 나중에 프로젝트가 커졌을 때 액션의 이름이 충돌되지 않게 해줌
 */
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

/**
 * 액션 생성 함수 만들기.
 * export 키워드를 넣어서 이 함수를 다른 파일에서 불러와 사용할 수 있게 해준다.
 */
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

/**
 * 초기 상태 및 리듀서 함수 만들기
 */
const initialState = {
  number: 0,
};

function counter(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return {
        number: state.number + 1,
      };
    case DECREASE:
      return {
        number: state.number - 1,
      };
    default:
      return state;
  }
}

export default counter;
