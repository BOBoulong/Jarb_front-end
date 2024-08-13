import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { twMerge } from "tailwind-merge";

interface VantaBirdBackgroundProps {
  className?: string;
  children: React.ReactNode;
}

const VantaBirdsBackground = (props: VantaBirdBackgroundProps) => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);

  useEffect(() => {
    const loadVanta = async () => {
      if (!vantaEffect) {
        const THREE = await import("three");
        const BIRDS = await import("vanta/dist/vanta.birds.min");

        setVantaEffect(
            BIRDS.default({
                el: myRef.current,
                THREE: THREE,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                color1: '#FFF',
                color2: '#FFF',
                scaleMobile: 1.00,
                backgroundColor: '#000',
                quantity: 3.0 // Adjust based on preference
              })
        );
      }
    };

    loadVanta();

    return () => {
      if (vantaEffect) (vantaEffect as any).destroy();
    };
  }, [vantaEffect]);

  return (
    <div
      ref={myRef}
      style={{ width: "100%", height: "100vh" }}
      className={twMerge(props.className)}
    >
      {props.children}
    </div>
  );
};

export default dynamic(() => Promise.resolve(VantaBirdsBackground), {
  ssr: false,
});
