import React, { useState } from 'react';

const PackagingList = ({ items, onDeleteItem, onToggleItem, onClearList }) => {
    const [sortBy, setSortBy] = useState('orderInput');
    const [showModal, setShowModal] = useState(false);
  
    let sortedItems;
    switch (sortBy) {
      case 'orderPackedAZ':
        sortedItems = [...items].sort((a, b) => a.packed - b.packed || a.description.localeCompare(b.description));
        break;
      case 'orderAllAZ':
        sortedItems = [...items].sort((a, b) => a.description.localeCompare(b.description));
        break;
      default:
        sortedItems = items;
    }
  
    const handleClear = () => setShowModal(true);
    const confirmClear = () => {
      onClearList();
      setShowModal(false);
    };
    const cancelClear = () => setShowModal(false);
  
    return (
      <>
        <div className="list">
          <ul>
            {sortedItems.map((item) => (
              <Item key={item.id} item={item} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />
            ))}
          </ul>
        </div>
        <div className="actions-container">
          <div className="actions">
            Sort by
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="orderInput">Input Order (default)</option>
              <option value="orderAllAZ">A-Z</option>
              <option value="orderPackedAZ">Packed Items</option>
            </select>
          </div>
          <button onClick={handleClear}>Clear List</button>
        </div>
        {showModal && <Modal onConfirm={confirmClear} onCancel={cancelClear} />}
      </>
    );
  };
  
  function Item({ item, onDeleteItem, onToggleItem }) {
    return (
      <li>
        <input type="checkbox" checked={item.packed} onChange={() => onToggleItem(item.id)} />
        <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
          {item.description} - Quantity: {item.quantity}{' '}
          {item.packed ? (
            '✅'
          ) : (
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
          )}
        </span>
      </li>
    );
  }

  const Modal = ({ onConfirm, onCancel }) => {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <h3>Are you sure?</h3>
          <p>Do you really want to clear the list?</p>
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    );
  };

  export default PackagingList;