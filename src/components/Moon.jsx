import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Moon({ earthRadius }) {
  const moonRef = useRef(null);
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime() * 0.5;
    // let moonPosY = moonRef.current.position.y + earthRadius;
    // let moonPosX = moonRef.current.position.x + earthRadius;
    moonRef.current.position.y += Math.cos(time) * 0.05;
    moonRef.current.position.x += Math.sin(time) * 0.05;
    // moonPosY += Math.cos(time) * 0.05;
    // moonPosX += Math.sin(time) * 0.05;
  });

  return (
    <>
      <mesh ref={moonRef} scale={[1, 1, 1]} position={[-1, 0, 0]}>
        <sphereGeometry />
        <meshStandardMaterial color="lightgray" />
      </mesh>
    </>
  );
}
