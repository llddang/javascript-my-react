export default function MyReact() {
  let _root = null;
  let _rootComponent = null;

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

  return { createRoot, render };
}

export const { createRoot, render } = MyReact();
