import React from 'react';
import './ItemCard.css';

function ItemCard({ item, onPlaceHold, onPlaceReservation }) {
  const getStatusBadge = (status) => {
    const badges = {
      'available': { text: 'Available', class: 'status-available' },
      'checked-out': { text: 'Checked Out', class: 'status-checked-out' },
      'on-hold': { text: 'On Hold', class: 'status-on-hold' },
      'reserved': { text: 'Reserved', class: 'status-reserved' }
    };
    return badges[status] || { text: status, class: 'status-unknown' };
  };

  const statusBadge = getStatusBadge(item.status);

  return (
    <div className="item-card">
      <div className="item-card-header">
        <div className="item-status-badge">
          <span className={statusBadge.class}>{statusBadge.text}</span>
        </div>
      </div>

      <div className="item-card-body">
        <h3 className="item-title">{item.title}</h3>
        <p className="item-author">by {item.author}</p>
        
        <div className="item-details">
          <div className="item-detail-row">
            <span className="detail-label">ISBN:</span>
            <span className="detail-value">{item.isbn}</span>
          </div>
          <div className="item-detail-row">
            <span className="detail-label">Type:</span>
            <span className="detail-value">{item.type}</span>
          </div>
          {item.location && (
            <div className="item-detail-row">
              <span className="detail-label">Location:</span>
              <span className="detail-value">{item.location}</span>
            </div>
          )}
        </div>
      </div>

      <div className="item-card-footer">
        <div className="item-actions">
          <button
            className="action-btn hold-btn"
            onClick={() => onPlaceHold(item.id)}
            disabled={item.status === 'available'}
            title={item.status === 'available' ? 'Item is available - no hold needed' : 'Place a hold on this item'}
          >
            Place Hold
          </button>
          <button
            className="action-btn reservation-btn"
            onClick={() => onPlaceReservation(item.id)}
            title="Reserve this item"
          >
            Place Reservation
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;

