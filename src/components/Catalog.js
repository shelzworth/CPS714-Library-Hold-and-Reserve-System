import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemCard from './ItemCard';
import { getCatalogItems, placeHold, placeReservation } from '../services/mockDataService';
import './Catalog.css';

function Catalog() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, available, checked-out

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setLoading(true);
    try {
      const catalogItems = await getCatalogItems();
      setItems(catalogItems);
    } catch (error) {
      console.error('Error loading catalog:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceHold = async (itemId) => {
    try {
      const result = await placeHold(itemId);
      if (result.success) {
        alert(`Hold placed successfully! ${result.message || ''}`);
        loadItems(); // Refresh to update item status
      } else {
        alert(`Failed to place hold: ${result.message || 'Unknown error'}`);
      }
    } catch (error) {
      alert(`Error placing hold: ${error.message}`);
    }
  };

  const handlePlaceReservation = async (itemId) => {
    try {
      const result = await placeReservation(itemId);
      if (result.success) {
        alert(`Reservation placed successfully! ${result.message || ''}`);
        loadItems(); // Refresh to update item status
      } else {
        alert(`Failed to place reservation: ${result.message || 'Unknown error'}`);
      }
    } catch (error) {
      alert(`Error placing reservation: ${error.message}`);
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.isbn.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    if (filterStatus === 'available') return matchesSearch && item.status === 'available';
    if (filterStatus === 'checked-out') return matchesSearch && item.status === 'checked-out';
    
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="catalog-container">
        <div className="loading">Loading catalog...</div>
      </div>
    );
  }

  return (
    <div className="catalog-container">
      <button className="back-button" onClick={() => navigate('/')}>← Back</button>
      
      <div className="catalog-controls">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filterStatus === 'available' ? 'active' : ''}`}
            onClick={() => setFilterStatus('available')}
          >
            Available
          </button>
          <button
            className={`filter-btn ${filterStatus === 'checked-out' ? 'active' : ''}`}
            onClick={() => setFilterStatus('checked-out')}
          >
            Checked Out
          </button>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="no-results">
          <p>No items found.</p>
        </div>
      ) : (
        <div className="items-grid">
          {filteredItems.map(item => (
            <ItemCard
              key={item.id}
              item={item}
              onPlaceHold={handlePlaceHold}
              onPlaceReservation={handlePlaceReservation}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Catalog;

