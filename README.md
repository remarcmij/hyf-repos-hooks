# hyf-repos-hooks

The purpose of this plain vanilla JavaScript application is to demonstrate how a simple version of **React hooks** might be implemented and used. It is intended for demonstration purposes only.

- This app does not use React or JSX.
- There is no virtual DOM.
- As a consequence, the required DOM manipulation is inefficient as DOM elements are created and destroyed repeatedly.
- For simplicity, error handling is omitted.

This application is an implementation of the homework for the HYF JavaScript3 module, but now using hooks. The implementation of the hooks themselves was inspired and builds upon the work done by Shang Wang:

- [Deep dive: How do React hooks really work?](https://www.netlify.com/blog/2019/03/11/deep-dive-how-do-react-hooks-really-work/)
- [Getting Closure on Hooks (JSConf Edition)](https://www.swyx.io/speaking/react-hooks)

To install dependencies (only required to support ESLint):

```
npm install
```

To run the application, load the `src/index.html` in your browser. 

