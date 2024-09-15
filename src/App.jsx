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

const PackagingList = ({ items, onDeleteItem, onToggleItem }) => {
  return (
    <div className="list">
      <ul>
        {items.map(item => (<Item key={item.id} item={item} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />))}
      </ul>
    </div>
  )
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input type="checkbox" checked={item.packed} onChange={ () => onToggleItem(item.id)}/>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description} - Quantity: {item.quantity} {item.packed ?
          "✅" :
          <button onClick={() => onDeleteItem(item.id)}>❌</button>
        }
      </span>
      {/* <input type="checkbox" checked={item.packed} /> */}
    </li>
  )
}


function Stats({items}) {
  
  const totalItems = items.length;
  const totalPackedItems = items.filter(item => item.packed).length;
  const totalPiecesInSuitcase = items.reduce((acc, item) => acc + item.quantity, 0);
  const percentagePacked = totalItems === 0 ? 0 : Math.round((totalPackedItems / totalItems) * 100);

  return (
    <footer className="stats">
      <em>`You have {+totalItems} items on list, and you are already packed {+totalPackedItems} ({percentagePacked}%) - Total pcs. {totalPiecesInSuitcase}`</em>
    </footer>
  )
}


function App() {

  const [items, setItems] = useState([]);

  // const totalPackedItems = items.reduce((acc, item) => item.packed ? acc + item.quantity : acc, 0);


  const handleAddItems = (item) => {
    setItems(items => [...items, item]);

    console.log("Items:", items);
    return
  }

  
  const handleDeleteItem = (id) => {
    console.log("Delete item with id:", id);
    setItems(items => items.filter(item => item.id !== id));

  }

  const handleToggleItem = (id) => {
    console.log("Toggled item with id:", id);
    setItems(items => items.map(item => item.id === id ? {...item, packed: !item.packed} : item));
  }


  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackagingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem}/>
      <Stats items={items} />
    </div>
  )
}

export default App;