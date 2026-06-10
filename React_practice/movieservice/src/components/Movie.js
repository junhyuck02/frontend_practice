import PropTypes from "prop-types";
// PropTypes 기능 쓸게요
import { Link } from "react-router-dom";
// Link 컴포넌트 쓸거임
// Link의 역할
// 서버에 요청하지 않고, 리액트 라우터가 주소창의 주소만 살짝 바꾸고, 해당 경로에 맞는 컴포넌트만 갈아 끼움
// <a> 태그와 달리 페이지의 새로고침이 없음
import styles from "./Movie.module.css";

function Movie({
  id,
  coverImg,
  title,
  summary,
  director,
  releaseDate,
  rtScore,
}) {
  return (
    <div className={styles.movie}>
      <img src={coverImg} alt={title} className={styles.movie__img} />
      <div>
        <h2 className={styles.movie__title}>
          <Link to={`/movie/${id}`}>{title}</Link>
        </h2>
        <h3 className={styles.movie__year}>
          {releaseDate}년 · RT {rtScore}점
        </h3>
        <p>{summary.length > 235 ? `${summary.slice(0, 235)}...` : summary}</p>
        <p className={styles.movie__director}>감독: {director}</p>
      </div>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.string.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  director: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  rtScore: PropTypes.string.isRequired,
};

export default Movie;
