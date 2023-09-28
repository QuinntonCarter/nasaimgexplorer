import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Moon from "./Moon";
import * as THREE from "three";

export default function Earth({ earthRadius }) {
  const earthRef = useRef(null);
  const moonGroupRef = useRef(null);
  useFrame((state, delta) => {
    let time = state.clock.getElapsedTime();
    // earthRef.current.rotation.y += delta * 0.5;
    // earthRef.current.rotation.x += delta * 0.5;
    // moonGroupRef.current.position.x -= time / 2;
  });

  return (
    <>
      <mesh ref={earthRef} scale={({ earthRadius }, 4, 4)} position={[0, 0, 0]}>
        <sphereGeometry />
        <meshStandardMaterial color="lightblue" />
      </mesh>
      <group>
        <Moon />
      </group>
    </>
  );
}
