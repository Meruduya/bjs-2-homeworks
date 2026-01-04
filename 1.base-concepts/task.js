"use strict"

function solveEquation(a, b, c) {
	let arr = [];

	const discriminant = b ** 2 - 4 * a * c;

	if (discriminant < 0) {
		return arr;
	}

	if (discriminant === 0) {
		const root = -b / (2 * a);
		arr.push(root);
		return arr;
	}

	const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
	const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
	arr.push(root1, root2);
	return arr;
}

function calculateTotalMortgage(percent, contribution, amount, countMonths) {
	percent = Number(percent);
	contribution = Number(contribution);
	amount = Number(amount);
	countMonths = Number(countMonths);

	if (
		isNaN(percent) ||
		isNaN(contribution) ||
		isNaN(amount) ||
		isNaN(countMonths)
	) {
		return false;
	}
  
	const monthlyRate = (percent / 100) / 12;
	const creditBody = amount - contribution;

	if (creditBody <= 0) {
		return 0;
	}
	const monthlyPayment = creditBody * (monthlyRate + (monthlyRate / (((1 + monthlyRate) ** countMonths) - 1)));
	const totalAmount = monthlyPayment * countMonths;

	return Math.round(totalAmount * 100) / 100;

}
