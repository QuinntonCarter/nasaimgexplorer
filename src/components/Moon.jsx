import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export default function Moon({ earthRadius, earthPos }) {
  const moonRef = useRef(null);
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime() * 0.5;
  });
  const { scene } = useGLTF("./Moon.glb");
  console.log("moon", scene.children[0].geometry);
  return (
    <>
      <mesh
        name="MoonMesh"
        // ref={earthRef}
        scale={[1, 1, 1]}
        geometry={scene.children[0].geometry}
        material={scene.children[0].material}
        position={[earthPos + 7.5, 0, 0]}
      />
      {/* <mesh ref={moonRef} scale={[1, 1, 1]} position={[earthPos + 7.5, 0, 0]}>
        <sphereGeometry />
        <meshStandardMaterial color="lightgray" />
      </mesh> */}
    </>
  );
}
