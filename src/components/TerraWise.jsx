import React, { useState, useEffect } from 'react';
import UserQuestionnaire from './UserQuestionnaire';
import CommutingPage from './CommutingPage';
import './TerraWise.css';

const TerraWise = () => {
  const [coins, setCoins] = useState(2450);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedMethods, setSelectedMethods] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        addCoins(Math.floor(Math.random() * 5) + 1);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const addCoins = (amount = 10) => {
    setCoins(prev => prev + amount);
    createFloatingCoins(amount);
  };

  const createFloatingCoins = (amount) => {
    const coinDisplay = document.querySelector('.coins-display');
    if (!coinDisplay) return;
    
    const rect = coinDisplay.getBoundingClientRect();
    const floatingCoin = document.createElement('div');
    floatingCoin.textContent = `+${amount}`;
    floatingCoin.style.cssText = `
      position: fixed;
      top: ${rect.top}px;
      left: ${rect.left + rect.width/2}px;
      color: #FFD700;
      font-weight: bold;
      font-size: 1.2rem;
      z-index: 1001;
      pointer-events: none;
      transform: translateX(-50%);
      animation: floatUp 2s ease-out forwards;
    `;
    
    document.body.appendChild(floatingCoin);
    setTimeout(() => floatingCoin.remove(), 2000);
  };

  const showNotification = (message) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(notif => notif.id !== id));
    }, 3000);
  };

  const handleSignIn = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    const response = await fetch('http://localhost:8000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem('token', data.token);
      showNotification(data.message);
      setShowQuestionnaire(true);
      addCoins(100);
    } else {
      showNotification(data.message || 'Error creating account');
    }
  } catch (error) {
    console.error('Network error:', error);
    showNotification('Network error. Please try again.');
  }

  e.target.reset();
};


const [showCommutingPage, setShowCommutingPage] = useState(false);

  const handleMethodSelect = (method) => {
    if (selectedMethods.includes(method)) {
      setSelectedMethods(prev => prev.filter(m => m !== method));
    } else {
      setSelectedMethods(prev => [...prev, method]);
      addCoins(25);
    }
  };

  const handleQuestionnaireComplete = (answers) => {
  console.log('User answers:', answers);
  setShowQuestionnaire(false);
  showNotification('Profile completed! Your personalized carbon tracking is now active.');
  addCoins(500); // Bonus for completing profile
};

  const handleActivitySelect = (activity) => {
  if (activity === 'commuting') {
    setShowCommutingPage(true);
    addCoins(15);
    showNotification('Opening commuting tracker...');
    return;
  }
  
  setSelectedActivities([activity]);
  addCoins(15);
  showNotification(`Great! We'll help you track your ${activity} carbon footprint.`);
};

    // Add this function with your other functions in TerraWise component
const handleBackFromCommuting = () => {
  setShowCommutingPage(false);
  showNotification('Welcome back to TerraWise!');
};


  const recommendationMethods = [
    { id: 'voice', icon: '🎙️', title: 'Voice Commands', description: 'Simply speak your activities: "I drove 15 miles to work today"' },
    { id: 'photo', icon: '📸', title: 'Receipt Scanning', description: 'Photograph receipts for instant carbon footprint calculations' },
    { id: 'auto', icon: '📍', title: 'Auto-Tracking', description: 'Passive monitoring using GPS and smartphone sensors' },
    { id: 'integration', icon: '🔗', title: 'Smart Integration', description: 'Connect bank accounts and calendars for comprehensive tracking' },
    { id: 'ai', icon: '🤖', title: 'AI Recommendations', description: 'Personalized suggestions based on your lifestyle patterns' }
  ];

  const activities = [
    { id: 'traveling', icon: '✈️', title: 'Traveling', description: 'Track flights, hotels, and vacation carbon footprint' },
    { id: 'shopping', icon: '🛒', title: 'Shopping', description: 'Monitor purchases and consumption patterns' },
    { id: 'eating', icon: '🍽️', title: 'Eating', description: 'Log meals and dietary choices impact' },
    { id: 'commuting', icon: '🚗', title: 'Commuting', description: 'Track daily transportation methods' },
    { id: 'home', icon: '🏠', title: 'At Home', description: 'Monitor energy usage and home activities' },
    { id: 'working', icon: '💻', title: 'Working', description: 'Track office energy and digital carbon footprint' },
    { id: 'exercising', icon: '🏃', title: 'Exercising', description: 'Log outdoor activities and gym visits' },
    { id: 'cooking', icon: '👨‍🍳', title: 'Cooking', description: 'Track kitchen energy use and food preparation' }
  ];
if (showQuestionnaire) {
    return <UserQuestionnaire onComplete={handleQuestionnaireComplete} />;
  }

  if (showQuestionnaire) {
  return <UserQuestionnaire onComplete={handleQuestionnaireComplete} />;
}

if (showCommutingPage) {
  return (
    <CommutingPage 
      onBack={handleBackFromCommuting}
      addCoins={addCoins}
      showNotification={showNotification}
    />
  );
}


  return (
    
    <div className="terrawise-app">
      <div className="notifications">
        {notifications.map(notif => (
          <div key={notif.id} className="notification">{notif.message}</div>
        ))}
      </div>

      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">🌱</div>
            <div className="logo-text">TerraWise</div>
          </div>
          
          <div className="header-right">
            <div className="coins-display" onClick={() => addCoins()}>
              <i className="fas fa-coins coin-icon"></i>
              <span className="coin-count">{coins.toLocaleString()}</span>
            </div>
            
            <button className="leaderboard-btn">
              <i className="fas fa-trophy"></i>
              <span>Leaderboard</span>
            </button>
            
            <div className="account-icon">
              <i className="fas fa-user"></i>
            </div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <section className="hero">
          <div className="hero-container">
            <div className="hero-left">
              <h1>Empowering a Sustainable Future</h1>
              <p className="hero-subtitle">
                Track your carbon footprint with intelligent AI recommendations and gamified sustainability challenges. 
                Join thousands of eco-conscious individuals making a real environmental impact.
              </p>
              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>
            </div>
            
            <div className="hero-right">
              <div className="logo-3d">🌍</div>
              
              <div className="signin-box">
                <h3 className="signin-title">Start Your Journey</h3>
                <form onSubmit={handleSignIn}>
                  <div className="form-group">
                    <input type="email" name="email" className="form-input" placeholder="Enter your email" required />
                  </div>
                  <div className="form-group">
                    <input type="password" name="password" className="form-input" placeholder="Create password" required />
                  </div>
                  <button type="submit" className="signin-btn">Sign Up & Start Tracking</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="recommendations">
          <div className="recommendations-container">
            <div className="recommendations-header">
              <h2 className="recommendations-title">Smart Tracking Methods</h2>
              <p className="recommendations-subtitle">Choose from multiple effortless ways to track your carbon footprint</p>
            </div>
            
            <div className="recommendations-grid">
              {recommendationMethods.map(method => (
                <div 
                  key={method.id}
                  className={`recommendation-card ${selectedMethods.includes(method.id) ? 'active' : ''}`}
                  onClick={() => handleMethodSelect(method.id)}
                >
                  <span className="recommendation-icon">{method.icon}</span>
                  <h3 className="recommendation-title">{method.title}</h3>
                  <p className="recommendation-desc">{method.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="are-you">
          <div className="are-you-container">
            <h2 className="are-you-title">Are You...</h2>
            <p className="are-you-subtitle">Tell us what you're doing right now to get personalized carbon tracking</p>
            
            <div className="activity-grid">
              {activities.map(activity => (
                <div 
                  key={activity.id}
                  className={`activity-btn ${selectedActivities.includes(activity.id) ? 'active' : ''}`}
                  onClick={() => handleActivitySelect(activity.id)}
                >
                  <span className="activity-icon">{activity.icon}</span>
                  <h3 className="activity-title">{activity.title}</h3>
                  <p className="activity-desc">{activity.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TerraWise;
