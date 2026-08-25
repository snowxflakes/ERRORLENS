import { CommonErrorDoc } from '../types';

export const COMMON_ERRORS_DATABASE: CommonErrorDoc[] = [
  // C ERRORS
  {
    id: 'c-missing-semicolon',
    language: 'c',
    name: 'Missing Semicolon (expected \';\' before ...)',
    category: 'syntax',
    shortDesc: 'Statement lacks a terminating semicolon before the next statement or block.',
    definition: 'In C, the semicolon (;) is a statement terminator. The compiler parses expressions until it reaches a semicolon to know the statement is complete.',
    whyOccurs: 'In C grammar, instructions are separated by semicolons. Forgetting a semicolon leaves the parser expecting more tokens for the current statement, causing it to complain on the subsequent line.',
    incorrectCode: `int a = 10
int b = 20;
printf("%d", a + b);`,
    correctCode: `int a = 10;
int b = 20;
printf("%d", a + b);`,
    prevention: 'Always end variable declarations, assignments, and function calls with a semicolon in C. Check the line immediately ABOVE the line reported by the compiler.',
    difficulty: 'beginner',
    tags: ['Syntax', 'C Grammar', 'Parser', 'Semicolon'],
    practiceQuestion: {
      question: 'Which line causes the compiler error when compiling this snippet?\n1: int x = 5\n2: int y = 10;\n3: return x + y;',
      options: [
        'Line 1 lacks a semicolon, though the compiler may report Line 2',
        'Line 2 because y is already defined',
        'Line 3 because return cannot add variables',
        'Line 1 has invalid integer syntax',
      ],
      correctIndex: 0,
      explanation: 'The compiler often flags Line 2 because it was still parsing Line 1 until it hit "int" on Line 2 without seeing a semicolon.',
    },
  },
  {
    id: 'c-segfault',
    language: 'c',
    name: 'Segmentation Fault (SIGSEGV / Core Dump)',
    category: 'runtime',
    shortDesc: 'Program tried to read or write to an invalid or unallocated memory address.',
    definition: 'A segmentation fault occurs when hardware with memory management unit (MMU) notifies the operating system that a program attempted to access an illegal memory address (e.g. NULL pointer, out of bounds, or freed memory).',
    whyOccurs: 'Dereferencing NULL pointer, uninitialized pointer, accessing arrays beyond allocated bounds, or writing to read-only string literals in C.',
    incorrectCode: `int *ptr = NULL;
*ptr = 42; // Crashing: Writing to address 0x0`,
    correctCode: `int value = 0;
int *ptr = &value;
*ptr = 42; // Safe: ptr points to valid allocated memory`,
    prevention: 'Always initialize pointers to NULL or a valid address. Always verify `if (ptr != NULL)` before dereferencing, and check array boundaries.',
    difficulty: 'intermediate',
    tags: ['Pointers', 'Memory', 'SIGSEGV', 'NULL'],
    practiceQuestion: {
      question: 'What is the most common reason for a Segmentation Fault in beginner C code?',
      options: [
        'Passing a variable instead of pointer (&var) into scanf("%d", var)',
        'Using double quotes instead of single quotes for characters',
        'Forgetting the return 0 statement in main',
        'Declaring a float variable inside a loop',
      ],
      correctIndex: 0,
      explanation: 'scanf expects memory addresses (pointers). Passing a value like `scanf("%d", num)` treats num\'s value as an address and causes a crash.',
    },
  },
  {
    id: 'c-format-specifier-mismatch',
    language: 'c',
    name: 'Format Specifier Mismatch in printf / scanf',
    category: 'logical',
    shortDesc: 'Type of argument passed does not match the placeholder (%d, %f, %s, %p).',
    definition: 'printf uses format specifiers to determine how many bytes to read from the stack/registers and how to interpret raw binary data.',
    whyOccurs: 'Passing a float to %d or an integer to %f causes printf to read the incorrect number of bits or decode IEEE-754 floating point bits as integers, printing garbled numbers like 0 or garbage values.',
    incorrectCode: `float pi = 3.14159;
printf("Pi is: %d\\n", pi); // %d expects integer, gets float`,
    correctCode: `float pi = 3.14159f;
printf("Pi is: %.2f\\n", pi); // %.2f formats float with 2 decimals`,
    prevention: 'Match `%d`/`%i` with `int`, `%f` with `float`/`double`, `%c` with `char`, `%s` with string pointers `char*`, `%p` with pointers.',
    difficulty: 'beginner',
    tags: ['printf', 'scanf', 'Types', 'Formatting'],
    practiceQuestion: {
      question: 'What is the correct format specifier to print a double with 3 decimal places?',
      options: ['%.3f', '%d.3', '%3s', '%f.3'],
      correctIndex: 0,
      explanation: 'In C format strings, precision follows the dot: `%.3f` prints floating-point numbers rounded to 3 decimal digits.',
    },
  },

  // PYTHON ERRORS
  {
    id: 'py-name-error',
    language: 'python',
    name: 'NameError: name \'...\' is not defined',
    category: 'runtime',
    shortDesc: 'A variable, function, or module is referenced before it has been assigned or imported.',
    definition: 'Python looks up identifiers across Local, Enclosing, Global, and Built-in (LEGB) scopes. If the name is not present in any active scope, a NameError is raised.',
    whyOccurs: 'Common reasons: misspelling a variable name, calling a variable before assignment, forgetting quotes around a string literal, or forgetting to `import math`.',
    incorrectCode: `def greet():
    print(user_greeting) # user_greeting is not defined yet

greet()`,
    correctCode: `user_greeting = "Hello developer!"

def greet():
    print(user_greeting)

greet()`,
    prevention: 'Double check spelling of variable names (Python is case-sensitive). Ensure all variables are assigned before being read.',
    difficulty: 'beginner',
    tags: ['Python', 'Scope', 'LEGB', 'Variables'],
    practiceQuestion: {
      question: 'Why does `print(city)` raise a NameError if you intended to print the word "city"?',
      options: [
        'Because "city" without quotes is treated as a variable identifier, not a string literal',
        'Because print() cannot output letters in Python 3',
        'Because city is a reserved Python keyword',
        'Because variables in Python must start with an underscore',
      ],
      correctIndex: 0,
      explanation: 'Without quotes, Python assumes `city` is a variable name in memory. To output literal text, enclose in quotes: `print("city")`.',
    },
  },
  {
    id: 'py-indentation-error',
    language: 'python',
    name: 'IndentationError: unexpected indent / expected an indented block',
    category: 'syntax',
    shortDesc: 'Whitespace (tabs or spaces) at the beginning of a line violates Python structure rules.',
    definition: 'Unlike C/Java which use curly braces `{}` to define blocks, Python relies strictly on indentation level to determine code scope and hierarchy.',
    whyOccurs: 'Mixing tabs and spaces, forgetting to indent after a colon `:` (if/def/for/while/class), or adding random spaces at the beginning of a line.',
    incorrectCode: `def calculate_tax(price):
total = price * 1.18 # Missing indentation under def
return total`,
    correctCode: `def calculate_tax(price):
    total = price * 1.18 # Exactly 4 spaces indentation
    return total`,
    prevention: 'Configure your code editor to use 4 spaces for tabs and convert tabs to spaces automatically.',
    difficulty: 'beginner',
    tags: ['Indentation', 'Syntax', 'Whitespace', 'Scope'],
    practiceQuestion: {
      question: 'What happens if you have an empty `if` block with no indented code in Python?',
      options: [
        'Raises IndentationError: expected an indented block',
        'The loop runs infinitely',
        'Python automatically inserts a null operation',
        'It compiles with a warning',
      ],
      correctIndex: 0,
      explanation: 'Python requires at least one statement in a block. If you want an empty block, use the `pass` keyword.',
    },
  },
  {
    id: 'py-type-error',
    language: 'python',
    name: 'TypeError: can only concatenate str (not "int") to str',
    category: 'runtime',
    shortDesc: 'An operation was applied to an object of an inappropriate type.',
    definition: 'Python is strongly typed and does not automatically coerce integers to strings during the `+` concatenation operation.',
    whyOccurs: 'Attempting `"Score: " + 100` instead of converting 100 to a string or using formatted f-strings.',
    incorrectCode: `age = 21
message = "I am " + age + " years old" # Error: string + int`,
    correctCode: `age = 21
message = f"I am {age} years old" # Modern f-string handles conversion
# Or: "I am " + str(age) + " years old"`,
    prevention: 'Use Python 3.6+ f-strings (`f"Result: {val}"`) for clean and safe string interpolation without manual `str()` casting.',
    difficulty: 'beginner',
    tags: ['Types', 'Strong Typing', 'String Concatenation', 'f-strings'],
    practiceQuestion: {
      question: 'Which is the most idiomatic Pythonic way to combine variables into a text message?',
      options: [
        'f"User {user_id} scored {points} points"',
        '"User " + user_id + " scored " + points',
        'concat("User ", user_id, " scored ")',
        'str.join("User", user_id, points)',
      ],
      correctIndex: 0,
      explanation: 'f-strings (formatted string literals) provide readable, concise, and performant formatting with automatic type representation.',
    },
  },

  // JAVASCRIPT ERRORS
  {
    id: 'js-type-error-undefined',
    language: 'javascript',
    name: 'TypeError: Cannot read properties of undefined (reading \'...\')',
    category: 'runtime',
    shortDesc: 'Attempted to access a property or method on a variable that is `undefined` or `null`.',
    definition: 'JavaScript throws a TypeError whenever property accessor (`obj.prop` or `obj[key]`) is applied to `undefined` or `null` because primitives cannot hold properties.',
    whyOccurs: 'Asynchronous API response hasn\'t arrived yet, an object key was misspelled, or an array lookup returned undefined.',
    incorrectCode: `const user = response.data; // undefined if API failed
console.log(user.profile.avatarUrl); // Crashes if user is undefined!`,
    correctCode: `const user = response?.data;
// Safe optional chaining: returns undefined instead of throwing error
console.log(user?.profile?.avatarUrl ?? "default-avatar.png");`,
    prevention: 'Use Optional Chaining (`?.`) and Nullish Coalescing (`??`) operators introduced in ES2020 to safely access deeply nested properties.',
    difficulty: 'intermediate',
    tags: ['JavaScript', 'TypeError', 'Optional Chaining', 'Undefined', 'Null'],
    practiceQuestion: {
      question: 'What will `const city = user?.address?.city;` evaluate to if `user.address` is undefined?',
      options: [
        'Evaluates safely to `undefined` without throwing a crash',
        'Throws a fatal TypeError in browser',
        'Evaluates to boolean `false`',
        'Evaluates to string "[object Object]"',
      ],
      correctIndex: 0,
      explanation: 'Optional chaining (`?.`) short-circuits to `undefined` immediately when any step in the chain is nullish.',
    },
  },
  {
    id: 'js-reference-error',
    language: 'javascript',
    name: 'ReferenceError: ... is not defined / TDZ Error',
    category: 'runtime',
    shortDesc: 'Referenced a variable that does not exist in the current scope or accessed `let`/`const` before declaration (Temporal Dead Zone).',
    definition: 'Variables declared with `let` and `const` are hoisted to the top of the block, but cannot be accessed until their declaration line is executed (Temporal Dead Zone).',
    whyOccurs: 'Accessing `let count` before `let count = 5`, spelling errors, or accessing a variable declared inside a function from outside.',
    incorrectCode: `console.log(score); // ReferenceError: Cannot access 'score' before initialization
let score = 100;`,
    correctCode: `let score = 100;
console.log(score); // Correct: declared and initialized first`,
    prevention: 'Always declare variables at the top of their enclosing scope before using them.',
    difficulty: 'beginner',
    tags: ['ReferenceError', 'Scope', 'TDZ', 'Hoisting'],
    practiceQuestion: {
      question: 'What is the "Temporal Dead Zone" (TDZ) in JavaScript?',
      options: [
        'The period between entering block scope and the variable declaration where `let`/`const` cannot be accessed',
        'A memory leak caused by setTimeout',
        'The time a Promise spends in pending state',
        'A browser rendering delay during heavy computations',
      ],
      correctIndex: 0,
      explanation: 'TDZ is the state between block entry and the variable\'s declaration statement, during which accessing the variable throws ReferenceError.',
    },
  },

  // JAVA ERRORS
  {
    id: 'java-null-pointer-exception',
    language: 'java',
    name: 'NullPointerException (NPE)',
    category: 'runtime',
    shortDesc: 'JVM attempted to access a method or field on a reference variable that points to null.',
    definition: 'In Java, reference variables store memory addresses of objects on the heap. If a variable contains `null`, it points nowhere; invoking methods on it causes the JVM to throw java.lang.NullPointerException.',
    whyOccurs: 'Uninitialized object fields, methods returning null, calling `.equals()` on a null variable, or unboxing a null wrapper class (e.g. `Integer`).',
    incorrectCode: `String input = null;
if (input.equals("admin")) { // Crashes with NullPointerException!
    System.out.println("Access granted");
}`,
    correctCode: `String input = null;
// Safe: "Yoda conditions" or Objects.equals
if ("admin".equals(input)) { 
    System.out.println("Access granted");
}`,
    prevention: 'Put literal strings first in `.equals()` (`"expected".equals(variable)`), use `Objects.requireNonNull()`, or use Java 8 `Optional<T>`.',
    difficulty: 'beginner',
    tags: ['Java', 'NullPointerException', 'NPE', 'Objects.equals'],
    practiceQuestion: {
      question: 'Why does `"admin".equals(input)` NOT crash if `input` is null?',
      options: [
        'Because the literal `"admin"` is a valid String object, and its `.equals()` method handles `null` parameter safely by returning `false`',
        'Because Java skips the comparison when it sees null',
        'Because String literals in Java cannot be compared with null',
        'Because the JVM auto-converts null to an empty string',
      ],
      correctIndex: 0,
      explanation: '`"admin"` is guaranteed non-null. The `String.equals(Object other)` implementation explicitly checks `if (other == null) return false;`.',
    },
  },
  {
    id: 'java-array-index-out-of-bounds',
    language: 'java',
    name: 'ArrayIndexOutOfBoundsException',
    category: 'runtime',
    shortDesc: 'An array has been accessed with an illegal index (either negative or greater than or equal to array size).',
    definition: 'Java arrays are 0-indexed with a fixed length `arr.length`. Valid indices range strictly from `0` to `arr.length - 1`.',
    whyOccurs: 'Writing `i <= arr.length` instead of `i < arr.length` in loop conditions is the most common off-by-one mistake.',
    incorrectCode: `int[] scores = {90, 85, 95};
for (int i = 0; i <= scores.length; i++) { // Error on last iteration i=3
    System.out.println(scores[i]);
}`,
    correctCode: `int[] scores = {90, 85, 95};
// Option 1: strict < condition
for (int i = 0; i < scores.length; i++) {
    System.out.println(scores[i]);
}
// Option 2: enhanced for-each loop
// for (int score : scores) { System.out.println(score); }`,
    prevention: 'Use enhanced for-each loops (`for (int val : array)`) when you don\'t need explicit indices to eliminate off-by-one bugs.',
    difficulty: 'beginner',
    tags: ['Arrays', 'Off-by-One', 'Loops', 'Bounds'],
    practiceQuestion: {
      question: 'For an array `int[] arr = new int[5];`, what is the index of the last valid element?',
      options: ['4', '5', '0', '6'],
      correctIndex: 0,
      explanation: 'Since array indexing starts at 0, the elements are at indices 0, 1, 2, 3, and 4. Accessing index 5 throws ArrayIndexOutOfBoundsException.',
    },
  },
];
