import "../Overlay.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";

import { GRADIENT_COLOR } from "../../constants/constanst";
import { useCarContext } from "../../context/carContext";

export function ColorPicker() {
  const { setColor } = useCarContext();
  const buttonsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
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
        duration: 0.5,
        ease: "power3.out",
        stagger: {
          each: 0.1, // 👈 flow speed
          from: "start", // left → right
        },
      }
    );
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {GRADIENT_COLOR.map((texture, index) => (
        <button
          key={index}
          ref={(el) => (buttonsRef.current[index] = el)}
          onClick={() => setColor(texture)}
          className="h-[3rem] w-[10rem] relative rounded-md overflow-hidden"
        >
          <img
            src={texture}
            alt={`gradient-${index}`}
            className="h-full w-full object-cover"
          />
        </button>
      ))}
    </div>
  );
}