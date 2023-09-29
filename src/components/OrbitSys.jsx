import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function OrbitSys({ rotationSpeed, children }) {
  let orbitRef = useRef(null);

  useFrame((state, delta) => {
    orbitRef.current.rotation.y -= delta * rotationSpeed;
  });

  return <object3D ref={orbitRef}>{children}</object3D>;
}
