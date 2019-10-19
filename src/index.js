function eval() {
	// Do not use eval!!!
	return;
}

function checkBrackets(str) {
	const resultStack = [];
	let openElement = 0;

	for (let i = 0, lenS = str.length; i < lenS; i++) {
		if (str[i] === ")") {
			if (resultStack[openElement - 1] === "(") {
				resultStack.pop();
				openElement--;
			} else {
				resultStack.push(str[i]);
				openElement++;
			}
		} else {
			if (str[i] == "(") {
				resultStack.push(str[i]);
				openElement++;
			}
		}
	}

	return !resultStack.length;
}

function expressionCalculator(expr) {
	if (!checkBrackets(expr)) {
		throw new Error("ExpressionError: Brackets must be paired");
	}
	let expression = expr.replace(/\s/g, "");
	let result = 0;
	const signs = [
		{
			sign: "/",
			funct: expPart => {
				[a, b] = expPart.split("/");
				if (+b === 0) {
					throw new Error("TypeError: Division by zero.");
				}
				return +a / +b;
			}
		},
		{
			sign: "*",
			funct: expPart => {
				[a, b] = expPart.split("*");
				return +a * +b;
			}
		},
		{
			sign: "-",
			funct: expPart => {
				[a = 0, b, c = 0] = expPart.split("-");
				return +a - +b - +c;
			}
		},
		{
			sign: "+",
			funct: expPart => {
				[a, b] = expPart.split("+");
				return +a + +b;
			}
		}
	];

	do {
		expression = expression.replace(/\(-?[0-9]+(\.)?([0-9]+)?\)/g, expr => {
			console.log({ expr }, expr.substring(1, expr.length - 2));
			return expr.substring(1, expr.length - 1);
		});
		signs.forEach(signO => {
			const { sign, funct } = signO;
			atomExp = new RegExp(
				`-?[0-9]+(\\.)?([0-9]+)?\\${sign}-?[0-9]+(\\.)?([0-9]+)?`
			);
			while (expression.match(atomExp)) {
				expression = expression.replace(atomExp, funct);
			}
		});

		if (expression.match(/e/g)) return 0;
	} while (expression.match(/\(/g));
	//result = multing(expression);
	//console.log({ expression, result });
	return +expression;
}

module.exports = {
	expressionCalculator
};
