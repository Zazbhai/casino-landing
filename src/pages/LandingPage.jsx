import React, { useEffect, useState } from 'react';
import { Download, ShieldCheck, Gamepad2, Coins, Star, Users, CheckCircle, Trophy } from 'lucide-react';
import '../index.css';

const LandingPage = () => {
  const [particles, setParticles] = useState([]);
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const [config, setConfig] = useState({
    appName: 'Royal Casino',
    appLogo: '/app-icon.jpg',
    downloads: 0
  });

  const VPS_URL = import.meta.env.VITE_VPS_URL || 'http://localhost:4000';
  const downloadUrl = import.meta.env.MODE === 'development'
    ? `${VPS_URL}/downloads/royalcasino.apk`
    : 'https://download.ilovedonkgame.site/downloads/royalcasino.apk';

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasDownloaded) {
        window.location.href = downloadUrl;
        setHasDownloaded(true);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [hasDownloaded, downloadUrl]);

  const handleManualDownload = async (e) => {
    e.preventDefault();
    setHasDownloaded(true);
    window.location.href = downloadUrl;
  };

  useEffect(() => {
    // Generate random ambient particles
    const generateParticles = () => {
      const newParticles = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        animationDuration: `${5 + Math.random() * 10}s`,
        animationDelay: `-${Math.random() * 10}s`,
        size: `${2 + Math.random() * 4}px`
      }));
      setParticles(newParticles);
    };
    generateParticles();
  }, []);

  return (
    <>
      {/* Background Ambient Particles */}
      <div className="particles">
        {particles.map(p => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              animationDuration: p.animationDuration,
              animationDelay: p.animationDelay,
              width: p.size,
              height: p.size
            }}
          />
        ))}
      </div>

      <div className="app-container">
        {/* Navbar */}
        <nav className="navbar">
          <div className="nav-brand">
            <img src={config.appLogo} alt={`${config.appName} Logo`} className="nav-logo" />
            <span className="nav-title">{config.appName}</span>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="hero">
          <div className="hero-content">
            <div className="hero-tag animate-pulse-glow">🌟 Premium Casino Experience</div>
            <h1 className="hero-title">
              Win Big With <br/>
              <span className="flashy-text">{config.appName}</span>
            </h1>
            <p className="hero-desc">
              Download the official <strong>Royal Casino APK</strong>, India's top real money online casino app. Play high-paying slots, online Teen Patti, Matka, and Mines game. Get instant withdrawals and a 5% deposit bonus on every recharge.
            </p>
            
            <div className="download-btn-wrapper">
              <a 
                href="#" 
                className="download-btn flashy-btn"
                onClick={handleManualDownload}
              >
                <Download size={24} strokeWidth={2.5} className="bounce-icon" />
                Download APK
              </a>
              <div className="btn-glow-ring"></div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="glow-orb"></div>
            <div className="glow-orb secondary"></div>
            <img src="/images/spinner_bet_thumbnail.png" alt="Spinner Bet" className="floating-game game-1" />
            <img src="/images/teen_patti_thumbnail.png" alt="Teen Patti" className="floating-game game-2" />
            <img src="/images/royal_spinner_thumbnail.png" alt="Royal Spinner" className="floating-game game-3" />
            <img src="/images/matka_thumbnail.png" alt="Matka" className="floating-game game-4" />
            <img src="/images/mines_thumbnail.png" alt="Minesweeper" className="floating-game game-5" />
          </div>
        </main>

        {/* Marquee Banner */}
        <div className="marquee-container">
          <div className="marquee-content">
            <span>🎰 MEGA JACKPOTS</span>
            <span>⭐ 5% DEPOSIT BONUS</span>
            <span>💸 INSTANT WITHDRAWALS</span>
            <span>🤝 HUGE REFERRAL COMMISSIONS</span>
            <span>🎲 PROVABLY FAIR</span>
            <span>🎰 MEGA JACKPOTS</span>
            <span>⭐ 5% DEPOSIT BONUS</span>
            <span>💸 INSTANT WITHDRAWALS</span>
            <span>🤝 HUGE REFERRAL COMMISSIONS</span>
            <span>🎲 PROVABLY FAIR</span>
          </div>
        </div>

        {/* Features Section */}
        <section className="features">
          <h2 className="section-title">Why Choose <span className="flashy-text">{config.appName}?</span></h2>
          <div className="features-grid">
            <div className="feature-card glass-panel tilt-effect">
              <div className="feature-icon-wrapper">
                <Coins size={36} strokeWidth={2} />
              </div>
              <h3 className="feature-title">5% Deposit Bonus</h3>
              <p className="feature-desc">
                Get an instant <strong style={{color: '#FFD700'}}>5% EXTRA</strong> on every single deposit! Instantly boost your bankroll and play more.
              </p>
            </div>
            
            <div className="feature-card glass-panel tilt-effect">
              <div className="feature-icon-wrapper">
                <ShieldCheck size={36} strokeWidth={2} />
              </div>
              <h3 className="feature-title">Referral Commissions</h3>
              <p className="feature-desc">
                Invite friends & earn massive commissions! Get paid for every player you bring to the {config.appName} family.
              </p>
            </div>

            <div className="feature-card glass-panel tilt-effect">
              <div className="feature-icon-wrapper">
                <Gamepad2 size={36} strokeWidth={2} />
              </div>
              <h3 className="feature-title">Handpicked Games</h3>
              <p className="feature-desc">
                Premium selection of thrilling casino games. Enjoy high-quality graphics and buttery smooth gameplay.
              </p>
            </div>

            <div className="feature-card glass-panel tilt-effect">
              <div className="feature-icon-wrapper">
                <Coins size={36} strokeWidth={2} />
              </div>
              <h3 className="feature-title">Instant Withdrawals</h3>
              <p className="feature-desc">
                Withdraw your deposits and winnings instantly. Fast, secure, and hassle-free directly to your bank.
              </p>
            </div>
          </div>
        </section>



        {/* Trust & Reviews Section */}
        <section className="trust-section">
          <h2 className="section-title">Trusted By <span className="flashy-text">Thousands</span></h2>
          
          <div className="trust-metrics">
            <div className="metric-badge tilt-effect">
              <Users size={32} className="metric-icon" />
              <h4>50,000+</h4>
              <p>Active Players</p>
            </div>
            <div className="metric-badge tilt-effect">
              <Trophy size={32} className="metric-icon" />
              <h4>₹10M+</h4>
              <p>Winnings Paid</p>
            </div>
            <div className="metric-badge tilt-effect">
              <ShieldCheck size={32} className="metric-icon" />
              <h4>100%</h4>
              <p>Secure & Fair</p>
            </div>
          </div>

          <div className="reviews-grid">
            <div className="review-card glass-panel tilt-effect">
              <div className="stars">
                {[...Array(5)].map((_, i) => <Star key={i} fill="#FFD700" color="#FFD700" size={20} />)}
              </div>
              <p className="review-text">"The withdrawals are lightning fast! I hit a massive jackpot on Royal Spinner and the money was in my bank account instantly."</p>
              <div className="reviewer">
                <div className="reviewer-avatar">R</div>
                <div className="reviewer-info">
                  <h4>Rahul S.</h4>
                  <span>Verified Player <CheckCircle size={14} color="#00ff88" /></span>
                </div>
              </div>
            </div>

            <div className="review-card glass-panel tilt-effect">
              <div className="stars">
                {[...Array(5)].map((_, i) => <Star key={i} fill="#FFD700" color="#FFD700" size={20} />)}
              </div>
              <p className="review-text">"Best casino app out there. The 5% deposit bonus is real and the games are buttery smooth. Highly recommend to everyone."</p>
              <div className="reviewer">
                <div className="reviewer-avatar">P</div>
                <div className="reviewer-info">
                  <h4>Priya M.</h4>
                  <span>Verified Player <CheckCircle size={14} color="#00ff88" /></span>
                </div>
              </div>
            </div>

            <div className="review-card glass-panel tilt-effect">
              <div className="stars">
                {[...Array(5)].map((_, i) => <Star key={i} fill="#FFD700" color="#FFD700" size={20} />)}
              </div>
              <p className="review-text">"I love the Provably Fair system. I can actually verify my rolls! Plus the referral commissions are paying out great."</p>
              <div className="reviewer">
                <div className="reviewer-avatar">V</div>
                <div className="reviewer-info">
                  <h4>Vikram K.</h4>
                  <span>VIP Player <CheckCircle size={14} color="#00ff88" /></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer>
          <p>© {new Date().getFullYear()} {config.appName}. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
