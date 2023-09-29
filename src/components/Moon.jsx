/* eslint-disable react/no-unknown-property */
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { EffectComposer, SelectiveBloom } from "@react-three/postprocessing";
import { useControls } from "leva";

export default function Moon({ earthRadius, earthPos }) {
  const moonRef = useRef(null);
  const moonLight = useRef(null);
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime() * 0.5;
    moonRef.current.rotation.x -= delta * 0.05;
    moonRef.current.rotation.y -= delta * 0.07;
    // moonRef.current.rotation.z -= delta * 0.05;
  });
  const [moonTexture, moonDisplacementMap] = useTexture([
    "./moon2k.jpeg",
    "./moonDisplacement.jpeg",
  ]);
  const {
    intensityLight,
    intensityEmissive,
    intensityBloom,
    bloomRadius,
    BloomLuminanceThreshold,
    BloomEnabled,
  } = useControls("Moon bloom/Light", {
    BloomEnabled: true,
    intensityLight: {
      value: 0.37,
      step: 0.001,
      min: 0,
      max: 10,
    },
    intensityEmissive: {
      value: 0.8,
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
      max: 0.99,
    },
  });
  return (
    <>
      <EffectComposer enabled={BloomEnabled}>
        <SelectiveBloom
          intensity={intensityBloom}
          // luminanceSmoothing={0.03}
          luminanceThreshold={BloomLuminanceThreshold}
          mipmapBlur
          radius={bloomRadius}
          levels={7}
          selection={moonRef.current}
          lights={moonLight}
        />
      </EffectComposer>
      <ambientLight
        ref={moonLight}
        intensity={intensityLight}
        color={"white"}
      />
      <mesh
        name="MoonMesh"
        ref={moonRef}
        scale={(0.3, 0.3, 0.3)}
        position={[3, 0, 0]}
      >
        <axesHelper args={[2]} />

        <sphereGeometry />
        <meshStandardMaterial
          displacementMap={moonDisplacementMap}
          map={moonTexture}
          emissionColor={"white"}
          emissiveIntensity={intensityEmissive}
        />
      </mesh>
    </>
  );
}
