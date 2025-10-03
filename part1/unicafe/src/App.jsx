import { useState } from 'react'

const StatisticsLine = ({ text, value }) => <p>{text} {value}</p>

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (all === 0) {
    return (
      <>
        <p>statistics</p>
        <p>No feedback given</p>
      </>
    )
  } else {
    return (
      <>
        <p>statistics</p>

        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={all} />
        <StatisticsLine text="average" value={average} />
        <StatisticsLine text="positive" value={positive + " %"} />
      </>
    )
  }
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGood = () => {
    const newGood = good + 1;
    const newAll = all + 1;
    setGood(newGood);
    setAll(newAll);
    setAverage((newGood - bad) / newAll);
    setPositive((newGood / newAll) * 100);
  }

  const handleNeutral = () => {
    const newNeutral = neutral + 1;
    const newAll = all + 1;
    setNeutral(newNeutral);
    setAll(newAll);
    setAverage((good - bad) / newAll);
    setPositive((good / newAll) * 100);
  }

  const handleBad = () => {
    const newBad = bad + 1;
    const newAll = all + 1;
    setBad(newBad);
    setAll(newAll);
    setAverage((good - newBad) / newAll);
    setPositive((good / newAll) * 100);
  }


  return (
    <div>
      <p>give feedback</p>

      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />

      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </div>
  )
}

export default App