import "./App.css";
import { Center, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import Earth from "./components/Earth";
import Moon from "./components/Moon";
import { useRef } from "react";
import * as THREE from "three";

function App() {
  const earthRadius = 4;
  let testRef = useRef(null);
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    testRef.current.rotation.y += delta * 0.5;
    // testRef.current.rotation.x +=
    //   Math.sin(delta * 0.005) + Math.cos(delta * 0.005);
  });

  return (
    <>
      <OrbitControls />

      <directionalLight position={[1, 2, 3]} intensity={0.5} color={"white"} />
      <ambientLight intensity={0.3} />

      <group ref={testRef} position={[0, 0, 0]}>
        <Earth earthRadius={earthRadius} />
      </group>
    </>
  );
}

export default App;
