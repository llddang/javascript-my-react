export default function MyReact() {
  let _root = null;
  let _rootComponent = null;
  let _hooks = [],
    _currentHookIdx = 0;

  function createRoot(root) {
    _root = root;
    return { render };
  }
  function render(Component) {
    _rootComponent = Component;
    _render();
  }
  function _render() {
    const comp = _rootComponent();
    _root.innerHTML = comp;
  }

  function _render() {
    const comp = _rootComponent();
    _root.innerHTML = comp;
    _currentHookIdx = 0;
  }

  function useState(initialValue) {
    _hooks[_currentHookIdx] =
      _hooks[_currentHookIdx] ??
      (typeof initialValue === "function" ? initialValue() : initialValue);

    const hookIdx = _currentHookIdx;
    function setState(newValue) {
      if (typeof newValue === "function")
        _hooks[hookIdx] = newValue(_hooks[hookIdx]);
      else _hooks[hookIdx] = newValue;
      _render();
    }

    return [_hooks[_currentHookIdx++], setState];
  }

  const useEffect = (callback, depArray) => {
    const hasNoDeps = !depArray;
    const prevDeps = _hooks[_currentHookIdx]?.deps;
    const prevCleanUp = _hooks[_currentHookIdx]?.cleanUp;

    const hasChangedDeps = prevDeps
      ? !depArray.every((el, i) => el === prevDeps[i])
      : true;

    if (hasNoDeps || hasChangedDeps) {
      if (prevCleanUp) prevCleanUp();
      const cleanUp = callback();
      _hooks[_currentHookIdx] = { deps: depArray, cleanUp };
    }
    _currentHookIdx++;
  };

  return { createRoot, render, useState, useEffect };
}

export const { createRoot, render, useState, useEffect } = MyReact();
