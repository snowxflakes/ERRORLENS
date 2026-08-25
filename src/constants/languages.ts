import { LanguageConfig } from '../types';

export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  {
    id: 'c',
    name: 'C',
    extension: '.c',
    monacoLang: 'c',
    badgeColor: 'from-blue-600 to-indigo-600',
    iconName: 'Code',
    sampleDescription: 'Missing semicolon in printf statement',
    popularErrors: ['Missing Semicolon', 'Segmentation Fault', 'Format Specifier Mismatch', 'Array Out of Bounds'],
    sampleBuggyCode: `#include <stdio.h>

int main() {
    int age = 20;
    printf("Welcome to ErrorLens\\n")
    printf("Your age is: %d\\n", age);
    return 0;
}`,
  },
  {
    id: 'cpp',
    name: 'C++',
    extension: '.cpp',
    monacoLang: 'cpp',
    badgeColor: 'from-sky-600 to-blue-700',
    iconName: 'Code2',
    sampleDescription: 'Vector out of range access and missing std:: qualifier',
    popularErrors: ['Vector Subscript Out of Range', 'Undefined Reference', 'Missing Include <iostream>', 'Pointer to Deallocated Memory'],
    sampleBuggyCode: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> numbers = {10, 20, 30};
    
    // Accessing an index that does not exist (vector size is 3, indices 0, 1, 2)
    std::cout << "Fourth number is: " << numbers.at(3) << std::endl;
    
    return 0;
}`,
  },
  {
    id: 'python',
    name: 'Python',
    extension: '.py',
    monacoLang: 'python',
    badgeColor: 'from-amber-500 to-emerald-600',
    iconName: 'Terminal',
    sampleDescription: 'NameError: using variable before declaration and indentation error',
    popularErrors: ['NameError: variable not defined', 'IndentationError: unexpected indent', 'TypeError: can only concatenate str to str', 'IndexError: list index out of range'],
    sampleBuggyCode: `def calculate_average(scores):
    total = sum(scores)
    # Using 'count' which was never defined (should be len(scores))
    average = total / count
    return average

test_scores = [85, 90, 78, 92]
result = calculate_average(test_scores)
print(f"The average is: {result}")`,
  },
  {
    id: 'java',
    name: 'Java',
    extension: '.java',
    monacoLang: 'java',
    badgeColor: 'from-orange-600 to-red-600',
    iconName: 'Coffee',
    sampleDescription: 'NullPointerException trying to invoke method on null string',
    popularErrors: ['NullPointerException', 'ArrayIndexOutOfBoundsException', 'Non-static variable cannot be referenced', 'Type mismatch: cannot convert'],
    sampleBuggyCode: `public class StudentReport {
    public static void main(String[] args) {
        String studentName = null;
        
        // Calling .length() or .toUpperCase() on null causes NullPointerException
        int nameLength = studentName.length();
        
        System.out.println("Student: " + studentName + " (Length: " + nameLength + ")");
    }
}`,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    extension: '.js',
    monacoLang: 'javascript',
    badgeColor: 'from-yellow-500 to-amber-500',
    iconName: 'FileCode',
    sampleDescription: 'TypeError: Cannot read properties of undefined (reading "name")',
    popularErrors: ['TypeError: Cannot read properties of undefined', 'ReferenceError: x is not defined', 'SyntaxError: Unexpected token', 'Unhandled Promise Rejection'],
    sampleBuggyCode: `function getUserProfile(user) {
    // If user is undefined or missing 'details', this crashes
    console.log("Loading user: " + user.name);
    console.log("City: " + user.details.city);
}

// Passed null/undefined object
getUserProfile(undefined);`,
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    extension: '.ts',
    monacoLang: 'typescript',
    badgeColor: 'from-blue-500 to-cyan-500',
    iconName: 'Cpu',
    sampleDescription: 'Property does not exist on type and missing required properties',
    popularErrors: ['Type "X" is not assignable to type "Y"', 'Property does not exist on type', 'Object is possibly "undefined"'],
    sampleBuggyCode: `interface User {
  id: number;
  email: string;
  isActive?: boolean;
}

function printUser(u: User) {
  // Property 'role' does not exist on type 'User'
  console.log(\`User ID: \${u.id}, Role: \${u.role}\`);
}

printUser({ id: 101, email: "alex@example.com" });`,
  },
  {
    id: 'go',
    name: 'Go',
    extension: '.go',
    monacoLang: 'go',
    badgeColor: 'from-cyan-600 to-teal-600',
    iconName: 'Binary',
    sampleDescription: 'Unused variable and nil pointer dereference',
    popularErrors: ['declared and not used', 'invalid memory address or nil pointer dereference', 'undefined variable'],
    sampleBuggyCode: `package main

import "fmt"

func main() {
    message := "Hello ErrorLens"
    count := 42 // Error: count declared and not used
    
    fmt.Println(message)
}`,
  },
  {
    id: 'rust',
    name: 'Rust',
    extension: '.rs',
    monacoLang: 'rust',
    badgeColor: 'from-orange-700 to-red-800',
    iconName: 'Boxes',
    sampleDescription: 'Borrow checker error: use of moved value',
    popularErrors: ['borrow of moved value', 'cannot borrow as mutable', 'mismatched types'],
    sampleBuggyCode: `fn main() {
    let s1 = String::from("hello");
    let s2 = s1; // Ownership moved to s2

    // Error: borrow of moved value: \`s1\`
    println!("{}, world!", s1);
}`,
  },
];
