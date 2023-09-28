import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Outlines, useGLTF, useTexture } from "@react-three/drei";
import { Bloom, Outline, EffectComposer } from "@react-three/postprocessing";

export default function Sun({ sunRadius }) {
  const sunRef = useRef(null);
  const { scene } = useGLTF("./Our_Sun.glb");
  useFrame((state, delta) => {
    let time = state.clock.getElapsedTime();
    // earthRef.current.rotation.y += delta * 0.5;
    // earthRef.current.rotation.x += delta * 0.5;
    // moonGroupRef.current.position.x -= time / 2;
  });
  console.log("sun", scene.children[0]);
  return (
    <>
      <EffectComposer disableNormalPass={true}>
        <Bloom intensity={1.5} />
      </EffectComposer>

      <mesh
        name="SunMesh"
        geometry={scene.children[0].geometry}
        // material={scene.children[0].material}
        position={[0, 0, 0]}
        scale={(sunRadius, 20, 20)}
      >

        <meshStandardMaterial emissive="orange" emissiveIntensity={15} />
      </mesh>
    </>
  );
}
