import { useState, useRef, useEffect, memo } from "react";
import { EnvironmentPicker } from "./components/EnvironmentPicker";
import { ColorPicker } from "./components/ColorPicker";
import { ModelPicker } from "./components/ModelPicker";
import { AccessoriesPicker } from "./components/AccessoriesPicker";
import "./Overlay.css";
import useSpaceHold from "../utils/hooks/useSpaceHold";

const menuOptions = [
  { id: "color",       label: "Color" },
  { id: "model",       label: "Model" },
  { id: "environment", label: "Environment" },
  { id: "accessories", label: "Accessories" },
];

const ITEM_W = 150;
const CLONE_COUNT = 2; 

function mod(n, m) {
  return ((n % m) + m) % m;
}

const DrumDial = ({ activeId, onSelect }) => {
  const wrapRef    = useRef(null);
  const trackRef   = useRef(null);
  const dragging   = useRef(false);
  const startX     = useRef(0);
  const startOff   = useRef(0);
  const currentOff = useRef(null);
  const didDrag    = useRef(false);

  const n          = menuOptions.length;
  const activeIdx  = menuOptions.findIndex(o => o.id === activeId);

  const totalItems = n + CLONE_COUNT * 2 * n;
  const realStart  = CLONE_COUNT * n;

  function virtualLabel(vi) {
    return menuOptions[mod(vi - realStart, n)].label;
  }

  function offsetForVirtual(vi) {
    const w = wrapRef.current?.offsetWidth ?? 300;
    return (w / 2) - vi * ITEM_W - ITEM_W / 2;
  }

  function canonicalVirtual(realIdx) {
    return realStart + realIdx;
  }

  function setOffset(off, animated) {
    if (!trackRef.current) return;
    trackRef.current.style.transition = animated
      ? "transform 0.28s cubic-bezier(0.25,1,0.5,1)"
      : "none";
    trackRef.current.style.transform = `translateX(${off}px)`;
    currentOff.current = off;
  }

  function snapClosest(fromOffset) {
    const w       = wrapRef.current?.offsetWidth ?? 300;
    const center  = w / 2;
    const vi      = Math.round((center - fromOffset - ITEM_W / 2) / ITEM_W);
    const clamped = Math.max(0, Math.min(totalItems - 1, vi));
    const realIdx = mod(clamped - realStart, n);

    const snappedOff = offsetForVirtual(canonicalVirtual(realIdx));
    setOffset(snappedOff, true);

    onSelect(menuOptions[realIdx].id);
  }
  useEffect(() => {
    const vi  = canonicalVirtual(activeIdx);
    const off = offsetForVirtual(vi);
    setOffset(off, true);
  }, [activeId]);

  function onPointerDown(e) {
    dragging.current = true;
    didDrag.current  = false;
    startX.current   = e.clientX;
    startOff.current = currentOff.current ?? offsetForVirtual(canonicalVirtual(activeIdx));
    wrapRef.current.setPointerCapture(e.pointerId);
    setOffset(startOff.current, false);
  }

  function onPointerMove(e) {
    if (!dragging.current) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 4) didDrag.current = true;
    setOffset(startOff.current + dx, false);
  }

  function onPointerUp(e) {
    if (!dragging.current) return;
    dragging.current = false;
    if (!didDrag.current) return; 
    const dx      = e.clientX - startX.current;
    const finalOff = startOff.current + dx;
    snapClosest(finalOff);
  }

  function onItemClick(realIdx) {
    if (didDrag.current) return; 
    onSelect(menuOptions[realIdx].id);
  }

  const virtualItems = Array.from({ length: totalItems }, (_, vi) => {
    const realIdx = mod(vi - realStart, n);
    const dist    = Math.abs(mod(vi - realStart, n) - activeIdx);
    const adjDist = Math.min(dist, n - dist); // wrap-aware distance
    return { vi, realIdx, label: menuOptions[realIdx].label, adjDist };
  });

  return (
    <div
      ref={wrapRef}
      className="dial-wrap"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        dragging.current = false;
        snapClosest(currentOff.current ?? offsetForVirtual(canonicalVirtual(activeIdx)));
      }}
    >
      <div className="dial-tick" />
      <div ref={trackRef} className="dial-track">
        {virtualItems.map(({ vi, realIdx, label, adjDist }) => (
          <button
            key={vi}
            className={`dial-item${adjDist === 0 ? " active" : adjDist === 1 ? " adjacent" : ""}`}
            onClick={() => onItemClick(realIdx)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

const OverlayComponent = () => {
  const [activeMenu, setActiveMenu] = useState(1);
  const { isHolding } = useSpaceHold();

  return (
    <>
      <div className={`hold-bar hold-bar--top    ${isHolding ? "visible" : ""}`} />
      <div className={`hold-bar hold-bar--bottom ${isHolding ? "visible" : ""}`} />

      <p className={`space-hint ${isHolding ? "space-hint--active" : ""}`}>
        {isHolding ? ">> HOLDING..." : "---HOLD SPACE BAR---"}
      </p>

      {!isHolding && (
        <div className="dial-root">
          {activeMenu && (
            <div className="dial-popover">
              <span className="dial-popover__label">
                {menuOptions.find(o => o.id === activeMenu)?.label}
              </span>
              <div className="dial-popover__content">
                {activeMenu === "color"       && <ColorPicker />}
                {activeMenu === "model"       && <ModelPicker />}
                {activeMenu === "environment" && <EnvironmentPicker />}
                {activeMenu === "accessories" && <AccessoriesPicker />}
              </div>
            </div>
          )}

          <div className="dial-row">
            <DrumDial activeId={activeMenu ?? "color"} onSelect={setActiveMenu} />
            <button
              className={`dial-none-btn ${!activeMenu ? "dial-none-btn--active" : ""}`}
              onClick={() => setActiveMenu(null)}
              title="None"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export const Overlay = memo(OverlayComponent);