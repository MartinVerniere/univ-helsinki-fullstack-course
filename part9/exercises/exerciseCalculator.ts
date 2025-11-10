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

console.log(exercisesCalculator([3, 0, 2, 4.5, 0, 3, 1], 2));