function eval() {
	// Do not use eval!!!
	return;
}

function expressionCalculator(expr) {
	let expression = expr.replace(/\s/g, "");
	let result = 0;
	const signs = [
		{
			sign: "/",
			funct: expPart => {
				[a, b] = expPart.split("/");
				if (+b === 0) {
					return Error("TypeError: Division by zero.");
				}
				return a / b;
			}
		},
		{
			sign: "*",
			funct: expPart => {
				[a, b] = expPart.split("*");
				return a * b;
			}
		},

		{
			sign: "+",
			funct: expPart => {
				[a, b] = expPart.split("+");
				return +a + +b;
				console.log(expPart);
			}
		},
		{
			sign: "-",
			funct: expPart => {
				[a, b] = expPart.split("-");
				return +a - +b;
			}
		}
	];

	signs.forEach(signO => {
		const { sign, funct } = signO;
		atomExp = new RegExp(`[0-9]+\\${sign}[0-9]+`);
		//console.log({ atomExp });
		while (expression.match(atomExp)) {
			expression = expression.replace(atomExp, funct);
			//console.log(expression, funct);
		}
		console.log(expression);
	});

	//result = multing(expression);
	console.log({ expression, result });
	return +expression;
}

module.exports = {
	expressionCalculator
};
