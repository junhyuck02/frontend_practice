import { styled } from "styled-components";
// styled-components는 css 파일을 따로 만들지 않고 js 안에 css를 직접 작성하게 해줌
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`; //  이런 스타일의 div 컴포넌트를 만들어냄
const Text = styled.span`
  font-size: 24px;
`; // 이런 스타일의 span 컴포넌트를 만들어냄
export default function LoadingScreen() {
  return (
    <Wrapper>
      {" "}
      <Text>Loading...</Text>{" "}
    </Wrapper>
  );
}

// ``(백틱)은 언제쓰냐?
// 1. 변수를 문자열에 넣고 싶을 때
// 2. 여러 줄로 된 긴 문장을 쓸 때
// 3. styled-components를 쓸 때
