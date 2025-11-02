import { useProgress } from "@react-three/drei";
import { useEffect } from "react";
import PropTypes from "prop-types";

function LoadTracker({ onComplete }) {
  const { active, progress, loaded, total, item } = useProgress();

  useEffect(() => {
    if (active) {
      console.log(`🔄 Loading: ${item}`);
      console.log(`📦 ${loaded} / ${total} assets (${progress.toFixed(2)}%)`);
    } else {
      console.log("✅ All assets loaded.");
      onComplete?.();
    }
  }, [active, progress, loaded, total, item, onComplete]);

  return null;
}

LoadTracker.propTypes = {
  onComplete: PropTypes.func,
};

export default LoadTracker;
