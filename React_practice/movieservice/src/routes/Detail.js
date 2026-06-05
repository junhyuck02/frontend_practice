import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const getMovie = async () => {
    const json = await (
      await fetch(`https://ghibliapi.vercel.app/films/${id}`)
    ).json();
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
