import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import * as Tooltip from "@radix-ui/react-tooltip";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <Tooltip.Provider delayDuration={100}>
        <Tooltip.Root>
          <svg width="100px" height="100px">
            <Tooltip.Trigger asChild>
              <circle cx="50px" cy="50px" r="5px" />
            </Tooltip.Trigger>
          </svg>
          <Tooltip.Portal>
            <Tooltip.Content className="TooltipContent" sideOffset={5}>
              Vite + React Tooltip
              <Tooltip.Arrow className="TooltipArrow" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
