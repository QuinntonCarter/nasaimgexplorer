/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/no-unknown-property */
import { useRef, forwardRef } from "react";
import { useFrame } from "@react-three/fiber";
import Moon from "./Moon";
import { useGLTF, useTexture } from "@react-three/drei";
import {
  Bloom,
  EffectComposer,
  SelectiveBloom,
} from "@react-three/postprocessing";
import { useControls } from "leva";

export default function Earth({ earthRadius, earthPos }) {
  const earthRef = useRef(null);
  const earthLight = useRef(null);
  const moonEarthRef = useRef(null);
  const moonGroupRef = useRef(null);
  const [earthTexture, earthNormalMap, earthSpecularMap] = useTexture([
    "./earthDaymap.jpg",
    "./earthNormalMap.jpeg",
    "./earthSpecularMap.jpeg",
  ]);
  useFrame((state, delta) => {
    // rotation moon and earth around sun
    moonEarthRef.current.rotation.y -= delta * 0.05;
    // rotations earth
    earthRef.current.rotation.x -= delta * 0.07;
    earthRef.current.rotation.y -= delta * 0.07;
    // rotates moon around entire system but need to set path just around earth
    // moonGroupRef.current.rotation.y -= delta * 0.2;
  });
  const {
    intensityLight,
    intensityEmissive,
    intensityBloom,
    bloomRadius,
    BloomLuminanceThreshold,
  } = useControls("Earth bloom/Light", {
    intensityLight: {
      value: 0.18,
      step: 0.001,
      min: 0,
      max: 10,
    },
    intensityEmissive: {
      value: 0.52,
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
      value: 0.53,
      step: 0.001,
      min: 0,
      max: 0.99,
    },
    BloomLuminanceThreshold: {
      value: 0.02,
      step: 0.001,
      min: 0,
      max: 0.14,
    },
  });

  return (
    <group name="earthGroup" ref={moonEarthRef}>
      <EffectComposer>
        <SelectiveBloom
          intensity={intensityBloom}
          // luminanceSmoothing={0.03}
          luminanceThreshold={BloomLuminanceThreshold}
          mipmapBlur
          radius={bloomRadius}
          levels={7}
          selection={earthRef.current}
          lights={earthLight}
        />
      </EffectComposer>
      <ambientLight
        ref={earthLight}
        intensity={intensityLight}
        color={"lightblue"}
      />
      <mesh
        ref={earthRef}
        name="EarthMesh"
        scale={({ earthRadius }, 1.5, 1.5)}
        position={[earthPos, 0, 0]}
      >
        <sphereGeometry />
        <meshPhongMaterial
          map={earthTexture}
          normalMap={earthNormalMap}
          specularMap={earthSpecularMap}
          emissive={"blue"}
          emissiveIntensity={intensityEmissive}
        />
      </mesh>
      {/* <group ref={moonGroupRef}> */}
      <Moon earthPos={earthPos} />
      {/* </group> */}
    </group>
  );
}
