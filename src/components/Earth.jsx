import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Earth({ earthRadius }) {
  const earthRef = useRef(null);
  useFrame((state, delta) => {
    earthRef.current.rotation.y += delta * 0.005;
    earthRef.current.rotation.x += delta * 0.005;
  });

  return (
    <>
      <mesh
        ref={earthRef}
        scale={({ earthRadius }, 4, 4)}
        position={[0, 0, 0]}
        wireframe
      >
        <sphereGeometry />
        <meshStandardMaterial color="lightblue" />
      </mesh>
    </>
  );
}
