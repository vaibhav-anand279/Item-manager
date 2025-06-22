import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddItem = ({ setItems }) => {
  const [form, setForm] = useState({ name: "", type: "", description: "", cover: null, images: [] });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const toBase64 = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });

  const handleCover = async (e) => {
    const base64 = await toBase64(e.target.files[0]);
    setForm({ ...form, cover: base64 });
  };

  const handleImages = async (e) => {
    const files = Array.from(e.target.files);
    const images = await Promise.all(files.map(toBase64));
    setForm({ ...form, images });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5001/api/items", form);
    setItems((prev) => [...prev, res.data]);
    setSuccess(true);
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add New Item</h2>
      {success && <p className="text-green-600">Item successfully added!</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Item Name" required className="input w-full p-2 border rounded" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <select required className="input w-full p-2 border rounded" onChange={(e) => setForm({ ...form, type: e.target.value })}>
          <option value="">Select Type</option>
          <option>Shirt</option>
          <option>Pant</option>
          <option>Shoes</option>
          <option>Sports Gear</option>
        </select>
        <textarea placeholder="Description" required className="input w-full p-2 border rounded" onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input type="file" accept="image/*" required onChange={handleCover} className="block" />
        <input type="file" accept="image/*" multiple onChange={handleImages} className="block" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default AddItem;