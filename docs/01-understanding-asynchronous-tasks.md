# 비동기 작업의 이해

2020-04-26

## 들어가기 전에

<https://newsapi.org/>에서 제공하는 API를 사용하여 데이터를 받아오고, styled-components를 활용하여 프로젝트를 스타일링해본다.

## 비동기 작업의 이해

웹 애플리케이션을 만들다 보면 처리할 때 시간이 걸리는 작업이 있다. 예를 들어 웹 애플리케이션에서 서버 쪽 데이터가 필요할 때는 Ajax 기법을 사용하여 서버의 API를 호출함으로써 데이터를 수신한다. 이렇게 서버의 API를 사용해야 할 때는 네트워크 송수신 과정에서 시간이 걸리기 때문에 작업이 즉시 처리되는 것이 아니라, 응답을 받을 때까지 기다렸다가 전달받은 응답 데이터를 처리한다. 이 과정에서 해당 작업을 비동기적으로 처리하게 된다.

작업을 동기적으로 처리한다면 요청이 끝날 때까지 기다리는 동안 중지 상태가 되므로 다른 작업을 할 수 없다. 요청이 끝나야 비로소 다음 예정된 작업을 할 수 있는 것이다. 하지만 이를 비동기적으로 처리한다면 웹 어플리케이션이 멈추지 않기 때문에 동시에 여러 가지 요청을 처리할 수 있고, 기다리는 과정에서 다른 함수도 호출할 수 있다.

서버 API를 호출할 때 외에도 작업을 비동기적으로 처리할 때가 있는데, setTimeout 함수를 사용하여 특정 작업을 예약할 때이다.

자바스크립트에서 비동기 작업을 할 때 가장 흔히 사용하는 방법은 콜백 함수를 사용하는 것이다.

### 콜백 함수

함수가 처리된 직후 어떠한 작업을 하고 싶다면 콜백 함수를 활용해서 작업한다.

```javascript
function increase(number, callback) {
  setTimeout(() => {
    const result = number + 10;
    if (callback) {
      callback(result);
    }
  }, 1000);
}

increase(0, (result) => {
  console.log(result);
});
```

콜백 함수를 중첩하여 구현할 수 있다.

```javascript
function increase(number, callback) {
  setTimeout(() => {
    const result = number + 10;
    if (callback) {
      callback(result);
    }
  }, 1000);
}

increase(0, (result) => {
  console.log(result);
  increase(result, (result) => {
    console.log(result);
    increase(result, (result) => {
      console.log(result);
      increase(result, (result) => {
        console.log(result);
        console.log("작업 완료");
      });
    });
  });
});
```

콜백 안에 콜백을 넣어 구현할 수 있는데, 여러 번 중첩되니 가독성이 나빠진다는 단점이 발생한다. 이러한 형태의 코드를 '콜백 지옥'이라고 부른다. 지양하는 것이 좋다.

### Promise

Promise는 콜백 지옥 같은 코드가 형성되지 않게 하는 방안으로 ES6에 도입된 기능이다.

```javascript
function increase(number) {
  const promise = new Promise((resolve, reject) => {
    // resolve는 성공, reject는 실패
    setTimeout(() => {
      const result = number + 10;
      if (result > 50) {
        // 50보다 높으면 에러 발생시키기
        const e = new Error("NumberTooBig");
        return reject(e);
      }
      resolve(result); // number 값에 +10 후 성공 처리
    }, 1000);
  });
  return promise;
}

increase(0)
  .then((number) => {
    // Promise에서 resolve된 값은 .then을 통해 받아올 수 있음
    console.log(number);
    return increase(number);
  })
  .then((number) => {
    // 또, then으로 처리 가능
    console.log(number);
    return increase(number);
  })
  .then((number) => {
    console.log(number);
    return increase(number);
  })
  .then((number) => {
    console.log(number);
    return increase(number);
  })
  .then((number) => {
    console.log(number);
    return increase(number);
  })
  .catch((e) => {
    // 도중에 에러가 발생한다면 .catch를 통해 알 수 있음
    console.log(e);
  });
```

여러 작업을 연달아 처리한다고 해서 함수를 여러 번 감싸는 것이 아니라 .then을 사용하여 그 다음 작업을 설정하기 때문에 콜백 지옥이 형성되지 않는다.

### async/await

async/await는 Promise를 더욱 쉽게 사용할 수 있도록 해 주는 ES2017(ES8) 문법이다. 이 문법을 사용하려면 함수의 앞부분에 async 키워드를 추가하고, 해당 함수 내부에서 Promise의 앞부분에 await 키워드를 사용한다. 이렇게 하면 Promise가 끝날 때까지 기다리고, 결과 값을 특정 변수에 담을 수 있다.

```javascript
function increase(number) {
  const promise = new Promise((resolve, reject) => {
    // resolve: 성공 / reject: 실패
    setTimeout(() => {
      const result = number + 10;
      if (result > 50) {
        // 50보다 높으면 에러 발생
        const e = new Error("NumberTooBig");
        return reject(e);
      }
      resolve(result); // number 값에 +10 후 성공 처리
    }, 1000);
  });
  return promise;
}

async function runTasks() {
  try {
    // try/catch 구문을 이용하여 에러 처리
    let result = await increase(0);
    console.log(result);
    let result = await increase(result);
    console.log(result);
    let result = await increase(result);
    console.log(result);
    let result = await increase(result);
    console.log(result);
    let result = await increase(result);
    console.log(result);
    let result = await increase(result);
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}
```
