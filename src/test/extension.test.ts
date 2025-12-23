import * as assert from 'assert';
import * as vscode from 'vscode';
import { extractVariableValue, getCommentSyntax, getCheckboxRegex } from '../extension';

suite('Checkbox Display Extension Tests', () => {
	suite('getCommentSyntax', () => {
		test('should return # for python', () => {
			assert.strictEqual(getCommentSyntax('python'), '#');
		});

		test('should return // for javascript', () => {
			assert.strictEqual(getCommentSyntax('javascript'), '//');
		});

		test('should return // for typescript', () => {
			assert.strictEqual(getCommentSyntax('typescript'), '//');
		});

		test('should return // for c', () => {
			assert.strictEqual(getCommentSyntax('c'), '//');
		});

		test('should return // for cpp', () => {
			assert.strictEqual(getCommentSyntax('cpp'), '//');
		});

		test('should return // for java', () => {
			assert.strictEqual(getCommentSyntax('java'), '//');
		});

		test('should return # as default for unknown language', () => {
			assert.strictEqual(getCommentSyntax('unknown'), '#');
		});
	});

	suite('extractVariableValue', () => {
		test('should extract numeric value with # comment', () => {
			const line = 'checkbox1 = 1 # [CB]: 1|0';
			const result = extractVariableValue(line, '#');
			assert.strictEqual(result, '1');
		});

		test('should extract numeric value with // comment', () => {
			const line = 'int checkbox1 = 1; // [CB]: 1|0';
			const result = extractVariableValue(line, '//');
			assert.strictEqual(result, '1;');
		});

		test('should extract string value with quotes', () => {
			const line = 'file = "example.txt" # [CB]: "exam.txt"|"example.txt"';
			const result = extractVariableValue(line, '#');
			assert.strictEqual(result, '"example.txt"');
		});

		test('should extract value with spaces', () => {
			const line = 'path = /home/user # [CB]: /tmp|/home/user';
			const result = extractVariableValue(line, '#');
			assert.strictEqual(result, '/home/user');
		});

		test('should return null for line without checkbox', () => {
			const line = 'normalVariable = 42';
			const result = extractVariableValue(line, '#');
			assert.strictEqual(result, null);
		});

		test('should handle boolean values', () => {
			const line = 'debug = True # [CB]: False|True';
			const result = extractVariableValue(line, '#');
			assert.strictEqual(result, 'True');
		});

		test('should trim whitespace', () => {
			const line = 'value =   10   # [CB]: 5|10';
			const result = extractVariableValue(line, '#');
			assert.strictEqual(result, '10');
		});
	});

	suite('Checkbox Pattern Matching', () => {
		test('should match standard checkbox pattern with #', () => {
			const line = 'var = 1 # [CB]: 0|1';
			const regex = getCheckboxRegex('#');
			regex.lastIndex = 0;
			const match = regex.exec(line);
			assert.ok(match);
			assert.strictEqual(match![1].trim(), '0');
			assert.strictEqual(match![2].trim(), '1');
		});

		test('should match checkbox with // comment', () => {
			const line = 'int var = 1; // [CB]: 0|1';
			const regex = getCheckboxRegex('//');
			regex.lastIndex = 0;
			const match = regex.exec(line);
			assert.ok(match);
			assert.strictEqual(match![1].trim(), '0');
			assert.strictEqual(match![2].trim(), '1');
		});

		test('should match checkbox with string values', () => {
			const line = 'file = "a.txt" # [CB]: "a.txt"|"b.txt"';
			const regex = getCheckboxRegex('#');
			regex.lastIndex = 0;
			const match = regex.exec(line);
			assert.ok(match);
			assert.strictEqual(match![1].trim(), '"a.txt"');
			assert.strictEqual(match![2].trim(), '"b.txt"');
		});

		test('should handle spaces around checkbox', () => {
			const line = 'x = 5  #  [CB]:  10|5';
			const regex = getCheckboxRegex('#');
			regex.lastIndex = 0;
			const match = regex.exec(line);
			assert.ok(match);
			assert.strictEqual(match![1].trim(), '10');
			assert.strictEqual(match![2].trim(), '5');
		});
	});

	suite('Multi-language Support', () => {
		test('should detect Python checkbox', () => {
			const line = 'enabled = True # [CB]: False|True';
			const regex = getCheckboxRegex('#');
			regex.lastIndex = 0;
			assert.ok(regex.exec(line));
		});

		test('should detect JavaScript checkbox', () => {
			const line = 'const enabled = true; // [CB]: false|true';
			const regex = getCheckboxRegex('//');
			regex.lastIndex = 0;
			assert.ok(regex.exec(line));
		});

		test('should detect C++ checkbox', () => {
			const line = 'bool enabled = true; // [CB]: false|true';
			const regex = getCheckboxRegex('//');
			regex.lastIndex = 0;
			assert.ok(regex.exec(line));
		});
	});

	suite('Extension Commands', () => {
		test('toggle command should be registered', async () => {
			const commands = await vscode.commands.getCommands(true);
			assert.ok(commands.includes('checkbox-display.toggleCheckbox'));
		});

		test('toggleCheckboxAtLine command should be registered', async () => {
			const commands = await vscode.commands.getCommands(true);
			assert.ok(commands.includes('checkbox-display.toggleCheckboxAtLine'));
		});
	});
});
