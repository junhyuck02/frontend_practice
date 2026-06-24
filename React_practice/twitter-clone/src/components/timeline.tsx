import {
  collection,
  // getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet.tsx";
import type { Unsubscribe } from "firebase/auth";

export interface ITweet {
  id: string;
  photo?: string;
  // photo는 필수가 아니다
  tweet: string;
  userId: string;
  username: string;
  createdAt: number;
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

export default function Timeline() {
  const [tweets, setTweet] = useState<ITweet[]>([]);
  // 이건 트윗 배열이고, 기본값은 빈 배열이다

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    // Unsubscribe 타입: 인자도 없고, 반환값도 없는 함수라는 타입
    // 그럼 왜 씀?: 나중에 이 변수에 어떤 형태의 함수가 들어올 거야 라고 미리 알려주는 용도
    // 처음에는 null 값인데 나중에 해제 함수가 들어옴
    const fetchTweets = async () => {
      // 데이터 호출 함수
      const tweetsQuery = query(
        // firebase 제공 함수 query, db에서 내가 원하는 데이터만 골라내기 위한 조건을 만드는 함수
        collection(db, "tweets"),
        orderBy("createdAt", "desc"),
        // firebase 제공 함수, 특정 필드 값을 기준으로 정렬
        // 작성시간을 기준으로 내림차순으로 정렬
        limit(25),
        // 문서의 개수를 제한
      );

      /* const snapshot = await getDocs(tweetsQuery);
      // firebase 제공
      // 지금 이 순간 DB에 뭐가 있지? 하고 query로 필터링,정렬한 조건을 전달해서 내가 원하는 데이터만 골라서 가져온다
      const tweets = snapshot.docs.map((doc) => {
        // .docs = 우리가 진짜로 보고 싶은 데이터(문서들)만 쏙 뽑아놓은 목록
        const { tweet, createdAt, userId, username, photo } = doc.data();
        return {
          tweet,
          createdAt,
          userId,
          username,
          photo,
          id: doc.id,
        };
      });
      // 가져온 데이터들(spanshot.docs)을 순회하며 각 문서의 데이터와 문서 고유 ID를 포함한 새로운 객체 배열을 만든다 */

      unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
        // firebase 제공, 서버와 연결하여 실시간으로 데이터를 받아오는 함수
        // firebase db를 계속 감시하는 리스너를 등록하고 동시에 해제 함수 반환까지 한다
        // getDocs와 달리 새로고침을 하지 않아도 변화가 생길때마다 자동으로 전달해줌
        // onSnapshot이 해제 함수를 반환 -> unsubscribe에 저장
        const tweets = snapshot.docs.map((doc) => {
          const { tweet, createdAt, userId, username, photo } = doc.data();
          return {
            tweet,
            createdAt,
            userId,
            username,
            photo,
            id: doc.id,
          };
        });
        setTweet(tweets);
      });
    };
    fetchTweets();
    // Clean up 함수 패턴
    // 메모리 누수와 버그를 방지하는 핵심 패턴
    return () => {
      unsubscribe && unsubscribe();
      // null값이 아니고 값이 들어있을때만 뒤의 함수를 실행해라
      // 마운트 될 동안은 null값, 언마운트되면 unsubscribe
    };
    // useEffect 안에서 반환하는 함수는 컴포넌트가 화면에서 사라질 때(언마운트) 실행됨
  }, []); // 컴포넌트가 처음 화면에 나타날 때 딱 한 번 함수를 실행한다

  /*
  언제 클린업 함수가 실행되냐?
  1. 컴포넌트 마운트 -> effect 실행 -> 컴포넌트 언마운트 -> 클린업 함수 실행
  2. deps(useEffect의 두 번째 인자로 넘기는 배열) 변경 -> 이전 클린업 실행 -> 새 effect 실행
  */

  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
      {/* 
        실제 트윗의 개수만큼 map이 실행됨 -> 실행마다 각 트윗의 내용을 Tweet 컴포넌트 안에 끼워넣음
        식별을 위해 key값을 id로, 객체 안의 모든 속성을 낱개로 다 풀어서 전달
      */}
    </Wrapper>
  );
}
