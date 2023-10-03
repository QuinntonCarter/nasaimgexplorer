import { useTexture, useGLTF, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { EffectComposer, SelectiveBloom } from "@react-three/postprocessing";
import { useControls } from "leva";
import { useRef } from "react";

export default function Uranus({ uranusRadius, uranusPos }) {
  const uranusRef = useRef(null);
  const uranusLight = useRef(null);
  const { materials, nodes } = useGLTF("/nasaUranus-transformed.glb");
  //   const [mercuryTexture, mercuryNormalMap, mercurySpecularMap] = useTexture([
  //     "./earthDaymap.jpg",
  //     "./earthNormalMap.jpeg",
  //     "./earthSpecularMap.jpeg",
  //   ]);
  useFrame((state, delta) => {
    // console.log("uranus", materials);
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
          // luminanceSmoothing={0.03}
          luminanceThreshold={BloomLuminanceThreshold}
          mipmapBlur
          radius={bloomRadius}
          levels={7}
          selection={uranusRef.current}
          lights={uranusLight}
        />
      </EffectComposer>
      <ambientLight
        ref={uranusLight}
        intensity={intensityLight}
        color={"lightblue"}
      />
      <mesh
        scale={(2, 2, 2)}
        ref={uranusRef.current}
        // geometry={nodes.Uranus.geometry}
        // ** position
        position={[65, 0, 0]}
        // issues loading material on mount
        // material={materials["Default OBJ.001"]}
      >
        <Html>
          <p style={{ color: "hotpink" }}>Uranus </p>
        </Html>
        <axesHelper args={[1.7]} />
        <sphereGeometry />
        <meshStandardMaterial
          // issues loading material on mount >> ** look in .map **
          map={materials["Default OBJ.001"].map}
          emissive={"rgb(127, 174, 250)"}
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

// useGLTF.preload("/nasaUranus-transformed.glb");
