'use strict';

window.MyReact = (() => {
  let hooks = [];
  let hookIndex = 0;
  let renderPending = false;
  let _App = null;
  let _container = null;

  const renderApp = () => {
    _App(_container);
    renderPending = false;
    hooks = hooks.length > hookIndex ? hooks.slice(0, hookIndex) : hooks;
    hookIndex = 0;
  };

  const render = (App, container) => {
    _App = App;
    _container = container;
    renderApp();
  };

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

  const useState = initialValue => {
    hooks[hookIndex] = hooks[hookIndex] || initialValue; // type: any
    const idx = hookIndex; // for setState's closure!
    const setState = newState => {
      if (!Object.is(hooks[idx], newState)) {
        if (!renderPending) {
          setTimeout(renderApp);
          renderPending = true;
        }
        hooks[idx] = newState;
      }
    };
    return [hooks[hookIndex++], setState];
  };

  const useRef = initialValue => {
    hooks[hookIndex] = hooks[hookIndex] || { current: initialValue };
    return hooks[hookIndex++];
  };

  return { render, useState, useEffect, useRef };
})();
