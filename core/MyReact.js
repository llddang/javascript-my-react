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
    _hooks[_currentHookIdx] = _hooks[_currentHookIdx] || initialValue;

    const hookIdx = _currentHookIdx;
    function setState(newValue) {
      _hooks[hookIdx] = newValue;
      _render();
    }

    return [_hooks[_currentHookIdx++], setState];
  }

  return { createRoot, render, useState };
}

export const { createRoot, render, useState } = MyReact();
