function tokenizer(input: string) {

	let current = 0;

	const tokens = [];

	while (current < input.length) {
		let char = input[current];

		if (char === "(") {
			tokens.push({
				type: "paren",
				value: "("
			});

			current += 1;

			continue;
		}

		if (char === ")") {

			tokens.push({
				type: "paren",
				value: ")"
			});

			current += 1;

			continue;
		}

		if (/\s/.test(char)) {
			current += 1;
			continue;
		}

		if (/[0-9]/.test(char)) {
			let value = "";

			while (/[0-9]/.test(char)) {
				value += char;

				current += 1;
				char = input[current];
			}

			tokens.push({
				type: "number",
				value: value
			});

			continue;
		}

		if (/[a-z]/i.test(char)) {
			let value = "";

			while (/[a-z]/.test(char)) {
				value += char;

				current += 1;

				char = input[current];
			}

			tokens.push({
				type: "name",
				value: value
			});

			continue;
		}

		throw new TypeError("输入了无法识别的类型");

	}

	return tokens;
}

function parser(tokens) {

	let current = 0;

	function walk() {
		let token = tokens[current];

		if (token.type === "number") {
			current += 1;

			return {
				type: "NumberLiteral",
				value: token.value
			};
		}

		if (token.type === "paren" && token.value === "(") {
			current += 1;
			token = tokens[current];

			const node = {
				type: "CallExpression",
				name: token.value,
				params: []
			};

			current += 1;

			token = tokens[current];

			while (
				token.type !== "paren"
				|| token.type === "paren" && token.value !== ")"
				) {
				node.params.push(walk());
				token = tokens[current];
			}

			current += 1;
			return node;
		}

		throw new TypeError(token.type);

	}

	const ast = {
		type: "Program",
		body: []
	};

	while (current < tokens.length) {
		ast.body.push(walk());
	}

	return ast;
}

function traverser(ast, visitor) {

	function traverseArray(array, parent) {
		array.forEach(child => {
			traverseNode(child, parent);
		});
	}


	function traverseNode(node, parent) {
		const method = visitor[node.type];

		if (method) {
			method(node, parent);
		}

		switch (node.type) {

			case "Program":
				traverseArray(node.body, node);
				break;

			case "CallExpression":
				traverseArray(node.params, node);
				break;
			case "NumberLiteral":
				break;

			default:
				throw new TypeError(node.type);
		}

	}

	traverseNode(ast, null);
}

function transformer(ast) {
	const newAst = {
		type: "Program",
		body: []
	};

	ast._context = newAst.body;

	traverser(ast, {
		NumberLiteral: (node, parent) => {
			parent._context.push({
				type: "NumberLiteral",
				value: node.value
			});
		},

		CallExpression: (node, parent) => {
			let expression = {
				type: "CallExpression",
				callee: {
					type: "Identifier",
					name: node.name
				},
				arguments: [],
				expression: null
			};

			node._context = expression.arguments;

			if (parent.type !== "CallExpression") {
				expression = {
					type: "ExpressionStatement",
					expression: expression
				};
			}

			parent._context.push(expression);
		}

	});

	return newAst;
}

function codeGenerator(node) {
	console.log(1);

	switch (node.type) {

		case "Program": {
			return node
				.body
				.map(codeGenerator)
				.join("\n");
		}

		case "ExpressionStatement": {
			return codeGenerator(node.expression) + ";";
		}

		case "CallExpression": {
			return codeGenerator(node.callee)
				+ "("
				+ node.arguments.map(codeGenerator)
					.join(", ")
				+ ")";
		}

		case "Identifier": {
			return node.name;
		}

		case "NumberLiteral": {
			return node.value;
		}

		default: {
			throw new TypeError(node.type);
		}
	}
}


const tokens = tokenizer("(add(2 (subtract 4 2)))");
const ast = parser(tokens);

const transformed = transformer(ast);
const code = codeGenerator(transformed);

console.log(code);
