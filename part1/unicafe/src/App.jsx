import { useState } from 'react'

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

      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>

      <p>statistics</p>

      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive} %</p>
    </div>
  )
}

export default App