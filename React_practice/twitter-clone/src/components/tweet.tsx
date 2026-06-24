import { styled } from "styled-components";
import type { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;
const Column = styled.div`
  &:last-child {
    place-self: end;
  }
`;
const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;
const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;
const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;
const DeleteButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const user = auth.currentUser;
  const onDelete = async () => {
    const ok = confirm("Are you sure you want to delete this tweet?");
    if (!ok || user?.uid !== userId) {
      return;
    }
    try {
      await deleteDoc(doc(db, "tweets", id));
      // deleteDoc: firebase 제공, 특정 경로에 있는 문서를 찾아 삭제 (데이터나 글)
      // doc: firebase 제공, 해당 위치 문서를 컴퓨터가 찾아갈수 있게 주소를 만드는 작업
      // 인자: db객체, 컬렉션, 문서의 id
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
        // firebase 제공, 특정 경로에 있는 사진이나 파일을 삭제
      }
    } catch (e) {
      console.log(e);
    } finally {
      // 없음
    }
  };
  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        <Payload>{tweet}</Payload>
        {user?.uid === userId ? (
          <DeleteButton onClick={onDelete}>Delete</DeleteButton>
        ) : null}
        {/* user라는 놈이 있으면 그놈의 uid를 가져오고 없으면 그냥 undefined해라
        user의 id와 트윗의 id가 동일하면 버튼을 보여주고 아니면 숨김 */}
      </Column>
      <Column>{photo ? <Photo src={photo} /> : null}</Column>
    </Wrapper>
  );
}
