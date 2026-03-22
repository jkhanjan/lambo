import "../Overlay.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";

import { ENVIRONMENTS } from "../../constants/constanst";
import { useCarContext } from "../../context/carContext";

export function EnvironmentPicker() {
  const { carState, setEnvironment } = useCarContext();

  const titleRef = useRef(null);
  const buttonsRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline();

    // Title first
    tl.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: 10,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      }
    );

    // Then buttons flow in
    tl.fromTo(
      buttonsRef.current,
      {
        opacity: 0,
        x: -20,
        scale: 0.95,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.4,
        ease: "power3.out",
        stagger: {
          each: 0.08,
          from: "start",
        },
      },
      "-=0.2" // slight overlap with title
    );
  }, []);

  return (
    <div className="environment-control-wrapper">
      <h3 ref={titleRef} className="text-white text-lg mb-4">
        Choose Environment
      </h3>

      <div className="environment-options">
        {Object.entries(ENVIRONMENTS).map(([key, env], index) => (
          <button
            key={key}
            ref={(el) => (buttonsRef.current[index] = el)}
            onClick={() => setEnvironment(key)}
            className={`environment-button ${
              carState.environment === key ? "active" : ""
            }`}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, { scale: 1.06, duration: 0.2 });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, { scale: 1, duration: 0.2 });
            }}
          >
            {env.name}
          </button>
        ))}
      </div>
    </div>
  );
}