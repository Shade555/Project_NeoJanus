import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Card from "./Card";
import HolographicEarth from "./HolographicEarth";
import "./Home.css";

const cards = [
  { icon: "💰", title: "Donation", description: "Support the cause with your generous donations.", link: "/Pages_on_test/Donation.html" },
  { icon: "🤝", title: "Volunteering", description: "Join us and make a difference in your community.", link: "/Pages_on_test/volunteer.html" },
  { icon: "📝", title: "Feedback", description: "Share your thoughts and help us improve.", link: "/Pages_on_test/feedback.html" },
  { icon: "📊", title: "Dashboard", description: "Monitor Real-time conditions of your area.", link: "Pages_on_test/dashboard.html" },
  { icon: "📞", title: "Emergency Contact", description: "Reach out for urgent assistance and support.", link: "/Pages_on_test/emergency_contacts.html" },
  { icon: "❓", title: "Help", description: "Find answers to common questions and get support.", link: "/Pages_on_test/help.html" },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAbout, setShowAbout] = useState(false);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) newIndex = cards.length - 1;
    if (newIndex >= cards.length) newIndex = 0;
    setCurrentIndex(newIndex);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(currentIndex + 1),
    onSwipedRight: () => updateIndex(currentIndex - 1),
  });

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <button onClick={() => setShowAbout(false)}>Home</button>
        <button onClick={() => setShowAbout(true)}>About Us</button>
        <a href="/Pages_on_test/help.html">Help</a>
        <a href="/Pages_on_test/feedback.html">Feedback</a>
      </nav>

      {/* Holographic Earth Background */}
      <div className="holographic-earth-container">
        <HolographicEarth />
      </div>

      {/* Carousel Always Visible */}
      <div className="carousel-container" {...handlers}>
        <button className="nav-button left" onClick={() => updateIndex(currentIndex - 1)}>
          <ChevronLeft size={30} />
        </button>

        <div className="carousel">
          <AnimatePresence mode="popLayout">
            {cards.map((card, index) => {
              let relativePosition = index - currentIndex;
              if (relativePosition < -Math.floor(cards.length / 2)) {
                relativePosition += cards.length;
              }
              if (relativePosition > Math.floor(cards.length / 2)) {
                relativePosition -= cards.length;
              }
              if (Math.abs(relativePosition) > 1) return null;

              return (
                <motion.div
                  key={index}
                  className={`card-wrapper ${
                    relativePosition === 0 ? "center" : relativePosition === -1 ? "left" : "right"
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: relativePosition === 0 ? 1 : 0.7,
                    scale: relativePosition === 0 ? 1 : 0.8,
                    x: relativePosition === 0 ? 0 : relativePosition === -1 ? -280 : 280,
                  }}
                  transition={{ duration: 0.25 }}
                  style={{ zIndex: relativePosition === 0 ? 3 : 2 }}
                >
                  <Card icon={card.icon} title={card.title} description={card.description} link={card.link} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <button className="nav-button right" onClick={() => updateIndex(currentIndex + 1)}>
          <ChevronRight size={30} />
        </button>
      </div>

      {/* About Us Slide Over */}
      <AnimatePresence>
        {showAbout && (
          <motion.div
            className="about-overlay"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5 }}
          >
            <div className="about-content">
              <h1>About Us</h1>
              <p>Welcome to our platform! We are committed to making a positive impact by connecting communities, providing real-time data, and offering support during emergencies. Join us in our mission to create a safer and more informed world.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Home;
