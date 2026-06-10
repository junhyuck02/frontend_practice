import { useEffect, useState } from "react";
import Movie from "../components/Movie";
// 점의 개수는 현재 내 위치에서 얼마나 올라가야하는가를 의미
// 점이 두개면 현재 폴더의 상위 풀더로 한 단계 위로 올라가라는 뜻
import styles from "./Home.module.css";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const json = await (
      await fetch(`https://ghibliapi.vercel.app/films`)
    ).json();
    setMovies(json);
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);
  // useEffect(() => {
  //   fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`)
  //     .then((response) => response.json())
  //     .then((json) => {
  //       setMovies(json.data.movies);
  //       setLoading(false);
  //     });
  // }, []);
  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <div className={styles.movies}>
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              coverImg={movie.image}
              title={movie.title}
              summary={movie.description}
              director={movie.director}
              releaseDate={movie.release_date}
              rtScore={movie.rt_score}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
