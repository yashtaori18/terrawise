import React, { useState } from 'react';
import './UserQuestionnaire.css';

const UserQuestionnaire = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({});

  const handleOptionChange = (category, option) => {
    setAnswers(prev => {
      const currentAnswers = prev[category] || [];
      if (currentAnswers.includes(option)) {
        return {
          ...prev,
          [category]: currentAnswers.filter(item => item !== option)
        };
      } else {
        return {
          ...prev,
          [category]: [...currentAnswers, option]
        };
      }
    });
  };

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Questionnaire complete
      console.log('Questionnaire completed:', answers);
      onComplete && onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const isStepAnswered = (step) => {
    const stepCategories = questionData[step].categories;
    return stepCategories.some(category => 
      answers[category.name] && answers[category.name].length > 0
    );
  };

  const questionData = {
    1: {
      title: "Transport & Mobility",
      subtitle: "Tell us about your daily transportation habits",
      categories: [
        {
          name: "Daily Commute Mode",
          question: "How do you usually commute? (Select all that apply)",
          options: ["Car", "Bus", "Train", "Bike", "Walk", "Motorcycle", "Carpooling"]
        },
        {
          name: "Distance Traveled",
          question: "How far do you travel daily?",
          options: ["Less than 10km", "10-25km", "25-50km", "50-100km", "More than 100km"]
        },
        {
          name: "Vehicle & Fuel Type",
          question: "What type of vehicle/fuel do you use? (Select all that apply)",
          options: ["Petrol", "Diesel", "CNG", "Electric", "Hybrid", "Public Transport", "N/A"]
        },
        {
          name: "Flights Taken",
          question: "How many flights do you take per year?",
          options: ["No flights", "1-2 short-haul", "3-5 short-haul", "1-2 long-haul", "3+ long-haul", "Multiple international trips"]
        }
      ]
    },
    2: {
      title: "Home Energy Use",
      subtitle: "Help us understand your household energy consumption",
      categories: [
        {
          name: "Electricity Consumption",
          question: "What's your monthly electricity usage?",
          options: ["Less than 100 kWh", "100-200 kWh", "200-400 kWh", "400-600 kWh", "More than 600 kWh", "Don't know"]
        },
        {
          name: "Electricity Source",
          question: "What's your primary electricity source?",
          options: ["Coal", "Natural Gas", "Renewable Energy", "Mixed/Grid", "Solar Panels", "Don't know"]
        },
        {
          name: "Cooking Fuel",
          question: "What do you use for cooking?",
          options: ["LPG", "Piped Gas", "Electric/Induction", "Biomass", "Solar Cooker", "Mixed"]
        },
        {
          name: "Heating & Cooling",
          question: "How much heating/cooling do you use daily?",
          options: ["None", "Less than 2 hours", "2-6 hours", "6-12 hours", "More than 12 hours", "Varies by season"]
        }
      ]
    },
    3: {
      title: "Food & Diet",
      subtitle: "Your dietary choices have a significant impact on your carbon footprint",
      categories: [
        {
          name: "Diet Type",
          question: "Which best describes your diet?",
          options: ["Vegan", "Vegetarian", "Pescatarian", "Omnivore", "Mostly Plant-based", "High Meat Consumption"]
        },
        {
          name: "Meat & Dairy Frequency",
          question: "How often do you consume meat and dairy per week?",
          options: ["Never", "1-2 times", "3-5 times", "6-10 times", "More than 10 times", "Every meal"]
        },
        {
          name: "Food Source Preference",
          question: "What's your preference for food sources?",
          options: ["Local/Seasonal foods", "Imported foods", "Organic foods", "Processed foods", "Home-grown", "Mixed/No preference"]
        }
      ]
    },
    4: {
      title: "Shopping & Consumption",
      subtitle: "Your purchasing habits contribute to your overall environmental impact",
      categories: [
        {
          name: "Purchase Frequency",
          question: "How often do you buy clothing/electronics?",
          options: ["Rarely (few times/year)", "Occasionally (monthly)", "Regularly (weekly)", "Frequently (multiple times/week)", "As needed", "Impulse purchases"]
        },
        {
          name: "Brand Preference",
          question: "Do you prefer sustainable/eco-friendly brands?",
          options: ["Always choose sustainable", "Often choose sustainable", "Sometimes consider sustainability", "Rarely consider sustainability", "Price is primary factor", "Don't know about sustainable options"]
        },
        {
          name: "Plastic Usage",
          question: "How do you handle single-use items?",
          options: ["Always use reusables", "Mostly reusables", "Mix of both", "Mostly single-use", "Always single-use", "Trying to reduce single-use"]
        }
      ]
    },
    5: {
      title: "Waste & Recycling",
      subtitle: "Waste management plays a crucial role in environmental conservation",
      categories: [
        {
          name: "Waste Generated",
          question: "How much household waste do you generate weekly?",
          options: ["Less than 5kg", "5-10kg", "10-15kg", "15-25kg", "More than 25kg", "Don't measure/know"]
        },
        {
          name: "Recycling Habits",
          question: "Do you recycle and what percentage of waste?",
          options: ["Yes, 80-100%", "Yes, 50-80%", "Yes, 20-50%", "Yes, less than 20%", "No, don't recycle", "Limited recycling options"]
        },
        {
          name: "Composting",
          question: "Do you compost organic waste?",
          options: ["Yes, all organic waste", "Yes, some organic waste", "No, but interested", "No, not practical", "No, don't know how", "Community composting"]
        }
      ]
    },
    6: {
      title: "Optional Lifestyle Factors",
      subtitle: "Additional factors that can impact your environmental footprint",
      categories: [
        {
          name: "Water Usage",
          question: "What's your approximate daily water usage?",
          options: ["Less than 50 liters", "50-100 liters", "100-200 liters", "200-300 liters", "More than 300 liters", "Don't know"]
        },
        {
          name: "Carbon Offsets",
          question: "Do you participate in carbon offset activities?",
          options: ["Yes, tree planting", "Yes, carbon credits", "Yes, multiple activities", "Occasionally", "No, but interested", "No, not aware of options"]
        }
      ]
    }
  };

  const currentStepData = questionData[currentStep];

  return (
    <div className="questionnaire-container">
      <div className="questionnaire-header">
        <h1>Complete Your Carbon Footprint Profile</h1>
        <div className="progress-indicator">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className={`progress-dot ${i + 1 <= currentStep ? 'active' : ''} ${i + 1 < currentStep ? 'completed' : ''}`}
            >
              {i + 1}
            </div>
          ))}
        </div>
        <p className="step-info">Step {currentStep} of 6</p>
      </div>

      <div className="questionnaire-content">
        <div className="step-header">
          <h2>{currentStepData.title}</h2>
          <p className="step-subtitle">{currentStepData.subtitle}</p>
        </div>

        <div className="questions-section">
          {currentStepData.categories.map((category, index) => (
            <div key={category.name} className="question-group">
              <h3 className="question-title">{category.question}</h3>
              <div className="options-grid">
                {category.options.map((option) => (
                  <label
                    key={option}
                    className={`option-card ${answers[category.name]?.includes(option) ? 'selected' : ''}`}
                  >
                    <input
                      type="checkbox"
                      name={category.name}
                      value={option}
                      checked={answers[category.name]?.includes(option) || false}
                      onChange={() => handleOptionChange(category.name, option)}
                    />
                    <span className="option-text">{option}</span>
                    <span className="checkmark">✓</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="questionnaire-navigation">
        <button
          className="nav-btn prev-btn"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          ← Previous
        </button>

        <div className="nav-info">
          {!isStepAnswered(currentStep) && (
            <p className="answer-prompt">Please select at least one option to continue</p>
          )}
        </div>

        <button
          className="nav-btn next-btn"
          onClick={handleNext}
          disabled={!isStepAnswered(currentStep)}
        >
          {currentStep === 6 ? 'Complete Profile' : 'Next →'}
        </button>
      </div>
    </div>
  );
};

export default UserQuestionnaire;
