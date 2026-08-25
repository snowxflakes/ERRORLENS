import { QuizQuestion } from '../types';

export const LEARNING_QUIZZES: QuizQuestion[] = [
  {
    id: 'quiz-c-semicolon',
    language: 'c',
    category: 'syntax',
    difficulty: 'beginner',
    title: 'Spot the Missing Token in C',
    codeSnippet: `#include <stdio.h>

int main() {
    int count = 5;
    printf("Starting countdown...\\n")
    for (int i = count; i > 0; i--) {
        printf("%d\\n", i);
    }
    return 0;
}`,
    question: 'Why will this C code fail to compile?',
    options: [
        'Missing semicolon at the end of the first printf statement on line 5',
        'Cannot declare "int i" inside the for loop in modern C',
        'printf cannot output integer formats with %d',
        'main function must return a float'
    ],
    correctIndex: 0,
    explanation: 'Line 5 `printf("Starting countdown...\\n")` lacks a closing semicolon. In C, statements must be terminated with a semicolon.',
    concept: 'Statement Termination in C',
    xp: 50,
  },
  {
    id: 'quiz-py-nameerror',
    language: 'python',
    category: 'runtime',
    difficulty: 'beginner',
    title: 'Python Variable Scope & Definition',
    codeSnippet: `def compute_discount(price, is_member):
    if is_member:
        discount = price * 0.20
    
    final_price = price - discount
    return final_price

print(compute_discount(100, False))`,
    question: 'What runtime error will occur when calling compute_discount(100, False)?',
    options: [
        'UnboundLocalError / NameError: local variable \'discount\' referenced before assignment',
        'TypeError: unsupported operand type for *',
        'SyntaxError: invalid boolean comparison',
        'ZeroDivisionError in calculate discount'
    ],
    correctIndex: 0,
    explanation: 'When `is_member` is `False`, the `if` block never executes, so `discount` is never created. Line 5 tries to use `discount`, resulting in an UnboundLocalError.',
    concept: 'Variable Initialization in Conditional Branches',
    xp: 60,
  },
  {
    id: 'quiz-js-async-type',
    language: 'javascript',
    category: 'runtime',
    difficulty: 'intermediate',
    title: 'JavaScript Asynchronous Promise Resolution',
    codeSnippet: `async function fetchUserName(userId) {
    return { id: userId, name: "Arunima" };
}

function displayGreeting() {
    const user = fetchUserName(101);
    console.log("Welcome back, " + user.name.toUpperCase());
}`,
    question: 'What happens when displayGreeting() is executed?',
    options: [
        'TypeError: Cannot read properties of undefined (reading \'toUpperCase\') because user is a Promise, not the resolved object',
        'Logs "Welcome back, ARUNIMA" successfully',
        'ReferenceError: fetchUserName is not defined',
        'SyntaxError: async cannot be used inside functions'
    ],
    correctIndex: 0,
    explanation: '`fetchUserName` is an `async` function, so calling it without `await` returns a `Promise`. `user.name` is therefore `undefined`, and calling `.toUpperCase()` on `undefined` causes a TypeError.',
    concept: 'Async/Await and Promise Unwrapping',
    xp: 75,
  },
  {
    id: 'quiz-java-null-pointer',
    language: 'java',
    category: 'runtime',
    difficulty: 'beginner',
    title: 'Java Safe String Comparison',
    codeSnippet: `public class Authenticator {
    public static boolean checkRole(String userRole) {
        return userRole.equalsIgnoreCase("ADMIN");
    }
}`,
    question: 'If checkRole(null) is passed, what error occurs and what is the standard Java idiom to fix it?',
    options: [
        'NullPointerException. Fix: "ADMIN".equalsIgnoreCase(userRole)',
        'ClassCastException. Fix: (String) userRole',
        'IndexOutOfBoundsException. Fix: userRole.charAt(0)',
        'StackOverflowError. Fix: create a recursive call'
    ],
    correctIndex: 0,
    explanation: 'Calling `.equalsIgnoreCase()` on a `null` variable throws `NullPointerException`. Inverting the call to `"ADMIN".equalsIgnoreCase(userRole)` is safe because string literals are never null.',
    concept: 'Yoda Expressions and Null-Safe Methods',
    xp: 60,
  },
  {
    id: 'quiz-cpp-bounds',
    language: 'cpp',
    category: 'runtime',
    difficulty: 'intermediate',
    title: 'C++ Array Index vs Vector .at()',
    codeSnippet: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> data = {1, 2, 3};
    std::cout << data.at(3) << std::endl;
    return 0;
}`,
    question: 'What does std::vector::at() do when passed an index that is out of bounds?',
    options: [
        'Throws a std::out_of_range exception',
        'Returns 0 quietly',
        'Silently returns garbage memory like raw array operator[]',
        'Resizes the vector automatically'
    ],
    correctIndex: 0,
    explanation: 'Unlike `data[3]` which performs no bounds-checking and leads to undefined behavior, `data.at(3)` performs bounds checking and throws `std::out_of_range`.',
    concept: 'C++ Safe Bounds Checking with .at()',
    xp: 70,
  },
  {
    id: 'quiz-python-mutable-default',
    language: 'python',
    category: 'logical',
    difficulty: 'advanced',
    title: 'Python Mutable Default Arguments',
    codeSnippet: `def append_item(item, bucket=[]):
    bucket.append(item)
    return bucket

list1 = append_item("A")
list2 = append_item("B")
print(list2)`,
    question: 'What is the output of print(list2), and what type of error is this considered?',
    options: [
        '[\'A\', \'B\'] — A classic logical error caused by mutable default arguments being evaluated once at function definition time',
        '[\'B\'] — Normal expected behavior',
        'TypeError: default arguments cannot be lists',
        'RuntimeError: duplicate item in bucket'
    ],
    correctIndex: 0,
    explanation: 'Default arguments in Python are evaluated once when the function is defined. Subsequent calls reuse the exact same list instance in memory, creating a subtle logical bug.',
    concept: 'Python Function Parameter Default Evaluation',
    xp: 100,
  },
];
