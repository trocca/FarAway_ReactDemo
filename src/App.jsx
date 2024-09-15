import { useState } from 'react';
import './App.css';
import Form from './Components/Form';
import PackagingList from './Components/PackagingList';
import Stats from './Components/Stats';

const Logo = () => {
  return (
    <h1>🛫 Far Away 🏖️</h1>
  );
};


function App() {
  const [items, setItems] = useState([]);

  const handleAddItems = (item) => {
    setItems((items) => [...items, item]);
  };

  const handleDeleteItem = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const handleToggleItem = (id) => {
    setItems((items) =>
      items.map((item) => (item.id === id ? { ...item, packed: !item.packed } : item))
    );
  };

  const handleClearList = () => {
    setItems([]);
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackagingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
