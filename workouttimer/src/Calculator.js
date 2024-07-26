import { useEffect, useState } from "react";
import clickSound from "./ClickSound.m4a";
function Calculator({ workouts, allowSound }) {
  const [number, setNumber] = useState(workouts.at(0).numExercises);
  const [sets, setSets] = useState(3);
  const [speed, setSpeed] = useState(90);
  const [duration, setDuration] = useState(0);
  const [durationBreak, setDurationBreak] = useState(5);
  const mins = Math.floor(duration);
  const seconds = (duration - mins) * 60;

  useEffect(
    function () {
      setDuration((number * sets * speed) / 60 + (sets - 1) * durationBreak);
    },
    [number, sets, speed, durationBreak]
  );
  useEffect(
    function () {
      const playSound = function () {
        if (!allowSound) return;
        const sound = new Audio(clickSound);
        sound.play();
      };
      playSound();
    },
    [duration, allowSound]
  );
  useEffect(
    function () {
      document.title = `Your ${number}-exercise workout`;
    },
    [number, duration, sets]
  );

  function handleDec() {
    setDuration((duration) => (duration > 1 ? Math.ceil(duration) - 1 : 0));
  }
  function handleInc() {
    setDuration((duration) => Math.floor(duration + 1));
  }
  return (
    <>
      <form>
        <div>
          <label>Types of Workout</label>
          <select value={number} onChange={(e) => setNumber(+e.target.value)}>
            {workouts.map((workout) => (
              <option value={workout.numExercises} key={workout.name}>
                {workout.name}({workout.numExercises} exercise)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>How Many Sets ?</label>
          <input
            type="range"
            min="1"
            max="5"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          ></input>
          <span>{sets}</span>
        </div>
        <div>
          <label>HoW Fast Are You ?</label>
          <input
            type="range"
            min="30"
            max="180"
            steps="30"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          ></input>
          <span>{speed} sec/exercise</span>
        </div>
        <div>
          <label>Break Length</label>
          <input
            type="range"
            min="1"
            max="10"
            value={durationBreak}
            onChange={(e) => setDurationBreak(e.target.value)}
          ></input>
          <span>{durationBreak} minutes/break</span>
        </div>
      </form>
      <section>
        <button onClick={handleDec}>-</button>
        <p>
          {mins < 10 && "0"}
          {mins}:{seconds < 0 && "0"}
          {seconds}
        </p>
        <button onClick={handleInc}>+</button>
      </section>
    </>
  );
}
export default Calculator;
