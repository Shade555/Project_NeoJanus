import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Card from "./Card";
import HolographicEarth from "./HolographicEarth"; // Import 3D model
import "./Home.css";

const cards = [
  { icon: "💰", title: "Donation", description: "Support the cause with your generous donations." },
  { icon: "🤝", title: "Volunteering", description: "Join us and make a difference in your community." },
  { icon: "📝", title: "Feedback", description: "Share your thoughts and help us improve." },
  { icon: "📊", title: "Dashboard", description: "Monitor progress and track your contributions." },
  { icon: "📞", title: "Emergency Contact", description: "Reach out for urgent assistance and support." },
  { icon: "❓", title: "Help", description: "Find answers to common questions and get support." },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
      {/* Holographic Earth (Fixed Background) */}
      <div className="holographic-earth-container">
        <HolographicEarth />
      </div>

      {/* Carousel (Fixed Center) */}
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
                  <Card {...card} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <button className="nav-button right" onClick={() => updateIndex(currentIndex + 1)}>
          <ChevronRight size={30} />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="content">
        {/* About Us Section */}
        <section className="about-us">
          <h2>About Us</h2>
          <p>
            Welcome to <strong>CrisesConnect</strong>, a platform dedicated to connecting people with vital resources. 
            Whether you're looking to donate, volunteer, or seek assistance, we're here to support you. 
            Our mission is to create a seamless, impactful experience for communities in need.
          </p>
        </section>

        {/* Footer */}
        <footer className="footer">
          <h3>Contact Us</h3>
          <p>Email: support@neorelief.org</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Address: 123 Relief St, Hope City, HC 45678</p>
          <p>Follow us: 
            <a href="#"> Facebook</a> | 
            <a href="#"> Twitter</a> | 
            <a href="#"> Instagram</a>
          </p>
        </footer>
      </div>
    </>
  );
};

export default Home;
