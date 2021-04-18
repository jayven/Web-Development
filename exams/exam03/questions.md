# Exam 3 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

* NOTE: Because there is no coding portion to Exam 3, each of these questions is worth more to your grade than the questions on previous Exams!  Be sure to have answers you are confident shows your understanding!

## Q1: I have said that React JSX components are like functions and follow many of the same best practices.  Give at least 2 such best practices that are good for both JS functions and JSX Components.  (Give details!)
A: First, both JS functions and JSX Components should be concentrate on the minimum purpose and requiements but not too specific ("know" too much). We can't put too much in one JS function or one JSX component. It could help to keep the functions/Components reusable in different place. 
Second, both of them should keep concise and easy to understand. should not put too much logic in JSX and JS functions。 And naming should follow by their functionality. Better for maintaining and debugging in the future.


## Q2: I have said that using Progressive Enhancement (supporting both MPA and SPA) is best, but many places don't do so because of the effort involved.  What is at least one major reason not to use SPA alone?
A: There are some concerns when we use SPA alone: first, poor security when use SPA alone. Coding application server in frontend is a high risk in terms of security (available to be manipulated by user). 
Second, it is hard for long term maintainability. Like if the company needs to change the framework, it have to rewrite everything from 0. But for MPA, you can gradually make the change page to page.
Third, SPA is hard to handle unsaved changes. In a traditional web application, we can warn users of unsaved changes. But SPAs don’t navigate, which means this event won’t fire. So this needs reimplementing from scratch.


## Q3: The "proxy" setting in your package.json is required for the create-react-app dev server to call a local service, but not if you are calling a service that will always be on a different domain.  Explain what happens (in terms of network traffic) when your dev server is running on localhost port 3000 and the page makes a call to `/service` when you have "proxy" set to `http://localhost:4000` and a server running on localhost port 4000 that has the `/service` service.  hint: This should list and describe multiple request/response steps, and be clear where each request is coming from and where the response is received.
A: when dev server is running on localhost port 3000 and the page makes a call to `/service`, the dev server on localhost port 3000 will know that it's not a static asset and doesn't have this `/service`.
First, the frontend JS (browser) will make a request to dev server.
Then the dev server will proxy request to makes a request to the local server running on localhost port 4000. 
When local server on port 4000 received the request, it will send a response back to dev server on port 3000. Dev server will then send a response to the browser.


## Q4: Follow-up: Using the above scenario, list and describe what the network calls are like after you run `npm run build` and are only running all of your content on localhost port 4000 when your JSX makes a call to `/service`
A: 1) After run `npm run build`, it will build the static files with all static assets and the server will running and serving the request directly to the client. 
Next, we will run our app on `http://localhost:4000/` use `npm start`. When JSX makes a call to `/service`, app will make the request to localhost port 4000 and and access `/service`. And `http://localhost:4000/service` respond to `/service` call.
2) Yes, all the content are only running on port 4000

## Q5: I have said that you can only pass data "down" in React, not "up".  What does that mean?  Give simple code sample if that makes it easier to describe.
A: Because props are only passed from top to bottom by props in React’s component tree. There is no way to pass props up to a parent component.
In the following example, data from the parent components gets passed to child components as "props".
```
function Greeting({data}) {
  return (
    <div className="hello"> Hello
      <Sample data={data}>
    </div>
  );
}
```


## Q6: Follow-up: If you can't pass data "up" the component tree, how can anything that is "down" change data that is in an ancestor?  Give simple code samples if that makes it easier to describe.
A: Components can pass state to children components as props. Children's components could generate events or through return statements using callback by the parent to change data.
```
function Greeting({data}) {
  return (
    <div className="sample"> Hello, I'm {data}!
    </div>
  );
}
```


## Q7: Imagine you have a collection of student records, with each having a student id, a name, and an address. (an example of one item in the collection would be: { id: "654321", name: "Bao", address: "123 Main Street" })  Imagine you also have collection of steps to create a pizza, with each step having an ingredient, a quantity, and an instruction. (an example of one item in the collection would be the object { qty: "1 cup", ingredient: "shredded cheese", instructions: "sprinkle over pizza" })

Give a code sample where each collection is shown with at least one more element (2+ students for the first collection, 2+ pizza-making steps).  Make sure you make proper use of arrays and objects.  Explain why you've chosen each way of making a collection (e.g. Why you use an array for one or both, or why you use an object for one or both)
A: 
```
const students = {
  "654321": { id: "654321", name: "Bao", address: "123 Main Street" }, 
  "656321": { id: "656321", name: "Maru", address: "268 Tyler Street" }
}
```
Here I use object since each student have their id and we don't care about the order of the students. The time complexity to search is O(1).
```
const pizza = [{ qty: "1 cup", ingredient: "shredded cheese", instructions: "sprinkle over pizza" },{ qty: "1 cup", ingredient: "mushroom", instructions: "place them over pizza" }]
```
Here I use an array to store the steps because the steps of making a pizza need to follow the order. 


## Q8: How does inheritance in JS relate to a prototype?  Give a simple code sample if it helps explain.
A: When it comes to inheritance, JavaScript only has one construct: objects. Each object has a private property that holds a link to another object called its prototype. That prototype object has a prototype of its own, and so on until an object is reached with null as its prototype. 
```
//create an object demo from fuction f with its own properties a and b:
let f = function () {
   this.a = 1;
   this.b = 2;
}
let demo = new f(); // {a: 1, b: 2}

// add properties in f function's prototype
f.prototype.b = 3;
f.prototype.c = 4;

console.log(demo.a); // 1
// Is there an 'a' own property on demo? Yes, and its value is 1.

console.log(demo.b); // 2
// Is there a 'b' own property on demo? Yes, and its value is 2.
// The prototype also has a 'b' property, but it's not visited.

console.log(demo.c); // 4
// Is there a 'c' own property on demo? No, check its prototype.
// Is there a 'c' own property on demo.[[Prototype]]? Yes, its value is 4.

console.log(demo.d); // undefined
// Is there a 'd' own property on demo? No, check its prototype.
// Is there a 'd' own property on demo.[[Prototype]]? No, check its prototype.
// demo.[[Prototype]].[[Prototype]] is Object.prototype and there is no 'd' property by default, check its prototype.
// demo.[[Prototype]].[[Prototype]].[[Prototype]] is null, stop searching, no property found, return undefined.
```


## Q9: What is wrong about this code sample? `if( !username || username == undefined) { ` Be sure to explain why that is wrong.
A: In the code sample, seems like it's trying to check the variable - `username` value. In JS, `!username` can return `true` if username is "falsy", like null, NaN, 0, empty string or undefined (because these can be converted to `false`). 
`username == undefined` checks whether username is null or undefined. Only the strict equality operator(===) can check if username is undefined or not.
So this code sample is wrong, the check is useless.


## Q10: In your own words, what is decoupling?  What is an example of decoupling in a React app?  Why is this beneficial?
A: In my understanding decoupling is try to make certain code parts unnecessarily dependent on others. Such like, in react app, instead of putting all logic in one file we separate code into different components and each of them has its functionalities. Each component is independent and when we change some logics in one component and it won't affect another component. In the app development, it is a good way to maintain and future revise the code, all parts can be reusable.


## Q11: In React you should not read/write from/to the DOM directly.  If you wanted a button that changed the background color of an element between two choices, how would you change that color without modifying the style attribute of the element?  Be sure to describe how you make this happen using React.
A: In React it is a bad practice to directly manipulate the actual DOM since React changes are first applied in the virtual DOM and then only the difference is modified in the real DOM. Further, when the function is being called, there might be a chance that the DIV is not actually present in the real DOM.
However, we can use the `state` to change the color of the element. Have a state `color` which is by default the color we want, and onClick event trigger a method that updates the color state and re-renders UI based on it.
```
lass Button extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      button: true
    }
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      button:!this.state.button
    })
  }
  
  render() {
    return (
    <div className="container">
      <button className={this.state.button ? "buttonTrue": "buttonFalse"} onClick={this.onClick}>Click Me!</button>  
    </div>
    )
  } 
}
```


## Q12: Imagine you have a React application with an input field and a button.  When you click the button, it should call a service you have written and pass the value from the input field, and display a string returned in the service JSON on the page.  Also imagine that it is not working.  Describe at least two ways you could figure out if the problem is in the service code or if the problem is in the React code.  Hint: This question is about debugging, not coding
A: 1) Using Console statements to log it. On the web, we can achieve this by using `console.log()`. Then, to examine application state, for example, we can add `console.log(check)`. Next, check the result in the browser inspector. If we find `check` is show on console, it means the react code is ok, maybe there's some issues in service. Or we can add `console.log()` on service code and check it in same way.
This method is fast to implement, using a browser inspector is a more powerful approach since it gives a better picture of what’s going on.
2) Using the debugger in browser inspector. We can set up debugger by adding breakpoints. Then when refreshing the page, instead of running the application, the browser will pause rendering the page. Application is in a frozen state, then we can check line by line to see the error is shown in service or react code.


## Q13: How many times would the below code render (if there are no changes from outside this code), and what is the rendered output for each of those times, and what triggered (caused) the render?  Assume something DOES cause this to be rendered at least once.
```
import { useState } from 'react';
  function Demo() {
    const [count, setCount] = useState(0);
    if (!count) {
      setCount(1);
    }
    return (
      <div>{count}</div>
    );
  }
```
A: React state automatically re-render whenever there is a change in their state or props. In this sample code, we render twice.
-We declare a state variable called `count` and set it to `0`. React will remember its current value between re-renders (initial render). (here, count = 0)
-Then we check `!count`. Since in the initial state, the count is 0, here return `true`. So we call `setCount` to update the current `count` to `1`. React will then enqueues a re-render, passing the new `count` value to it.(the 2nd time render, count = 1)


## Q14: What happens with the below code when rendered and why?
```
import { useState, useEffect } from 'react';

function Demo() { 
  const [count, setCount] = useState(0);
  
  useEffect( () => { 
    Promise.resolve().then( () => { 
      setCount(count + 1);
    });
  }, [count]);
  return (
    <div>{count}</div>
  );
}
```
A: `useEffect` is called after each render and when `setState` is used inside of it, it will cause the component to re-render which will call `useEffect` and so on and so on. Here, the code will continue render forever with count value change.
Here we pass an `[count]` array as a second argument to `useEffect` like `useEffect(() => {....}, [])` which means that the effect function should be fired: after the `count` change. 

When we call function Demo, in the initial state, we set `count` to `0` and React will remember its current value between re-renders (initial render). 
The function passed to `useEffect` will run after render is committed to the screen. Here in this effect, we pass a second argument to `useEffect` that is the array of values that the effect depends on (`[count]`). So only if `count` changed, we need to do the `Promise.resolve()` method returns the `Promise` with adopting its eventual state. We update the state by call `setCount` to plus 1 to the current `count`. And each `setCount` will trigger re-rendering again with `count` change.


## Q15: What is the difference between `WHATEVER.json(...)` in browser-side code and server-side code?  (assume variables are named according to our normal practice)
A: 
In browser-side code: `.json()` can use to call the method to parse the response body from server. (since response object doesn't have parse body)

```
fetch('/people/')
  .then( response => response.json() )
  .then( body => console.log(body) );
```

In server-side code: Here we sending JSON data in the response and convert it into JSON. After that, we will get the result from the data key returned by the response. 

```
const people = {};
app.get('/people/', (req, res) => {
  res.json(Object.keys(people));
});
app.get('/people/:name', (req, res) => {
  const name = req.params.name;
  if(people[name]) {
    res.json(people[name]);
  } else {
    res.status(404).json({ error: `Unknown user: ${name}`});
  }
});
// .json(...) does res.send(JSON.stringify(...)), since express deals with string as input and processes it according to content-type provided, we need to convert our JSON payload into string.
``` 


## Q16: In our projects we had our services on the same server as our HTML/JS/CSS.  What would be different about the urls in our browser-side fetch code if our services were on a different server? (in production, not in development)
A: If our services were on a different server, our browser-side will fetch code on a different port. The browser request URL should be a full url with server name and port if the port was non-standard.


## Q17: In our projects we had our services on the same server as our HTML/JS/CSS.  What would be different about the responses from our server-side code if our services were on a different server? (in production, not in development)
A: 
The different of the responses is it need to have the CORS header if necessary to tell which origin is vaild. It means to show that it can use the resource from server from cross-domain.
```
const xhr = new XMLHttpRequest();
const url = 'https://bar.other/resources/public-data/';

xhr.open('GET', url);
xhr.onreadystatechange = someHandler;
xhr.send();
```
Next is server response. The request header of note is Origin, which shows that the invocation is coming from `https://foo.example`.
```
GET /resources/public-data/ HTTP/1.1
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Connection: keep-alive
Origin: https://foo.example
```


## Q18: If a browser navigates to `http://localhost:3000/page/start` on an express server set up in our conventional way with the below routes, list the web request(s)/response(s) involved, and what the user will see.  (Hint: If you are uncertain, you can set up and try this code!)

```
app.get('/page/start', (req, res) => { 
  res.redirect('/page/end');
});

app.get('/page/end', (req, res) => { 
  res.send('Hello World');
});
```
A: When page is loaded on `http://localhost:3000/page/start`, 
1) Here we defined a (callback) route handler function for HTTP GET requests to the site root ('/page/start'). 
The res.redirect() function redirect the user to a different path that we've created ('/page/end') by sending an HTTP response with status 302. When an HTTP client receives a response with status 302, it will send an HTTP request to the URL in the response, in this case `/page/end`.
2) Next, follows with redirect and it sends a GET `/page/end` request, the request argument contains information about the GET request, while the method calls `res.send()` on the response dispatches the string 'Hello World' to the browser. 
3) Then the user will get respond with `Hello World` on the page


## Q19: The web is stateless.  When we log in to websites, we have an experience that looks stateful (We do not have to log in to every page).  Assuming cookie-based sessions, how does this work?
A: Here each user will get a session id, the sid will be send back to server to check validation. And the session expire when the user closes browser.
When server start a new session, it will also set a session var. Then client changes the page, and sends cookies with the session id. 
Next, the server get the sidmof cookie `session[sid]` and check if the sid is valid (in database). If server find sid is valid, it will read the var on `$_SESSION superglobal`.

## Q20: I have said that "working code is the start of programming, not the end".  If "working" isn't what defines good code, what does?
A: I believe that good code needs to be easy to change, can be reusable, easy to understand with minimal effort. Function code should not too "coupled" to the rest of the code.



