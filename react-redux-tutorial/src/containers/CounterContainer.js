import React, { useCallback } from 'react';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease } from '../modules/counter';

// const CounterContainer = ({ number, increase, decrease }) => {
//   return (
//     <Counter number={number} onIncrease={increase} onDecrease={decrease} />
//   );
// };

// const mapStateToProps = (state) => ({
//   number: state.counter.number,
// });

// const mapDispatchToProps = (dispatch) => ({
//   increase: () => {
//     dispatch(increase());
//   },
//   decrease: () => {
//     dispatch(decrease());
//   },
// });

/**
 * mapStateToProps와 mapDispatchProps에서 반환하는 객체 내부의 값들은
 * 컴포넌트의 props로 전달된다.
 * mapStateToProps는 state를 파라미터로 받아 오며, 이 값은 현재 스토어가 지니고 있는 상태를 가리킨다.
 * mapDispatchToProps는 store의 내장 함수 dispatch를 파라미터로 받아 온다.
 */
// export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);

/**
 * connect 함수 내부에 mapStateToProps와 mapDispatchToProps를 익명 함수 형태로 선언해도 된다.
 */
// export default connect(
//   (state) => ({
//     number: state.counter.number,
//   }),
//   (dispatch) => ({
//     increase: () => dispatch(increase()),
//     decrease: () => dispatch(decrease()),
//   }),
// )(CounterContainer);

// export default connect(
//   (state) => ({
//     number: state.counter.number,
//   }),
//   //   (dispatch) =>
//   //     bindActionCreators(
//   //       {
//   //         increase,
//   //         decrease,
//   //       },
//   //       dispatch,
//   //     ),

//   /**
//    * 두 번째 파라미터를 아예 객체 형태로 넣어 주면
//    * connect 함수가 내부적으로 bindActionCreators 작업을 대신해 준다.
//    */
//   {
//     increase,
//     decrease,
//   },
// )(CounterContainer);

const CounterContainer = () => {
  const number = useSelector((state) => state.counter.number);
  const dispatch = useDispatch();
  const onIncrease = useCallback(() => dispatch(increase(), [dispatch]));
  const onDecrease = useCallback(() => dispatch(decrease(), [dispatch]));
  return (
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
};

export default CounterContainer;
