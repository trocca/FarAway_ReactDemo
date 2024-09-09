import { useState } from 'react'
import './App.css'


const Logo = () => {
  return (
    <h1>🛫 Far Away 🏖️</h1>
  )
}

const Form = ({ onAddItems }) => {

  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip? 😎</h3>
      <select value={quantity} onChange={e => setQuantity(+e.target.value)}>
        {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
          <option value={num} key={num}>{num}</option>)
        )}
      </select>
      <input type="text" placeholder="Item..." value={description} onChange={e => setDescription(e.target.value)} />
      <button>Add</button>
    </form>
  )
}

const PackagingList = ({ items }) => {
  return (
    <div className="list">
      <ul>
        {items.map(item => (<Item key={item.id} item={item} />))}
      </ul>
    </div>
  )
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description} - Quantity: {item.quantity} {item.packed ? "✅" : "❌"}
      </span>
      {/* <input type="checkbox" checked={item.packed} /> */}
    </li>
  )
}


function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list, and you are already packes X (X%)</em>
    </footer>
  )
}


function App() {

  const [items, setItems] = useState([]);


  const handleAddItems = (item) => {
    setItems(items => [item, ...items]);

    console.log("Items:", items);
    return
  }


  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackagingList items={items} />
      <Stats />
    </div>
  )
}

export default App;