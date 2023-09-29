/* eslint-disable react/no-unknown-property */
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Outlines, useGLTF, useTexture } from "@react-three/drei";
import {
  Bloom,
  Outline,
  EffectComposer,
  SelectiveBloom,
} from "@react-three/postprocessing";
import { useControls } from "leva";

export default function Sun({ sunRadius }) {
  const sunRef = useRef(null);
  const sunLight = useRef(null);
  const { scene, materials } = useGLTF("./Our_Sun.glb");
  const sunTexture = useTexture("./2k_sun.jpg");
  useFrame((state, delta) => {
    let time = state.clock.getElapsedTime();
    // earthRef.current.rotation.y += delta * 0.5;
    // earthRef.current.rotation.x += delta * 0.5;
    // moonGroupRef.current.position.x -= time / 2;
  });
  const {
    intensityLight,
    intensityEmissive,
    intensityBloom,
    bloomRadius,
    BloomLuminanceThreshold,
  } = useControls("Sun bloom/Light", {
    intensityLight: {
      value: 2.52,
      step: 0.001,
      min: 0,
      max: 10,
    },
    intensityEmissive: {
      value: 5.75,
      step: 0.001,
      min: 0,
      max: 10,
    },
    intensityBloom: {
      value: 1.73,
      step: 0.001,
      min: 0,
      max: 10,
    },
    bloomRadius: {
      value: 0.54,
      step: 0.001,
      min: 0,
      max: 0.99,
    },
    BloomLuminanceThreshold: {
      value: 0.14,
      step: 0.001,
      min: 0,
      max: 0.14,
    },
  });

  return (
    <>
      <EffectComposer>
        <SelectiveBloom
          intensity={intensityBloom}
          luminanceSmoothing={0.03}
          luminanceThreshold={BloomLuminanceThreshold}
          mipmapBlur
          radius={bloomRadius}
          // levels={7}
          lights={sunLight}
          selection={sunRef.current}
        />
      </EffectComposer>
      <ambientLight
        ref={sunLight}
        intensity={intensityLight}
        color={"yellow"}
      />
      <mesh
        castShadow={false}
        name="SunMesh"
        geometry={scene.children[0].geometry}
        position={[0, 0, 0]}
        scale={(sunRadius, 20, 20)}
        ref={sunRef}
      >
        <meshStandardMaterial
          emissive="orange"
          emissiveIntensity={intensityEmissive}
        />
      </mesh>
    </>
  );
}

useGLTF.preload("./Our_Sun.glb");
