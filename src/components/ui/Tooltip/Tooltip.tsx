import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setCoords({
        top: rect.top - 50, // Tooltip arriba
        left: rect.left + rect.width / 2
      });
    }
    setVisible(true);
  };

  return (
    <>
      <div
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setVisible(false)}
        style={{ display: "inline-block", cursor: "pointer" }}
      >
        {children}
      </div>

      {visible &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: coords.top,
              left: coords.left,
              transform: "translateX(-50%)",
              backgroundColor: "#fff",
              color: "#111",
              padding: "10px 14px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
              fontSize: "0.9rem",
              fontWeight: 500,
              textAlign: "center",
              zIndex: 9999,
              maxWidth: "220px",
              whiteSpace: "normal",
              animation: "fadeIn 0.2s ease-in-out",
            }}
          >
            {text}
            <div
              style={{
                position: "absolute",
                bottom: "-6px",
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: "6px solid white",
                filter: "drop-shadow(0 2px 1px rgba(0,0,0,0.1))",
              }}
            ></div>
          </div>,
          document.body
        )}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translate(-50%, -5px); }
            to { opacity: 1; transform: translate(-50%, 0); }
          }
        `}
      </style>
    </>
  );
};

export default Tooltip;
