import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  Form,
  Error,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/auth-components";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 이 함수는 input 요소의 값이 변경될 때 발생하는 이벤트를 받는다
    const {
      target: { name, value },
    } = e;
    // 구조 분해 할당 문법
    // e 객체 안에 있는 target 속성을 찾아서 값을 넣어라
    // const name = e.target.name;
    // const value = e.target.value;
    if (name === "name") {
      setUsername(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    // FormEvent가 권장되는 방법이 아니라서 SubmitEvent로 대체
    e.preventDefault();
    setError("");
    if (isLoading || username === "" || email === "" || password === "") {
      return;
    }
    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      // firebase가 제공하는 함수임
      // 이매일과 비밀번호로 계정을 생성하고 로그인까지 해주는 함수

      await updateProfile(credentials.user, {
        displayName: username,
      });
      // firebase가 제공하는 함수임
      // 전단계에서 쓴 함수가 인자를 이메일, 비번밖에 안받아서 추가적인 사용자 정보를 프로필에 저장하고 업데이트하는 것
      // .user는 생성된 사용자에 대한 모든 정보가 담긴 객체를 반환, displayName도 정해진 키 이름
      navigate("/");
      // 페이지를 이동
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Wrapper>
      <Title>Join 𝕏</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="name"
          value={username}
          placeholder="Name"
          type="text"
          required
        />
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
        />
        <Input
          onChange={onChange}
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          required
        />
        <Input
          type="submit"
          value={isLoading ? "Loading..." : "Create Account"}
        />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        Already have an account? <Link to="/login">Log in</Link>
      </Switcher>
    </Wrapper>
  );
}
