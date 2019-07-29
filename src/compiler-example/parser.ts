type ParserType = 'Number' | 'Midline'

type Parser = { type: ParserType, value: string }[]

function examinationQRCodeParser(_input: string) {
	const isNumber = (s: string) => /[0-9]/.test(s);
	const isMidline = (s: string) => s === '-';

	const tokenizer: (s: string) => Parser = (input: string) => {
		let index = 0;
		const _tokends = [];

		while (input.length > index) {
			let current = input[index];

			index++;

			if (isNumber(current)) {
				let value = current;

				current = input[index];

				while (isNumber(current)) {
					value += current;
					current = input[index];

					index++;
					if (!isNumber(input[index])) {
						break;
					}
				}

				_tokends.push({
					type: 'Number',
					value: value
				});

			} else if (isMidline(current)) {
				_tokends.push({
					type: 'Midline',
					value: current
				});

			} else {
				throw new Error(`tokenizer Error ${current}`);
			}

		}

		return _tokends;
	};

	const tokens = tokenizer(_input);

	return {
		examinationId: tokens[0].value,
		targetId: tokens[2].value,
		targetKind: tokens[4].value,
	};
}

