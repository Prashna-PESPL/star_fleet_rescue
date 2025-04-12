
import { useState, useEffect } from "react";
import "./App.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function App() {
  const [missionTime, setMissionTime] = useState(900); // 15 minutes in seconds
  const [statusMessages, setStatusMessages] = useState([
    "Sector Alpha Secured",
    "Borg Threat Level: High",
    "Warp Drive: Operational",
    "Shield Capacity: 87%"
  ]);
  const [currentStatus, setCurrentStatus] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [showTooltip, setShowTooltip] = useState("");
  const [reducedMotion, setReducedMotion] = useState(false);

  // Team members data
  const teamMembers = [
    { role: "Captain", avatar: "👩‍✈️", status: "Ready", health: 100 },
    { role: "Engineer", avatar: "👨‍🔧", status: "Ready", health: 95 },
    { role: "No. 2", avatar: "👩‍💼", status: "Standby", health: 100 },
    { role: "Ensign", avatar: "👨‍🚀", status: "Preparing", health: 85 }
  ];

  // Mission objectives
  const objectives = [
    "Rescue 12 Borg Drones",
    "Mine 50T Dilithium",
    "Survive cosmic anomalies",
    "Establish communications with Alpha Quadrant"
  ];

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  // Countdown timer effect
  useEffect(() => {
    if (missionTime <= 0) return;
    
    const timer = setInterval(() => {
      setMissionTime((prevTime) => prevTime - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [missionTime]);

  // Rotate status messages
  useEffect(() => {
    const statusInterval = setInterval(() => {
      setCurrentStatus((prev) => (prev + 1) % statusMessages.length);
    }, 3000);
    
    return () => clearInterval(statusInterval);
  }, [statusMessages]);

  // Random glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 5000);
    
    return () => clearInterval(glitchInterval);
  }, []);

  // Handle mission start
  const handleStartMission = () => {
    alert("Mission initiated! Prepare for warp speed...");
  };

  // Toggle reduced motion setting
  const toggleReducedMotion = () => {
    setReducedMotion(!reducedMotion);
    document.documentElement.classList.toggle('reduced-motion');
  };

  return (
    <div className="App">
      {/* Starfield background with parallax layers */}
      <div className={`starfield-container ${reducedMotion ? 'reduced-motion' : ''}`}>
        <div className="starfield-bg"></div>
        <div className="parallax-layer-1"></div>
        <div className="parallax-layer-2"></div>
        <div className="particles-container"></div>
      </div>

      {/* Mission briefing container */}
      <div className="mission-container">
        {/* Header with glitch effect */}
        <header className={`mission-header ${isGlitching ? 'glitch' : ''}`}>
          <h1 className="mission-title">Star Fleet Rescue</h1>
          <div className="mission-subtitle">Mission Briefing</div>
          
          {/* Timer display */}
          <div className="mission-timer">
            <span className="timer-label">T-MINUS</span>
            <span className="timer-countdown">{formatTime(missionTime)}</span>
          </div>
        </header>

        {/* Mission content container */}
        <div className="mission-content">
          {/* Mission brief panel */}
          <section className="mission-brief">
            <h2 className="holographic-text">PRIMARY DIRECTIVE</h2>
            <p className="mission-description">
              Respond to distress signal from USS Prometheus. Crew assimilation in progress.
              Immediate extraction required. Borg presence confirmed.
            </p>
            
            {/* Objectives list */}
            <div className="objectives-panel">
              <h3 className="panel-header">Mission Objectives</h3>
              <ul className="objectives-list">
                {objectives.map((objective, index) => (
                  <li key={index} className="objective-item">
                    <span className="objective-marker">■</span>
                    {objective}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Team and status info */}
          <section className="team-status">
            <h3 className="panel-header">Team Status</h3>
            <div className="team-roster">
              {teamMembers.map((member, index) => (
                <div key={index} className="crew-member">
                  <div className="crew-avatar">{member.avatar}</div>
                  <div className="crew-details">
                    <div className="crew-role">{member.role}</div>
                    <div className="crew-status">{member.status}</div>
                    <div className="health-bar">
                      <div 
                        className="health-fill" 
                        style={{ width: `${member.health}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Live status ticker */}
            <div className="status-ticker">
              <span className="ticker-label">STATUS:</span>
              <span className="ticker-message">{statusMessages[currentStatus]}</span>
            </div>

            {/* Data visualization */}
            <div className="data-widgets">
              <div className="data-widget" 
                   onMouseEnter={() => setShowTooltip("energy")}
                   onMouseLeave={() => setShowTooltip("")}>
                <div className="widget-label">Energy</div>
                <div className="widget-gauge">
                  <div className="gauge-fill" style={{ width: "65%" }}></div>
                </div>
                {showTooltip === "energy" && (
                  <div className="tooltip">Warp core energy at 65%</div>
                )}
              </div>

              <div className="data-widget"
                   onMouseEnter={() => setShowTooltip("shields")}
                   onMouseLeave={() => setShowTooltip("")}>
                <div className="widget-label">Shields</div>
                <div className="widget-gauge">
                  <div className="gauge-fill" style={{ width: "87%" }}></div>
                </div>
                {showTooltip === "shields" && (
                  <div className="tooltip">Forward shields at 87% capacity</div>
                )}
              </div>

              <div className="data-widget"
                   onMouseEnter={() => setShowTooltip("lifesupport")}
                   onMouseLeave={() => setShowTooltip("")}>
                <div className="widget-label">Life Support</div>
                <div className="widget-gauge">
                  <div className="gauge-fill" style={{ width: "92%" }}></div>
                </div>
                {showTooltip === "lifesupport" && (
                  <div className="tooltip">Life support systems nominal</div>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Control panel */}
        <div className="control-panel">
          <button 
            className="begin-mission-btn" 
            onClick={handleStartMission}
            aria-label="Begin mission"
          >
            <span className="btn-text">BEGIN MISSION</span>
            <span className="btn-glow"></span>
          </button>

          <div className="control-icons">
            <button 
              className="control-icon" 
              onClick={() => alert("Help documentation accessed")}
              aria-label="Help"
              onMouseEnter={() => setShowTooltip("help")}
              onMouseLeave={() => setShowTooltip("")}
            >
              <span>?</span>
              {showTooltip === "help" && (
                <div className="tooltip">Access help documents</div>
              )}
            </button>

            <button 
              className="control-icon" 
              onClick={() => alert("Settings panel opened")}
              aria-label="Settings"
              onMouseEnter={() => setShowTooltip("settings")}
              onMouseLeave={() => setShowTooltip("")}
            >
              <span>⚙️</span>
              {showTooltip === "settings" && (
                <div className="tooltip">Adjust mission parameters</div>
              )}
            </button>

            <button 
              className="control-icon" 
              onClick={toggleReducedMotion}
              aria-label="Toggle reduced motion"
              onMouseEnter={() => setShowTooltip("motion")}
              onMouseLeave={() => setShowTooltip("")}
            >
              <span>{reducedMotion ? "🔄" : "✨"}</span>
              {showTooltip === "motion" && (
                <div className="tooltip">
                  {reducedMotion ? "Enable animations" : "Reduce animations"}
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Briefing transcript */}
        <div className="briefing-transcript">
          <div className="transcript-content">
            &lt;ADMIRAL JANEWAY&gt; This mission is classified, level 10 clearance required. USS Prometheus has gone silent near the Neutral Zone. Last transmission indicated Borg assimilation in progress. Your orders are to rescue survivors and recover mission data. Exercise extreme caution. Resistance is NOT futile.
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
      