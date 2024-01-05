import React from "react";
import "./App.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
function App() {
  const getData = async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    console.log("hitting api");
    return res.data;
  };

  const query = useQuery({
    queryKey: ["postsData"],
    queryFn: getData,
    retry: 5,
    retryDelay: 1000,
    networkMode: "always",
    refetchOnWindowFocus: false,
  });

  console.log(query.fetchStatus);
  return (
    <div>
      <h1 className="text-red-400 text-3xl font-bold">
        we are going to start our react query process
      </h1>
      {query.error ? (
        <h1>{query.error.message}</h1>
      ) : query.isLoading ? (
        <h1>Loading data, please wait</h1>
      ) : (
        <div>
          {query.data.map((item: { id: number; title: string }) => (
            <h1 key={item?.id}>{item.title}</h1>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
