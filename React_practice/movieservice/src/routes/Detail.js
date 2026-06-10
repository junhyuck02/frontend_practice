import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// URL 주소에 포함된 변수(파라미터)를 꺼내서 쓰고 싶을 때 사용하는 도구
// <Route path="/movie/:id" element={<Detail />} /> 여기서 :id는 유동적인 값
// 그래서 이 id의 값을 뽑아와주는게 useParams임

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const getMovie = async () => {
    // async로 이 함수를 비동기로 선언, 웹사이트가 멈추지 않게 뒤에서 조용히 일을 처리하겠다는 말임
    const json =
      await // await는 뒤에 있는 일이 끝날 때까지 여기서 잠깐 멈춰서 기다리라는 거임
      (await fetch(`https://ghibliapi.vercel.app/films/${id}`)).json();
    setMovie(json);
  };

  useEffect(() => {
    getMovie();
  }, []);

  if (!movie) return <h1>Loading...</h1>;

  return (
    <div>
      <img src={movie.image} alt={movie.title} />
      <h1>{movie.title}</h1>
      <h3>
        {movie.release_date}년, RT {movie.rt_score}점 입니다.
      </h3>
      <p>{movie.description}</p>
      <p>감독: {movie.director}</p>
    </div>
  );
}

export default Detail;
