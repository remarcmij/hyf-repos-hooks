'use strict';

window.MyReact = (() => {
  const hooks = [];
  let hookIndex = 0;
  let isRenderScheduled = false;
  let _App = null;
  let _container = null;

  /**
   * Execute a render cycle.
   */
  const render = () => {
    // Render the main App component (which in turn is
    // responsible for rendering its child components).
    _App(_container);

    // Reinitialize for next render cycle
    isRenderScheduled = false;
    hooks.length = hookIndex;
    hookIndex = 0;
  };

  /**
   * Register the main app component and its mount point and initiate a first render cycle/
   * @param {Function} App constructor function for the main component
   * @param {HTMLElement} container parent element where the component should be mounted.
   */
  const renderDOM = (App, container) => {
    _App = App;
    _container = container;
    render();
  };

  /**
   * Simple useEffect hook implementation.
   * @param {Function} cb Function to be called back conditionally depending on dependencies.
   * @param {*} depArray Dependency array (optional)
   */
  const useEffect = (cb, depArray) => {
    const oldDeps = hooks[hookIndex]; // type: array | undefined
    let hasChanged = true;
    if (oldDeps) {
      hasChanged = depArray.some((dep, i) => !Object.is(dep, oldDeps[i]));
    }
    if (hasChanged) cb();
    hooks[hookIndex] = depArray;
    hookIndex++; // done with this hook
  };

  /**
   * Create a setState function with closed-in index value.
   */
  const setState = idx => {
    return newState => {
      // If the new state is equal to the current state
      // then we're done.
      if (Object.is(newState, hooks[idx][0])) return;

      // Update the state value.
      hooks[idx][0] = newState;

      // Any state change should trigger a new render cycle.
      if (!isRenderScheduled) {
        // Schedule a new render cycle when the JavaScript engine
        // has finished its current "run-to-completion".
        setTimeout(render);
        isRenderScheduled = true;
      }
    };
  };

  /**
   * Simple useState hook implementation.
   * @param {*} initialValue
   */
  const useState = initialValue => {
    hooks[hookIndex] = hooks[hookIndex] || [initialValue, setState(hookIndex)];
    return hooks[hookIndex++];
  };

  /**
   * Simple useRef hook implementation
   * @param {*} initialValue
   */
  const useRef = initialValue => {
    hooks[hookIndex] = hooks[hookIndex] || { current: initialValue };
    return hooks[hookIndex++];
  };

  return { renderDOM, useState, useEffect, useRef };
})();
