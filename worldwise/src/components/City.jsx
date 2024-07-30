import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCities } from "../hooks/useCities";
import { useEffect } from "react";
import Spinner from "./Spinner";
import BackButton from "./BackButton";
/* const [currentCity, setCurrentCity] = useState({});
we used the above state in Citycontext because we want this state at many things thats why defined globally in that place */
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCities();
  /*
  if i use isloading spinner above the 
  useeffect then eslint will give error of hooks 
  not in same order as it violets the rules as we use return 
  so this thiks as the below myeffect might not be created

  */
  useEffect(
    function () {
      getCity(id);
    },
    [id, getCity]
  );
  // TEMP DATA
  // const currentCity = {
  //   cityName: "Lisbon",
  //   emoji: "🇵🇹",
  //   date: "2027-10-31T15:59:59.138Z",
  //   notes: "My favorite city so far!",
  // };
  if (isLoading) {
    <Spinner />;
  }
  const { cityName, emoji, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
