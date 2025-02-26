import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Card from "./Card"; // Import Card component
import "./Home.css"; // Updated import

const cards = [
  { icon: "🚀", title: "Explore", description: "Discover new ideas!" },
  { icon: "🎨", title: "Create", description: "Express your creativity!" },
  { icon: "🌎", title: "Connect", description: "Meet like-minded people!" },
];

const Home = () => {
  const [index, setIndex] = useState(1);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) newIndex = cards.length - 1;
    if (newIndex >= cards.length) newIndex = 0;
    setIndex(newIndex);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(index + 1),
    onSwipedRight: () => updateIndex(index - 1),
  });

  return (
    <div className="carousel-container" {...handlers}>
      <button className="nav-button left" onClick={() => updateIndex(index - 1)}>
        <ChevronLeft size={30} />
      </button>
      
      <div className="carousel">
        <AnimatePresence mode="popLayout">
          {cards.map((card, i) => {
            const position = i - index;
            return (
              <motion.div
                key={i}
                className={`card-wrapper ${position === 0 ? "center" : position > 0 ? "right" : "left"}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: position === 0 ? 1 : 0.9 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
              >
                <Card {...card} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <button className="nav-button right" onClick={() => updateIndex(index + 1)}>
        <ChevronRight size={30} />
      </button>
    </div>
  );
};

export default Home;
