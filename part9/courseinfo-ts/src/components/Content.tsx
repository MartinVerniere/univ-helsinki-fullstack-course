interface CourseProps {
	name: string,
	exerciseCount: number,
}

interface ContentProps {
	courses: CourseProps[]
}

const CourseInfo = (props: CourseProps) => <p> {props.name} {props.exerciseCount} </p>

const Content = (props: ContentProps) => {
	return (
		<div>
			{props.courses.map(course => <CourseInfo name={course.name} exerciseCount={course.exerciseCount} />)}
		</div>
	);
}

export default Content;