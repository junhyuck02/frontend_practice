import { useState } from "react";
import { styled } from "styled-components";
import { auth, db, storage } from "../firebase";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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
      const selectedFile = files[0];
      // 1메가 미만의 파일만 업로드 가능하게끔
      const maxSize = 1 * 1024 * 1024;
      if (selectedFile.size > maxSize) {
        alert("파일 크기가 너무 큽니다. 1MB 미만의 파일만 업로드 가능합니다.");
        return;
      }
      setFile(selectedFile);
    }
  };
  // 파일을 선택하면 선택한 파일이 유효한지 확인하고 상태에 저장한다

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    // 현재 로그인된 사용자의 정보를 담고 있는 객체
    if (!user || isLoading || tweet === "" || tweet.length > 180) {
      // 사용자가 없거나 로딩중이거나 글이 비어있거나 글자 수를 초기화하면 바로 종료
      return;
    }
    try {
      setLoading(true);
      const doc = await addDoc(collection(db, "tweets"), {
        // addDoc: firebase에서 제공, 지정된 컬렉션에 새로운 데이터를 추가하고 고유한 ID를 자동으로 생성해주는 함수
        // collection: firebase에서 제공, 데이터를 담는 폴더(컬렉션)를 가리키는 객체를 생성하는 함수
        // db 객체에서 tweets 라는 이름의 컬렉션을 찾아 그 안에 데이터를 넣겠다
        tweet,
        createdAt: Date.now(), // 트윗이 작성된 시간
        username: user.displayName || "Anonymous",
        userId: user.uid,
      });

      if (file) {
        const locationRef = ref(
          storage,
          `tweets/${user.uid}-${user.displayName}/${doc.id}`,
        );
        // firebase 제공, storage 내의 특정 위치를 가리키는 참조 객체를 생성, 파일이 어디에 저장될지 지정하는 주소표지판 느낌
        // 인자: storage 인스턴스, 파일이 저장될 경로
        const result = await uploadBytes(locationRef, file);
        // firebase 제공, 생성된 참조 위치에 실제 파일 데이터를 업로드함
        // 인자: 파일이 저장된 storagereference, 업로드할 파일 데이터
        const url = await getDownloadURL(result.ref);
        // firebase 제공, 업로드된 파일에 접근할 수 있는 공개 URL을 가져옴
        // 인자: .ref로 업로드 결과의 참조객체에 접근
        await updateDoc(doc, {
          photo: url,
        });
        // firebase 제공, 데베에 있는 기존 문서의 내용을 수정
      }
      // 업로드하면 리셋해주기
      setTweet("");
      setFile(null);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      {/* 글자를 입력할 때마다 함수가 호출되어서 tweet의 상태를 실시간으로 반영한다 */}
      <TextArea
        required
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
