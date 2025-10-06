const Header = (props) => <h1>{props.course.name}</h1>

const Part = (props) => <p>{props.part.name} {props.part.exercises}</p>

const Content = (props) => {
  return (
    <>
      {props.course.parts.map(part =>
        <Part key={part.id} part={part} />
      )
      }
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

export default Course;