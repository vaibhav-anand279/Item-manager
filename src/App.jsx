import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import AddItem from "./pages/AddItem";
import ViewItems from "./pages/ViewItems";

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5001/api/items").then((res) => {
      const parsed = res.data.map((item) => ({
        ...item,
        images: JSON.parse(item.images || "[]"),
      }));
      setItems(parsed);
    });
  }, []);

  return (
    <Router>
      <nav className="bg-gray-100 p-4 flex gap-4 shadow">
        <Link to="/" className="text-blue-600 font-semibold">View Items</Link>
        <Link to="/add" className="text-blue-600 font-semibold">Add Item</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ViewItems items={items} />} />
        <Route path="/add" element={<AddItem setItems={setItems} />} />
      </Routes>
    </Router>
  );
};

export default App;
