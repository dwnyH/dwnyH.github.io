---
title: You Don't Know JS에 소개된 JSON.stringify()
date: "2019-11-09"
template: "posts"
category: "TIL"
description: "직렬화를 예쁘게 해보자!"
---

'You Don't Know JS' 두 번째 모임에서 진행된 3장 네이티브와 4장 강제변환의 소주제 2장까지는 실제로 코드를 작성하는 데에 유의미한 정보라기 보다는 아무 의심 없이 쓰고 있는 코드에 다시금 의문을 제기하는 내용들로 구성이 되어있었다. 

이를테면 문자열에 `.length`와 같은 메소드를 사용하는 것은 사실 문자열은 원시값으로 메소드가 없지만 자바스크립트가 원시값을 알아서 객체 래퍼로 감싸주기 때문에 String의 메소드들의 빌려쓸 수 있다는 것, 네이티브 생성자로 만든 문자열에(`new String('abc')`) 문자열 빈 값을 더하면(`''`) 결과값의 타입이 `string`이 되는 것은 객체래퍼에 `value of`로 암식적인 언박싱이 일어난다는 것 등 암시적으로 일어나는 자바스크립트 변환에 대한 이야기를 접할 수 있었다.

이런 이야기가 주된 반면, 이 책에서 설명한 `JSON.stringify()`부분은 실제 사용에도 유용해보여서 정리해 두려고 한다. 원래 JSON문자열화 할 대상만 하나의 인자로 받는줄 알았는데, 알고보니 세가지 파라미터 값을 받고 원하는대로 직렬화(다른 저장환경 등에서도 사용할 수 있는 형태로 바꿔주는 것)할 수 있다는 사실을 알게 되었다.

먼저 JSON문자열화 할 대상 이후에 두번째 인자로 배열 또는 함수를 넣을 수 있다. 두번째인자가 배열이면 해당 배열에 들어있는 인자의 프로퍼티만 직렬화를 해주고, 두번째인자가 함수라면 이 함수는 인자로 key와 value값을 받아서 JSON문자열화를 할 때 어떻게 처리할지 정할 수 있다. 

예를 들면,
```javascript
  var a = {
    b: 42,
    c: '42',
    d: [1, 2, 3],
  };

  // 1) 두 번째 인자가 배열인 경우
  JSON.stringify(a, ['b', 'c']);  // "{'b', 42, 'c': '42'}"

  // 2) 두 번째 인자가 함수인 경우
  JSON.stringify(a, function(k, v) {
    if (k !== 'c') {return v;}
  }); // "{'b': 42, 'd': [1,2,3]}"
```

세 번째 인자를 이용해서는 스페이스라고 하여 사람들이 쉽게 읽을 수 있도록 들여쓰기를 할 수 있다. 세 번째 인자로 들여쓰기를 할 빈 공간의 개수를 `숫자`로 지정하거나 `문자열`(ex. '----'와 같은것을 들여쓰기에 삽입하도록)을 지정해서 각 들여쓰기 수준에 사용한다.

```javascript
  var a = {
    b: 42,
    c: '42',
    d: [1, 2, 3],
  };

  JSON.stringify(a, null, 3);

  // "{
  //    "b": 42,
  //    "c": '42',
  //    "d": [
  //      1,
  //      2,
  //      3
  //    ]
  // }"
```

일하면서 실제 코드에서는 JSON.stringify를 사용해본 적이 없는데 사용하게 되면 꼭 써보아야겠다!🤓
