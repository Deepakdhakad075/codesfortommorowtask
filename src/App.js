
import "./App.css";
import Cards from "./components/Cards";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setItems } from "./redux/slices/ProductSlice";

import { setPageItems } from "./redux/slices/PageItems";

function App() {
 
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(true);


  const dispatch = useDispatch();

  const fetchData = async () => {
    const url = "https://jsonplaceholder.typicode.com/posts";
    const response = await fetch(url);
    const output = await response.json();

    dispatch(setItems(output));
    const firstSix = output.slice(0, 6);
    dispatch(setPageItems(firstSix));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

  
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center bg-purple-100">
<div className="w-[90vw] h-[100vh] border">
      <Cards loading={loading} isLoading={isLoading} setIsLoading={setIsLoading} />
    </div>
    </div>
    
  );
}

export default App;