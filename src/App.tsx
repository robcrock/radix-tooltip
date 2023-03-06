import "./App.css";
import * as Tooltip from "@radix-ui/react-tooltip";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Chart from "./components/Chart";

async function getCategories() {
  const response = await fetch("/data/categories.json");
  const json = await response.json();
  // console.log("data", data);
  return json;
}

const fetchCategories = (): Promise<Any[]> =>
  axios.get("/data/categories.json").then((response) => response.data);

function App() {
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const isLoading = !data;

  if (isLoading) {
    return <p>Loading…</p>;
  }

  console.log("data", data);

  return (
    <div className="App">
      <Chart
        data={data}
        width={400}
        height={400}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      />
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
    </div>
  );
}

export default App;
