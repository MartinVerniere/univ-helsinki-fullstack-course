interface CoursePartBase {
	name: string;
	exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
	description: string;
	kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
	groupProjectCount: number;
	kind: "group"
}

interface CoursePartBackground extends CoursePartBase {
	description: string;
	backgroundMaterial: string;
	kind: "background"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;

interface ContentProps {
	courseParts: CoursePart[]
}

const CourseInfo = (props: CoursePart) => <p> {props.name} {props.exerciseCount} </p>

const Content = (props: ContentProps) => {
	return (
		<div>
			{props.courseParts.map(coursePart => <CourseInfo name={coursePart.name} exerciseCount={coursePart.exerciseCount} />)}
		</div>
	);
}

export default Content;