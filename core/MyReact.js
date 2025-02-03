export default function MyReact() {
  let _root = null;
  let _rootComponent = null;
  let _state = null;

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

  function useState(initialValue) {
    _state = _state ?? initialValue;

    function setState(newValue) {
      _state = newValue;
      _render();
    }

    return [_state, setState];
  }

  return { createRoot, render, useState };
}

export const { createRoot, render, useState } = MyReact();
