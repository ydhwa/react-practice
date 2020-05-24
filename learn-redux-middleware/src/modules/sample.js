import { handleActions } from "redux-actions";
import * as api from "../lib/api";
import createRequestThunk from "../lib/createRequestThunk";

// 액션 타입 선언
// 한 요청당 세 개 만들어야 함

const GET_POST = "sample/GET_POST";
const GET_POST_SUCCESS = "sample/GET_POST_SUCCESS";

const GET_USERS = "sample/GET_USERS";
const GET_USERS_SUCCESS = "sample/GET_USERS_SUCCESS";

// thunk 함수 생성
// thunk 함수 내부에서는 시작할 때, 성공했을 때, 실패했을 떄 다른 액션을 디스패치함

export const getPost = createRequestThunk(GET_POST, api.getPost);
export const getUsers = createRequestThunk(GET_USERS, api.getUsers);

// 초기 상태 선언
// 요청의 로딩 중 상태는 loading이라는 객체에서 관리
const initialState = {
  post: null,
  users: null,
};

const sample = handleActions(
  /**
   * 실패했을 때의 케이스를 관리하고 싶다면
   * 컴포넌트에서 try/catch 구문을 사용하여 확인하거나
   * _FAILURE가 붙은 액션을 리듀서에서 처리해준다.
   */
  {
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      post: action.payload,
    }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      users: action.payload,
    }),
  },
  initialState
);

export default sample;
