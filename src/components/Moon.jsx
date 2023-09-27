import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Moon({ earthRadius }) {
  const moonRef = useRef(null);
  useFrame((state, delta) => {
    moonRef.current.rotation.y += delta * 0.01;
    moonRef.current.rotation.z += delta * 0.01;
    const x = Math.sin(delta);
    const y = Math.cos(delta);
    moonRef.current.position.y += Math.sin(x) * 0.05;
    moonRef.current.position.x += Math.cos(y) * 0.05;

    // moonRef.current.position.x += Math.cos(delta) * 0.05;
    // moonRef.current.position.z += Math.cos(delta) * 0.05;

    console.log(moonRef.current);
  });

  return (
    <>
      <mesh ref={moonRef} scale={[1, 1, 1]} position={[3, 6, 0]}>
        <sphereGeometry />
        <meshStandardMaterial color="lightgray" />
      </mesh>
    </>
  );
}
