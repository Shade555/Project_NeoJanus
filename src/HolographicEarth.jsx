import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import "./HolographicEarth.css"; // Add a CSS file to handle positioning

const EarthModel = () => {
  const modelRef = useRef();
  const { scene } = useGLTF("/Holographic_earth.glb");

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
    }
  });

  return <primitive object={scene} ref={modelRef} scale={1.5} />;
};

const HolographicEarth = () => {
  return (
    <div className="earth-container">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        className="earth-canvas"
      >
        <ambientLight intensity={2.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <EarthModel />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default HolographicEarth;
