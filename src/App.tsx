import "./App.css";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Chart from "./components/Chart";

export type Category = {
  category: string;
  value: number;
};

const fetchCategories = (): Promise<Category[]> =>
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
    </div>
  );
}

export default App;
