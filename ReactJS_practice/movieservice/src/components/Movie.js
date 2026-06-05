import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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
