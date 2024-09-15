function Stats({ items }) {
    if (!items.length)
      return <footer className="stats">No items on the list yet. Ready to pack?</footer>;
  
    const totalItems = items.length;
    const totalPackedItems = items.filter((item) => item.packed).length;
    const totalPiecesInSuitcase = items.reduce((acc, item) => acc + item.quantity, 0);
    const percentagePacked = totalItems === 0 ? 0 : Math.round((totalPackedItems / totalItems) * 100);
  
    return (
      <footer className="stats">
        <em>
          {percentagePacked === 100
            ? '🛫 All packed and ready to go!🛬'
            : `You have ${totalItems} items on your list, and you are already packed ${totalPackedItems} (${percentagePacked}%) - Total pcs. ${totalPiecesInSuitcase}`}
        </em>
      </footer>
    );
  }

  export default Stats;