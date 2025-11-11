export interface CalculatorValues {
	daily_exercises: number[];
	target: number;
}

const parseArgumentsExercise = (args: string[]): CalculatorValues => {
	if (args.length < 4) throw new Error('Not enough arguments');

	const array = args.slice(2, args.length - 1).map(element => Number(element))
	const isArrayOfNumbers = array.every(number => !isNaN(number));

	if (isArrayOfNumbers && !isNaN(Number(args[args.length - 1]))) {
		return {
			daily_exercises: array,
			target: Number(args[args.length - 1])
		}
	} else {
		throw new Error('Provided values were not numbers!');
	}
}

interface CalculatorResponse {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: 1 | 2 | 3;
	ratingDescription: "Impressive training" | "Good training, but it could improve in its average daily hours" | "Failed training schedule"
	target: number;
	average: number;
}

export const exercisesCalculator = (dailyExerciseHours: number[], targetAmount: number): CalculatorResponse => {
	const periodLength = dailyExerciseHours.length;
	const trainingDays = dailyExerciseHours.filter((element) => element > 0).length;
	const target = targetAmount;
	const totalHours = dailyExerciseHours.reduce((accumulatedHours, currentHours) => accumulatedHours + currentHours, 0)
	const average = totalHours / periodLength;
	const success = average >= targetAmount ? true : false;
	const rating = success ? average > 4 ? 1 : 2 : 3;
	const ratingDescription = success ? average > 4 ? "Impressive training" : "Good training, but it could improve in its average daily hours" : "Failed training schedule";

	return { periodLength, trainingDays, success, rating, ratingDescription, target, average };
}

if (require.main === module) {
	try {
		const { daily_exercises, target } = parseArgumentsExercise(process.argv);
		console.log(exercisesCalculator(daily_exercises, target));
	} catch (error: unknown) {
		let errorMessage = 'Something bad happened.'
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		console.log(errorMessage);
	}
}