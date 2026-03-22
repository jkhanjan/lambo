import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useCarContext } from "../../context/CarContext";

export function AccessoriesPicker() {
  const { carState, togglePart } = useCarContext();

  const titleRef = useRef(null);
  const buttonsRef = useRef([]);

  const parts = [
    { key: "spoiler", label: "Spoiler" },
    { key: "headlights", label: "Headlights" },
  ];

  useEffect(() => {
    const tl = gsap.timeline();

    // Title animation
    tl.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: 10,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: "power2.out",
      }
    );

    // Buttons animation (soft upward flow)
    tl.fromTo(
      buttonsRef.current,
      {
        opacity: 0,
        y: 20,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "power3.out",
        stagger: 0.1,
      },
      "-=0.2" // overlap with title
    );
  }, []);

  return (
    <div className="accessories-control mt-4">
      <h3 ref={titleRef} className="text-white text-lg mb-4">
        Accessories
      </h3>

      <div className="flex gap-4">
        {parts.map(({ key, label }, index) => (
          <button
            key={key}
            ref={(el) => (buttonsRef.current[index] = el)}
            onClick={() => togglePart(key)}
            className={`px-6 py-2.5 bg-gradient-to-br from-[rgba(214,222,226,0.5)] to-[rgba(176,207,222,0.3)] 
              border border-[rgba(176,207,222,0.9)] 
              text-white font-sans uppercase
              rounded-full
              backdrop-blur-sm
              shadow-xl
              text-xl
              transition-all duration-300 ${
                carState.parts[key] ? "text-[#b0cfde]" : "text-[#ffffff]"
              }`}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, { scale: 1.08, duration: 0.2 });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, { scale: 1, duration: 0.2 });
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}