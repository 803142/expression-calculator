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
				return (+a / +b === -0)? '-0': (a<0 & b<0)?'+'+a / +b:+a / +b;
			}
		},
		{
			sign: "*",
			funct: expPart => {
				const [a, b] = expPart.split("*");
				const str = ''+(+a * +b);
				console.log(a, b, expPart, str)
				return (+a * +b === -0)? '-0': (a<0 & b<0)?'+'+a * +b : +a * +b ;
			}
		},
		{
			sign: "-",
			funct: expPart => {
				[a = 0, b, c = 0] = expPart.split("-");
				console.log(a, b, expPart, +a - +b - +c)
				return (+a - +b - +c === -0)? '-0':  +a - +b - +c;
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

	const simpleString = (simpleString) => {
		signs.forEach(signO => {
			const { sign, funct } = signO;
			atomExp = new RegExp(
				`-?[0-9]+(\\.)?([0-9]+)?\\${sign}-?[0-9]+(\\.)?([0-9]+)?`
			);
			while (simpleString.match(atomExp)) {
				simpleString = simpleString.replace(atomExp, funct);
			}
		});
		return simpleString
	}

	do {
		if (expression.match(/\(-?[0-9]+(\.)?([0-9]+)?\)/g)){
			expression = expression.replace(/\(-?[0-9]+(\.)?([0-9]+)?\)/g, expr => {
			return expr.substring(1, expr.length - 1);
			});

		};
		
		while (expression.match(/\((?!\()[0-9/\-+*.]+\)/g)){
			if (expression.match('--')){
				expression = expression.replace('--', '+');
				expression = expression.replace('+-', '-');
				expression = expression.replace('-+', '-');
				expression = expression.replace('++', '+');
			};
			expression = expression.replace(/\((?!\()[0-9/\-+*.]+\)/g, expr => {
				console.log({ expr },simpleString(expr.substring(1, expr.length - 1)));
				return simpleString(expr.substring(1, expr.length - 1));
			})
		}
		console.log({ expression },simpleString(expression));
		if (expression.match(/e/g)) return 0;
	} while (expression.match(/\(/g));
		expression = expression.replace('--', '+');
		expression = expression.replace('+-', '-');
		expression = expression.replace('-+', '-');
		expression = expression.replace('++', '+');
	return +simpleString(expression);
}

module.exports = {
	expressionCalculator
};
