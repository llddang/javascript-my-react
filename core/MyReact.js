export default function MyReact() {
  let _root = null;
  let _rootComponent = null;
  let _hooks = [],
    _currentHookIdx = 0;
  let _deps = null;

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

  function useEffect(callback, depArray) {
    const hasNoDeps = !depArray;
    const hasChangedDeps = _deps
      ? !depArray.every((el, i) => el === _deps[i])
      : true;

    if (hasNoDeps || hasChangedDeps) {
      callback();
      _deps = depArray;
    }
  }

  return { createRoot, render, useState, useEffect };
}

export const { createRoot, render, useState, useEffect } = MyReact();
