# Exam 1 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

## Q: What is the difference between a dynamic asset and a static asset?
A: Static assets are objects (eg. HTML/CSS files, images) you send to the user that the server does not change. The webserver will send the contents of the static file from the filesystem. The content won't change from request to request.
On the other hand, dynamic asset refers to file doesn't exist as a file. It is generated in response to the request, the content of dynamic asset keeps on changing based on user request.

## Q: What is the difference between a relative and absolute file path in an href?  What is the "webserver root/document root" and how do absolute/relative paths relate to this document root?
A: A Relative Path is based on navigation from the path of the currently loaded page, relative to the current folder. Absolute Paths are different paths on the same server. 
The "document root" is how the webserver treats requests - loads files for document requests. It is the root directory of the absolute path.

## Q: What is the difference between server-side and client-side JS?
A: The source code of client-side JS is visible to the user and runs on the user's computer browser.
But server-side is not visible to the user, because the output of the server-side is an HTML page. And it runs on the web server, users don't have the access to render the page.

## Q: What are the differences between `var`, `const`, and `let`, and when should you use each of them?
A: `var` is hoisted, means the variable declaration and acts as if it at the top of the function, but `const` and `let` are not hoisted;
`var` isn't block-scoped, it's function scoped, it allows updated and re-declared within its scope;
`const` and `let` are block-scoped, `const` can't re-assigned, but
`let` can be re-assigned.
`var` should be used only for older JS engines. And we use `const` most for communication. `let` can be used when we want to re-assign values.

## Q: What are the 4 ways to create inheritance in JS? (no examples needed, just a sentence describing each)
A: (1)Constructor Function: use `new` keyword on a function call, then the `prototype` property is assigned as the prototype of the new object
(2)Object.create: use `Object.create()` to make a new object, with the new object's prototype set to passed object.
(3)ES6 classes: just use the `class` keyword in ES6, with the parent class defined first, child class can simply inherit from it.
(4)Brute Force Prototype Assignment: set yhe prototype directly, use `Object.setPrototypeOf(child, parent)`.

## Q: Give a short code demonstration of 1 way to create JS inheritance to __inherit__ a method named "purr".
```javascript
// use ES6 Classes
class Cat {
	constructor(name) {
		this.name = name;
	}
	purr() {
		console.log(`${this.name} is purring`);
	}
}

const kiki = new Cat('Kiki');
kiki.purr();
```

## Q: Give a short code demonstration of a different way to create JS inheritance to __inherit__ a method named "hiss".
```javascript
// use Object.create()
const cat = {
	hiss : function() {
		console.log(`${this.name} is hissing`);
	}
};
const lala = Object.create(cat);
lala.name = 'Lala';
lala.hiss();
```

## Q: Explain what a callback is, and give an example.
A: A callback is a function passed to another function, so that the receiving function gets control over.
```javascript
function greeting(name) {
  alert('Hello ' + name);
}

function processInput(callback) {
  var name = prompt('Please enter your name.');
  callback(name);
}

processInput(greeting);
```

## Q: What are the words that would correctly fill in the space in this sentence:

"If a function using `this` is `_used as callback_`, then `this` will not have the intended implicit value"

## Q: In CSS, what does it mean "You shouldn't name your classes after what they look like"?   Why?  Give an example of a class that is well named and a class that is poorly named.
A: It means we shouldn't give the classes name base on what they look like, on the other hand, we need to give them semantic class names, since we maybe change the looks in the future but not change the functionalities.
E.g. good named: `class="user-info"`; bad named:`class="text-square"`
