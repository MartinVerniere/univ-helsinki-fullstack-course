interface CoursePartBase {
	name: string;
	exerciseCount: number;
}

interface CoursePartDescripted extends CoursePartBase {
	description: string;
}

interface CoursePartBasic extends CoursePartDescripted {
	kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
	groupProjectCount: number;
	kind: "group"
}

interface CoursePartBackground extends CoursePartDescripted {
	backgroundMaterial: string;
	kind: "background"
}

interface CoursePartSpecial extends CoursePartDescripted {
	requirements: string[];
	kind: "special"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

interface ContentProps {
	courseParts: Array<CoursePart>
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

const CourseInfoBasic = (props: CoursePartBasic) => {
	return (
		<div>
			<b> {props.name} {props.exerciseCount} </b>
			<p> {props.description} </p>
		</div>
	);
}

const CourseInfoGroup = (props: CoursePartGroup) => {
	return (
		<div>
			<b> {props.name} {props.exerciseCount} </b>
			<p> project exercises {props.groupProjectCount} </p>
		</div>
	);
}

const CourseInfoBackground = (props: CoursePartBackground) => {
	return (
		<div>
			<b> {props.name} {props.exerciseCount} </b>
			<p> {props.description} </p>
			<p> background material {props.backgroundMaterial} </p>
		</div>
	);
}

const CourseInfoSpecial = (props: CoursePartSpecial) => {
	return (
		<div>
			<b> {props.name} {props.exerciseCount} </b>
			<p> {props.description} </p>
			<p> background material {props.requirements} </p>
		</div>
	);
}

const Content = (props: ContentProps) => {
	return (
		<div>
			{props.courseParts.map(coursePart => {
				switch (coursePart.kind) {
					case "basic":
						return <CourseInfoBasic {...coursePart} />;
					case "group":
						return <CourseInfoGroup {...coursePart} />;
					case "background":
						return <CourseInfoBackground {...coursePart} />;
					case "special":
						return <CourseInfoSpecial {...coursePart} />
					default:
						return assertNever(coursePart);
				}
			})}
		</div>
	);
};



export default Content;