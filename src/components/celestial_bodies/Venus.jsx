import { useTexture, useGLTF, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { EffectComposer, SelectiveBloom } from "@react-three/postprocessing";
import { useControls } from "leva";
import { useRef } from "react";

export default function Venus({ mercuryRadius, mercuryPos }) {
  const venusRef = useRef(null);
  const venusLight = useRef(null);
  const { materials, nodes } = useGLTF("/nasaVenus-transformed.glb");
  //   const [mercuryTexture, mercuryNormalMap, mercurySpecularMap] = useTexture([
  //     "./earthDaymap.jpg",
  //     "./earthNormalMap.jpeg",
  //     "./earthSpecularMap.jpeg",
  //   ]);
  useFrame((state, delta) => {
    // rotations earth * is enacting on moon as well
    // venusRef.current.rotation.x -= delta * 0.07;
    // venusRef.current.rotation.y -= delta * 0.07;
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
          // luminanceSmoothing={0.03}
          luminanceThreshold={BloomLuminanceThreshold}
          mipmapBlur
          radius={bloomRadius}
          levels={7}
          selection={venusRef.current}
          lights={venusLight}
        />
      </EffectComposer>
      <ambientLight
        ref={venusLight}
        intensity={intensityLight}
        color={"lightblue"}
      />
      <mesh
        scale={(0.0025, 0.0025, 0.0025)}
        ref={venusRef.current}
        // ** position
        position={[16, 0, 0]}
        geometry={nodes.cylindrically_mapped_sphereMesh.geometry}
      >
        <Html lang="en">
          <p style={{ color: "salmon" }}> venus </p>
        </Html>
        <axesHelper args={[3]} />
        <meshStandardMaterial
          map={materials["Default OBJ"].map}
          emissive={"brown"}
          emissiveIntensity={intensityEmissive}
        />
      </mesh>

      {/* adds moonsys to earth mesh as child * being acted on by earth sys too */}
      {/* <OrbitSys rotationSpeed={0.5}>
          <Moon earthPos={mercuryPos} />
        </OrbitSys> */}
      {/* </mesh> */}
    </>
  );
}

useGLTF.preload("/nasaVenus-transformed.glb");
