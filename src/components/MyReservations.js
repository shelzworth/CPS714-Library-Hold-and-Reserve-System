import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserReservations, getUserHolds } from '../services/mockDataService';
import './MyReservations.css';

function MyReservations() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [holds, setHolds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('holds'); // 'holds' or 'reservations'

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [reservationsData, holdsData] = await Promise.all([
        getUserReservations(),
        getUserHolds()
      ]);
      setReservations(reservationsData);
      setHolds(holdsData);
    } catch (error) {
      console.error('Error loading reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="reservations-container">
        <div className="loading">Loading your reservations...</div>
      </div>
    );
  }

  return (
    <div className="reservations-container">
      <button className="back-button" onClick={() => navigate('/')}>← Back</button>

      <div className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === 'holds' ? 'active' : ''}`}
          onClick={() => setActiveTab('holds')}
        >
          Holds ({holds.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'reservations' ? 'active' : ''}`}
          onClick={() => setActiveTab('reservations')}
        >
          Reservations ({reservations.length})
        </button>
      </div>

      {activeTab === 'holds' ? (
        <div className="holds-section">
          {holds.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h3>No Active Holds</h3>
              <p>You don't have any active holds at the moment.</p>
              <Link to="/" className="browse-link">Browse Catalog</Link>
            </div>
          ) : (
            <div className="holds-list">
              {holds.map(hold => (
                <HoldCard key={hold.id} hold={hold} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="reservations-section">
          {reservations.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📅</div>
              <h3>No Active Reservations</h3>
              <p>You don't have any active reservations at the moment.</p>
              <Link to="/" className="browse-link">Browse Catalog</Link>
            </div>
          ) : (
            <div className="reservations-list">
              {reservations.map(reservation => (
                <ReservationCard key={reservation.id} reservation={reservation} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function HoldCard({ hold }) {
  return (
    <div className="hold-card">
      <div className="hold-card-header">
        <h3 className="hold-item-title">{hold.itemTitle}</h3>
        <span className="hold-date">Placed on {new Date(hold.datePlaced).toLocaleDateString()}</span>
      </div>
      
      <div className="hold-card-body">
        <div className="hold-info-row">
          <span className="info-label">Author:</span>
          <span className="info-value">{hold.itemAuthor}</span>
        </div>
        <div className="hold-info-row">
          <span className="info-label">ISBN:</span>
          <span className="info-value">{hold.itemISBN}</span>
        </div>
        <div className="hold-info-row">
          <span className="info-label">Status:</span>
          <span className={`info-value status-${hold.status.toLowerCase().replace(' ', '-')}`}>
            {hold.status}
          </span>
        </div>
        {hold.queuePosition && (
          <div className="queue-position">
            <span className="queue-label">Your Position in Queue:</span>
            <span className="queue-number">{hold.queuePosition}</span>
          </div>
        )}
        {hold.estimatedAvailableDate && (
          <div className="hold-info-row">
            <span className="info-label">Estimated Available:</span>
            <span className="info-value">
              {new Date(hold.estimatedAvailableDate).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function ReservationCard({ reservation }) {
  return (
    <div className="reservation-card">
      <div className="reservation-card-header">
        <h3 className="reservation-item-title">{reservation.itemTitle}</h3>
        <span className="reservation-date">
          Reserved on {new Date(reservation.dateReserved).toLocaleDateString()}
        </span>
      </div>
      
      <div className="reservation-card-body">
        <div className="reservation-info-row">
          <span className="info-label">Author:</span>
          <span className="info-value">{reservation.itemAuthor}</span>
        </div>
        <div className="reservation-info-row">
          <span className="info-label">ISBN:</span>
          <span className="info-value">{reservation.itemISBN}</span>
        </div>
        <div className="reservation-info-row">
          <span className="info-label">Status:</span>
          <span className={`info-value status-${reservation.status.toLowerCase().replace(' ', '-')}`}>
            {reservation.status}
          </span>
        </div>
        {reservation.pickupLocation && (
          <div className="reservation-info-row">
            <span className="info-label">Pickup Location:</span>
            <span className="info-value">{reservation.pickupLocation}</span>
          </div>
        )}
        {reservation.expiryDate && (
          <div className="reservation-info-row">
            <span className="info-label">Expires:</span>
            <span className="info-value">
              {new Date(reservation.expiryDate).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyReservations;

