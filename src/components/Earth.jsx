import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Moon from "./Moon";
import { useGLTF } from "@react-three/drei";

export default function Earth({ earthRadius, earthPos }) {
  const earthRef = useRef(null);
  const moonGroupRef = useRef(null);
  const { scene, nodes } = useGLTF("./Earth.glb");
  useFrame((state, delta) => {
    moonGroupRef.current.rotation.y += delta * 0.05;
  });
  console.log("earth", scene.children);
  return (
    <>
      <group ref={moonGroupRef}>
        <mesh
          name="EarthMesh"
          // ref={earthRef}
          scale={({ earthRadius }, 4, 4)}
          geometry={scene.children[0].geometry}
          material={scene.children[0].material}
          position={[earthPos, 0, 0]}
        />
        {/* <mesh
          ref={earthRef}
          scale={({ earthRadius }, 4, 4)}
          position={[earthPos, 0, 0]}
        >
          <sphereGeometry />
          <meshStandardMaterial color="lightblue" />
        </mesh> */}
        <group>
          <Moon earthPos={earthPos} />
        </group>
      </group>
    </>
  );
}
