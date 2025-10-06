const Header = (props) => {
  console.log(props);
  return <h1>{props.course.name}</h1>
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Content = (props) => {
  return (
    <>
      <Part part={props.course.parts[0]} />
      <Part part={props.course.parts[1]} />
      <Part part={props.course.parts[2]} />
      <Part part={props.course.parts[3]} />
    </>
  )
}

const Total = (props) => {
  const initialValue = 0;
  const total = props.course.parts.reduce((sum, part) => {
    console.log('what is happening', sum, part);
    return sum + part.exercises;
  }, initialValue);

  return <p> Number of exercises {total} </p>;
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App