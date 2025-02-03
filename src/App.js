import { createRoot, useState, useEffect } from "../core/MyReact.js";

const App = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState(() => "asdf");

  window.increase = () => setCount((prev) => prev + 1);
  window.decrease = () => setCount((prev) => prev - 1);
  window.changeText = (event) => setText(event.target.value);

  useEffect(() => {
    console.log(`count is changed to ${count}`);
    return () => console.log("count useEffect unmounted");
  }, [count]);

  useEffect(() => {
    console.log(`text is changed to ${text}`);
    return () => console.log("text Cleanup function is called.");
  }, [text]);

  return `
    <div>
      <h1>Hello World!</h1>
      <p>count : ${count}</p>
      <button onclick="increase()">+1</button>
      <button onclick="decrease()">-1</button>
      <p>text : ${text}</p>
      <input value="${text}" onchange="changeText(event)" />
    </div>`;
};

const root = createRoot(document.getElementById("root"));
root.render(App);
