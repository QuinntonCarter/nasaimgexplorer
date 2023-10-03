import { useTexture, useGLTF, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { EffectComposer, SelectiveBloom } from "@react-three/postprocessing";
import { useControls } from "leva";
import { useRef } from "react";

export default function Mars({ marsRadius, marsPos }) {
  const marsRef = useRef(null);
  const marsLight = useRef(null);
  const { materials, nodes } = useGLTF("/nasaMars-transformed.glb");
  //   const [mercuryTexture, mercuryNormalMap, mercurySpecularMap] = useTexture([
  //     "./earthDaymap.jpg",
  //     "./earthNormalMap.jpeg",
  //     "./earthSpecularMap.jpeg",
  //   ]);
  useFrame((state, delta) => {
    // console.log("mars", nodes.Cube008.geometry);
    // rotations earth * is enacting on moon as well
    // marsRef.current.rotation.x -= delta * 0.07;
    // marsRef.current.rotation.y -= delta * 0.07;
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
          selection={marsRef.current}
          lights={marsLight}
        />
      </EffectComposer>
      <ambientLight
        ref={marsLight}
        intensity={intensityLight}
        color={"lightblue"}
      />
      <mesh
        scale={(0.0015, 0.0015, 0.0015)}
        ref={marsRef.current}
        // ** position
        position={[27, 0, 0]}
        geometry={nodes.Cube008.geometry}
      >
        <Html lang="en">
          <p style={{ color: "red" }}> mars </p>
        </Html>
        <axesHelper args={[3]} />
        <meshStandardMaterial
          map={materials["Default OBJ.005"].map}
          emissive={"orange"}
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

useGLTF.preload("/nasaMars-transformed.glb");
