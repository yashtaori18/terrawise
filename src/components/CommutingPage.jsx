import React, { useState, useEffect } from 'react';
import './CommutingPage.css';

const CommutingPage = ({ onBack, addCoins, showNotification }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [nearbyTransit, setNearbyTransit] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);

  // Get user's current location
  const getUserLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          setStartLocation('Current Location');
          setLoading(false);
          showNotification('Location detected! Finding nearby public transport...');
          addCoins(10);
          findNearbyTransit(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLoading(false);
          showNotification('Unable to get location. Please enter manually.');
        }
      );
    } else {
      setLoading(false);
      showNotification('Geolocation not supported by this browser.');
    }
  };

  // Mock function to find nearby transit (replace with real API)
  const findNearbyTransit = (lat, lng) => {
    // Mock nearby transit data
    const mockTransit = [
      {
        id: 1,
        name: 'Metro Station - Central Line',
        type: 'Subway',
        distance: '0.2 km',
        walkTime: '3 min',
        routes: ['Red Line', 'Blue Line'],
        coords: { lat: lat + 0.001, lng: lng + 0.001 }
      },
      {
        id: 2,
        name: 'Bus Stop - Main Street',
        type: 'Bus',
        distance: '0.1 km',
        walkTime: '2 min',
        routes: ['Route 42', 'Route 15', 'Route 88'],
        coords: { lat: lat + 0.0005, lng: lng - 0.0005 }
      },
      {
        id: 3,
        name: 'Train Station - North Terminal',
        type: 'Train',
        distance: '0.5 km',
        walkTime: '7 min',
        routes: ['Express Line', 'Local Service'],
        coords: { lat: lat - 0.002, lng: lng + 0.001 }
      },
      {
        id: 4,
        name: 'Bus Stop - Green Avenue',
        type: 'Bus',
        distance: '0.3 km',
        walkTime: '4 min',
        routes: ['Route 23', 'Route 67'],
        coords: { lat: lat + 0.0015, lng: lng - 0.001 }
      },
      {
        id: 5,
        name: 'Metro Station - Eastern Line',
        type: 'Subway',
        distance: '0.4 km',
        walkTime: '6 min',
        routes: ['Green Line', 'Yellow Line'],
        coords: { lat: lat - 0.0008, lng: lng + 0.002 }
      }
    ];

    setTimeout(() => {
      setNearbyTransit(mockTransit);
      setShowMap(true);
      addCoins(25);
    }, 1500);
  };

  const handleFindRoute = () => {
    if (startLocation && endLocation) {
      showNotification(`Finding best route from ${startLocation} to ${endLocation}...`);
      addCoins(50);
      // Here you would integrate with a real routing API
      setTimeout(() => {
        showNotification('Route found! Check the map for directions.');
      }, 2000);
    } else {
      showNotification('Please enter both start and end locations.');
    }
  };

  const getTransitIcon = (type) => {
    switch (type) {
      case 'Bus': return '🚌';
      case 'Subway': return '🚇';
      case 'Train': return '🚊';
      default: return '🚍';
    }
  };

  return (
    <div className="commuting-page">
      <div className="commuting-header">
        <button className="back-btn" onClick={onBack}>
          ← Back to TerraWise
        </button>
        <h1>🚗 Commuting Tracker</h1>
        <p>Plan your eco-friendly commute and discover public transport options</p>
      </div>

      <div className="commuting-content">
        {/* Location Detection Section */}
        <div className="location-section">
          <h2>📍 Your Location</h2>
          
          {!userLocation ? (
            <div className="location-detection">
              <p>Let us detect your current location to find nearby public transport</p>
              <button 
                className="detect-btn" 
                onClick={getUserLocation}
                disabled={loading}
              >
                {loading ? 'Detecting Location...' : '📍 Detect My Location'}
              </button>
            </div>
          ) : (
            <div className="location-detected">
              <div className="location-info">
                <h3>✅ Location Detected</h3>
                <p>Lat: {userLocation.latitude.toFixed(4)}</p>
                <p>Lng: {userLocation.longitude.toFixed(4)}</p>
              </div>
            </div>
          )}
        </div>

        {/* Route Planning Section */}
        <div className="route-section">
          <h2>🗺️ Plan Your Route</h2>
          
          <div className="location-inputs">
            <div className="input-group">
              <label>Start Location</label>
              <input
                type="text"
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                placeholder="Enter start location or use current location"
                className="location-input"
              />
            </div>
            
            <div className="input-group">
              <label>End Location</label>
              <input
                type="text"
                value={endLocation}
                onChange={(e) => setEndLocation(e.target.value)}
                placeholder="Enter destination"
                className="location-input"
              />
            </div>
          </div>

          <button 
            className="find-route-btn"
            onClick={handleFindRoute}
            disabled={!startLocation || !endLocation}
          >
            🔍 Find Best Route
          </button>
        </div>

        {/* Nearby Transit Section */}
        {nearbyTransit.length > 0 && (
          <div className="transit-section">
            <h2>🚌 Nearby Public Transport</h2>
            <p className="transit-subtitle">Found {nearbyTransit.length} transport options near you</p>
            
            <div className="transit-grid">
              {nearbyTransit.map((transit) => (
                <div key={transit.id} className="transit-card">
                  <div className="transit-header">
                    <span className="transit-icon">{getTransitIcon(transit.type)}</span>
                    <div className="transit-info">
                      <h3>{transit.name}</h3>
                      <p className="transit-type">{transit.type}</p>
                    </div>
                  </div>
                  
                  <div className="transit-details">
                    <div className="distance-info">
                      <span className="distance">📏 {transit.distance}</span>
                      <span className="walk-time">🚶‍♂️ {transit.walkTime} walk</span>
                    </div>
                    
                    <div className="routes">
                      <p className="routes-label">Available Routes:</p>
                      <div className="route-tags">
                        {transit.routes.map((route, index) => (
                          <span key={index} className="route-tag">{route}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <button className="select-transit-btn">
                    Select This Option
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mock Map Section */}
        {showMap && (
          <div className="map-section">
            <h2>🗺️ Interactive Map</h2>
            <div className="mock-map">
              <div className="map-placeholder">
                <div className="user-marker">📍 You are here</div>
                {nearbyTransit.map((transit, index) => (
                  <div 
                    key={transit.id} 
                    className="transit-marker" 
                    style={{
                      top: `${30 + index * 15}%`,
                      left: `${20 + index * 20}%`
                    }}
                  >
                    {getTransitIcon(transit.type)}
                  </div>
                ))}
                <div className="map-legend">
                  <p>📍 Your Location</p>
                  <p>🚌🚇🚊 Public Transport</p>
                </div>
              </div>
            </div>
            <p className="map-note">
              🗺️ Interactive map showing your location and nearby public transport options. 
              In a real implementation, this would integrate with Google Maps or similar service.
            </p>
          </div>
        )}

        {/* Carbon Impact Section */}
        <div className="impact-section">
          <h2>🌱 Carbon Impact</h2>
          <div className="impact-grid">
            <div className="impact-card">
              <h3>🚗 Driving</h3>
              <p className="co2-amount">~2.3 kg CO₂</p>
              <p className="impact-desc">Per day average</p>
            </div>
            <div className="impact-card positive">
              <h3>🚌 Public Transport</h3>
              <p className="co2-amount">~0.6 kg CO₂</p>
              <p className="impact-desc">75% less emissions!</p>
            </div>
            <div className="impact-card best">
              <h3>🚴‍♂️ Cycling + Transit</h3>
              <p className="co2-amount">~0.2 kg CO₂</p>
              <p className="impact-desc">90% reduction!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommutingPage;
