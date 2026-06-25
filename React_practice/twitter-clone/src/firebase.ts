// 리액트 프로젝트와 Firebase 서비스를 연결하는 초기 설정 코드
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);

// 나 authenticaton 이용할거야
export const auth = getAuth(app);
// 이미지나 동영상, 파일 등을 저장하거나 불러올 때 사용하는 스토리지 이용할거야
export const storage = getStorage(app);
// 나 데이터베이스 이용할거야
export const db = getFirestore(app);
