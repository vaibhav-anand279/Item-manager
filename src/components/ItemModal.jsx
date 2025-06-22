import axios from "axios";

const ItemModal = ({ item, onClose }) => {
  const handleEnquire = async () => {
    await axios.post("http://localhost:5001/api/enquire", { name: item.name });
    alert("Enquiry sent!");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full relative">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>✖</button>
        <h2 className="text-lg font-bold mb-2">{item.name}</h2>
        <p className="text-sm text-gray-600 mb-2">{item.type}</p>
        <p className="mb-4">{item.description}</p>
        <div className="flex space-x-2 overflow-x-auto mb-4">
          {[item.cover, ...item.images].map((img, i) => (
            <img key={i} src={img} className="h-24 w-24 object-cover rounded" alt="" />
          ))}
        </div>
        <button onClick={handleEnquire} className="bg-blue-600 text-white px-4 py-2 rounded">Enquire</button>
      </div>
    </div>
  );
};

export default ItemModal;