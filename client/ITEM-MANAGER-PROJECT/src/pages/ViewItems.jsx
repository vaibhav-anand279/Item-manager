import React, { useState } from "react";
import ItemCard from "../components/ItemCard";
import ItemModal from "../components/ItemModal";

const ViewItems = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Items</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
        ))}
      </div>
      {selectedItem && <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </div>
  );
};

export default ViewItems;