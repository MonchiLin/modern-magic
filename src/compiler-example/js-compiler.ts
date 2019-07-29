import {curry} from 'ramda';

const testFP = curry((r: RegExp, s: string) => r.test(s));

const enum TokenConstant {
	LEFT_PAREN = 'left-paren',
	RIGHT_PAREN = 'right-paren',
	NUMBER = 'number',
	NAME = 'name',
	COMMA = 'comma',
}

const predicate = {
	isLeftParen: (s: string) => s === '(',
	isRightParen: (s: string) => s === ')',
	isNumber: (s: string) => testFP(/[0-9]/, s),
	isWord: (s: string) => testFP(/[a-z]/i, s),
	isSpace: (s: string) => testFP(/\s/, s),
};


const leftParen = '(';


function tokenizer(code: string) {

	code.split('')
		.map(char => {

			switch (char) {
				case predicate.isWord(char):
					break;

				default:
					new TypeError('tokenizer');
			}


		});

}
