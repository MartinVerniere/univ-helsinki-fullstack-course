interface CalculatorValues {
	value1: number[];
	value2: number;
}

const parseArgumentsExercise = (args: string[]): CalculatorValues => {
	if (args.length < 4) throw new Error('Not enough arguments');

	const array = args.slice(2, args.length - 1).map(element => Number(element))
	const isArrayOfNumbers = array.every(number => !isNaN(number));

	if (isArrayOfNumbers && !isNaN(Number(args[args.length - 1]))) {
		return {
			value1: array,
			value2: Number(args[args.length - 1])
		}
	} else {
		throw new Error('Provided values were not numbers!');
	}
}

interface CalculatorResponse {
	periodLenght: number;
	trainingDays: number;
	success: boolean;
	rating: 1 | 2 | 3;
	ratingDescription: "Impressive training" | "Good training, but it could improve in its average daily hours" | "Failed training schedule"
	target: number;
	average: number;
}

const exercisesCalculator = (dailyExerciseHours: number[], targetAmount: number): CalculatorResponse => {
	const periodLenght = dailyExerciseHours.length;
	const trainingDays = dailyExerciseHours.filter((element) => element > 0).length;
	const target = targetAmount;
	const totalHours = dailyExerciseHours.reduce((accumulatedHours, currentHours) => accumulatedHours + currentHours, 0)
	const average = totalHours / periodLenght;
	const success = average >= targetAmount ? true : false;
	const rating = success ? average > 4 ? 1 : 2 : 3;
	const ratingDescription = success ? average > 4 ? "Impressive training" : "Good training, but it could improve in its average daily hours" : "Failed training schedule";

	return { periodLenght, trainingDays, success, rating, ratingDescription, target, average };
}

try {
	const { value1, value2 } = parseArgumentsExercise(process.argv);
	console.log(exercisesCalculator(value1, value2));
} catch (error: unknown) {
	let errorMessage = 'Something bad happened.'
	if (error instanceof Error) {
		errorMessage += ' Error: ' + error.message;
	}
	console.log(errorMessage);
}
