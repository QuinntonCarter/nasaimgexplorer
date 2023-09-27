import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Moon({ earthRadius }) {
  const moonRef = useRef(null);
  let testMoonVec = new THREE.Vector3(earthRadius);
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime() * 0.5;
    moonRef.current.position.y +=
      Math.cos(time + testMoonVec.x * 0.5 * -1) * 0.05;
    moonRef.current.position.x +=
      Math.sin(time + testMoonVec.x * 0.5 * -1) * 0.05;
    moonRef.current.position.z +=
      Math.sin(time + testMoonVec.x * 0.5 * -1) * 0.05;
  });

  return (
    <>
      <mesh ref={moonRef} scale={[1, 1, 1]} position={[0, 0, 0]}>
        <sphereGeometry />
        <meshStandardMaterial color="lightgray" />
      </mesh>
    </>
  );
}
