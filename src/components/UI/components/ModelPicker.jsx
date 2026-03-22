import "../Overlay.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";

import { MODELS_NAME } from "../../constants/constanst";
import { useCarContext } from "../../context/carContext";

export function ModelPicker() {
  const { setModel } = useCarContext();
  const buttonsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      buttonsRef.current,
      {
        opacity: 0,
        X: -30,     
        scale: 0.95,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: {
          each: 0.1,     // 👈 slightly slower than color picker (feels intentional)
          from: "start", // left → right
        },
      }
    );
  }, []);

  return (
    <div className="flex mt-4 gap-4">
      {MODELS_NAME.map((model, index) => (
        <button
          key={index}
          ref={(el) => (buttonsRef.current[index] = el)}
          onClick={() => setModel(model)}
          className="model-button"
          onMouseEnter={(e) => {
            gsap.to(e.currentTarget, { scale: 1.08, duration: 0.2 });
          }}
          onMouseLeave={(e) => {
            gsap.to(e.currentTarget, { scale: 1, duration: 0.2 });
          }}
        >
          {model}
        </button>
      ))}
    </div>
  );
}