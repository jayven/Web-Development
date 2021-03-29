# Exam 2 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

## Q1: The first rule I've given about REST services is that the URL should represent a resource.  What does that mean?  Give an example where a url DOES not represent a resource, then describe how to modify it so that it does.
A: It means URL represents a resource for client to interact with. 
For example, `HTTP Method /addstudent` couldn't represent a resource, but `HTTP Method /student` can represent a resource. The URL is often a noun (on the other hand, the HTTP method is the verb). We can say, the URL is the "thing" and the method is what you "do" to the thing.


## Q2: If the service returns the username as a plain text string (not JSON), what is wrong with the below and what would fix it? (Assume the service works without error)
```
  const username = fetch('/username');
  console.log(`user is named ${username}`);
``` 
A: `fetch()` return a promise. And promise resolve with a response object, to parse the body of the response, we need to call the method- `.json()` or `.text()`. We can fix it as follow:
```
	fetch('/username')
	.then (response => return response.json())
	.then(username => console.log(`user is named ${username}`));  
```


## Q3: What does it mean to "store your state in the DOM"?  Why shouldn't you do this?
A: "store your state in the DOM" means put and store the client-side code and data (->state) in DOM (Document Object Model).
We shouldn't do this because the DOM is supposed to be a view of data. The properties of DOM elements should be metadata for the elements themselves, not data from the model. This will cause security issue since users can find the data and code in DOM on browser easily, means everyone can view and change it. Also, if we modify the display, we also change the way to get state. As the display get complicated, then the state interactions will also get complicated.


## Q4: Explain the differences between a multiple-page-web application and single-page-web application.  Be sure to fully demonstrate your understanding.
A: A single-page application is an app that works inside a browser and does not require page reloading during use. SPA can cache any local storage effectively, it has no page reloads, no extra wait time. It requests the markup and data independently and renders pages straight in the browser.
Multiple-page applications work in a “traditional” way. Every change on data back to server requests rendering a new page from the server in the browser. Each time MPA will redirect to a new url and reload a new page, then downloads all resources again.


## Q5: What is Progressive Enhancement?  What is the difference in an SPA that uses Progressive Enhancement compared to an SPA that doesn't use Progressive Enhancement?
A: Progressive Enhancement is a development approach that taking a non-client-side javascript web app and argument it with Js. Developer can build core web content first and then build more layers to the web app to create and enhance more features.
SPA with Progressive Enhancement will continue working even after user turn off client-side JS. It is a good way for ensuring backend security. On the other hand, SPA without Progressive Enhancement cannot work without client-side Js. It could separate page into different views.


## Q6: Explain how a REST service is or is not similar to a dynamic asset.
A: a REST service is similar to a dynamic asset since both of them are depends on user interaction and rendered result according to user's request.


## Q7: Give an example of a piece of information you should not store in a cookie, and why you should not store it that way.
A: Cookie is client side storage, it has limited security (everyone can see it), so we should not store the security info in cookie, eg. passwords, personal information.


## Q8: Explain why it is useful to separate a function that fetches data from what you do with that data
A: Separate a function that fetches data is useful to reduce volumn of data to transfer by each request. Also, it helps developer do changes and maintain codes, the function can be more understanble and reuse easily.


## Q9: Explain why try/catch is useless when dealing with asynchronous errors (assume you aren't using async/await)
A: Because try/catch is finish before we run call back function, the call back function should be add to event queue, they won't catch anything.
eg. when using express.js, we getting some data from the database. If error happens in the call back of the database call, our "try/catch" in the beginning will not catch that.

## Q10: Is separation of concerns a front end issue, a server-side issue, or both?  Describe an example the demonstrates your answer.
A: Separation of concerns is both front end and server-side issue. SOC can make code more flexible, easy to change and understand and also could reusable.
For example, in code as follow is a service call that covers a lot, like: attach an event listener, disable a buttom, read in data from form/input fields, send call, read result, etc.
```
const addButton = document.querySelector('.add-task');
addButton.addEventListener('click', (e) => {
	e.preventDefault();
	const taskText = document.querySelector('.task-to-add');
	addButton.innerText = "...";
	addButton.disabled = true;
	fetch('/tasks', {
		method: 'POST',
		headers: new Headers({
		'content-type': 'application/json'
		}),
		body: JSON.stringify({ text: taskText });
	})

```
The good example could separate tasks into pieces, should not couple to the HTML. This is the example SOC for front-end. It can be resued for different purpose and do not change if the HTML change. 
```
const addButton = document.querySelector('.add-task');
const taskList = document.querySelector('.tasks');
addButton.addEventListener('click', (e) => {
	e.preventDefault();
	const origText = setSpin({button: addButton, spin: true});
	const formData = gatherFormInfo();
	addTask(formData)
	.then( taskList => {
		refreshList(taskList);
		resetNewTaskInput();
	})
	//...
});
```

