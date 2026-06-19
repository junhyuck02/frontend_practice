import { useState } from "react";
import { styled } from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const TextArea = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    "Open Sans",
    "Helvetica Neue",
    sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;
const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: #1d9bf0;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #1d9bf0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;
const AttachFileInput = styled.input`
  display: none;
`;
const SubmitBtn = styled.input`
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

export default function PostTweetForm() {
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);
  // file이라는 애는 파일객체 File이거나 null이다 라고 타입을 지정, 초기 값은 null로 설정해주겠다
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };
  // 텍스트를 입력할 때마다 호출되어 입력된 내용을 tweet 상태에 저장

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    // files라는 속성을 구조 분해 할당으로 꺼낸다
    if (files && files.length === 1) {
      // files가 존재하고 딱 하나의 파일이 있다면
      setFile(files[0]);
    }
  };
  // 파일을 선택하면 선택한 파일이 유효한지 확인하고 상태에 저장한다

  return (
    <Form>
      {/* 글자를 입력할 때마다 함수가 호출되어서 tweet의 상태를 실시간으로 반영한다 */}
      <TextArea
        rows={5}
        maxLength={180}
        onChange={onChange}
        value={tweet}
        placeholder="What is happening?!"
      />

      {/* 버튼과 input을 연결해서 버튼을 클릭하면 파일 선택 창이 열린다 */}
      <AttachFileButton htmlFor="file">
        {file ? "Photo added ✅" : "Add photo"}
      </AttachFileButton>

      {/* 파일을 선택하면 선택된 파일의 상태에 저장한다 */}
      <AttachFileInput
        onChange={onFileChange}
        type="file"
        id="file"
        accept="image/*"
      />

      {/* 제출 버튼 */}
      <SubmitBtn
        type="submit"
        value={isLoading ? "Posting..." : "Post Tweet"}
      />
    </Form>
  );
}
