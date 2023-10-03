import { useTexture, useGLTF, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { EffectComposer, SelectiveBloom } from "@react-three/postprocessing";
import { useControls } from "leva";
import { useRef } from "react";

export default function Saturn({ saturnRadius, saturnPos }) {
  const saturnRef = useRef(null);
  const saturnLight = useRef(null);
  const { materials, nodes } = useGLTF("/nasaSaturn-transformed.glb");

  useFrame((state, delta) => {
    // rotations earth * is enacting on moon as well
    // jupiterRef.current.rotation.x -= delta * 0.07;
    // jupiterRef.current.rotation.y -= delta * 0.07;
  });
  const {
    intensityLight,
    intensityEmissive,
    intensityBloom,
    bloomRadius,
    BloomLuminanceThreshold,
    BloomEnabled,
  } = useControls("Earth bloom/Light", {
    BloomEnabled: true,
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
    <>
      <EffectComposer enabled={BloomEnabled}>
        <SelectiveBloom
          intensity={intensityBloom}
          luminanceThreshold={BloomLuminanceThreshold}
          mipmapBlur
          radius={bloomRadius}
          levels={7}
          selection={saturnRef.current}
          lights={saturnLight}
        />
      </EffectComposer>
      <ambientLight
        ref={saturnLight}
        intensity={intensityLight}
        color={"lightblue"}
      />
      <group ref={saturnRef.current} position={[52, 0, 0]}>
        <axesHelper args={[6.5]} />
        <mesh
          // (scale)passed to children
          scale={(0.01, 0.01, 0.01)}
          geometry={nodes.RingsTop.geometry}
          material={materials.SaturnRings}
        >
          <mesh geometry={nodes.Saturn001.geometry}>
            <Html lang="en">
              <p style={{ color: "lightblue", fontSize: "18px" }}>saturn</p>
            </Html>
            <meshStandardMaterial
              map={materials.None.map}
              emissive={"khaki"}
              emissiveIntensity={0.15}
            />
          </mesh>
        </mesh>
      </group>

      {/* adds moonsys to earth mesh as child * being acted on by earth sys too */}
      {/* <OrbitSys rotationSpeed={0.5}>
          <Moon earthPos={mercuryPos} />
        </OrbitSys> */}
      {/* </mesh> */}
    </>
  );
}

useGLTF.preload("/nasaSaturn-transformed.glb");
