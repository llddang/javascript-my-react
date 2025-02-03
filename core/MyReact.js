export default function MyReact() {
  let _root = null;

  function createRoot(root) {
    _root = root;
    return { render };
  }
  function render(Component) {
    const comp = Component();
    _root.innerHTML = comp;
  }

  return { createRoot, render };
}

export const { createRoot, render } = MyReact();
