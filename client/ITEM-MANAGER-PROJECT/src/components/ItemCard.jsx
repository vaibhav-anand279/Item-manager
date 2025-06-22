const ItemCard = ({ item, onClick }) => (
  <div className="border rounded p-4 shadow cursor-pointer hover:shadow-md" onClick={onClick}>
    <img src={item.cover} alt={item.name} className="w-full h-48 object-cover mb-2" />
    <h4 className="font-semibold">{item.name}</h4>
  </div>
);

export default ItemCard;