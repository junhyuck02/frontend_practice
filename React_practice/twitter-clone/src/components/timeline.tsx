import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet.tsx";

export interface ITweet {
  id: string;
  photo?: string;
  // photo는 필수가 아니다
  tweet: string;
  userId: string;
  username: string;
  createdAt: number;
}

const Wrapper = styled.div``;

export default function Timeline() {
  const [tweets, setTweet] = useState<ITweet[]>([]);
  // 이건 트윗 배열이고, 기본값은 빈 배열이다
  const fetchTweets = async () => {
    // 데이터 호출 함수
    const tweetsQuery = query(
      // firebase 제공 함수 query, db에서 내가 원하는 데이터만 골라내기 위한 조건을 만드는 함수
      collection(db, "tweets"),
      orderBy("createdAt", "desc"),
      // firebase 제공 함수, 특정 필드 값을 기준으로 정렬
      // 작성시간을 기준으로 내림차순으로 정렬
    );
    const snapshot = await getDocs(tweetsQuery);
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
    // 가져온 데이터들(spanshot.docs)을 순회하며 각 문서의 데이터와 문서 고유 ID를 포함한 새로운 객체 배열을 만든다
    setTweet(tweets);
  };
  useEffect(() => {
    fetchTweets();
  }, []); // 컴포넌트가 처음 화면에 나타날 때 딱 한 번 함수를 실행한다
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
