const bmiCalculator = (height: number, mass: number): string => {
	const heightInMeters = height / 100;
	const BMI = mass / (heightInMeters * heightInMeters);
	
	if (BMI <= 16) { return "Underweight (Severe thinness)" }
	else if (BMI <= 17) { return "Underweight (Moderate thinness)" }
	else if (BMI <= 18.5) { return "Underweight (Mild thinness) " }
	else if (BMI <= 25) { return "Normal range " }
	else if (BMI <= 30) { return "Overweight (Pre-obese)" }
	else if (BMI <= 35) { return "Obese (Class I) " }
	else if (BMI <= 40) { return "Obese (Class II) " }
	else { return "Obese (Class III) " }
}

console.log(bmiCalculator(180, 74))