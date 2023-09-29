/* eslint-disable react/no-unknown-property */
import "./App.css";
import {
  EnvironmentMap,
  OrbitControls,
  Select,
  useEnvironment,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import Earth from "./components/Earth";
import { useRef } from "react";
import Sun from "./components/Sun";
import {
  EffectComposer,
  Selection,
  SelectiveBloom,
} from "@react-three/postprocessing";
import { Resizer, KernelSize } from "postprocessing";

// add emission shaders to planets

function App() {
  console.log(Resizer);
  const sunRadius = 8;
  const earthRadius = 4;
  const earthPos = sunRadius + 13;
  const earthRef = useRef(null);
  let testRef = useRef(null);
  let earthOrbitRef = useRef(null);
  let planetOrbitRef = useRef(null);
  const envMap = useEnvironment({ files: "./spaceENV.hdr" });
  // console.log(envMap);
  useFrame((state, delta) => {
    // testRef.current.rotation.y -= delta * 0.005;
    // another planet
    // earthOrbitRef.current.rotation.y -= delta * 0.08;
  });
  console.log("earth orbit", earthOrbitRef);
  return (
    <>
      <EnvironmentMap background map={envMap} />
      <OrbitControls />

      <mesh ref={testRef}>
        <Sun sunRadius={sunRadius} />

        <group ref={earthOrbitRef} position={[0, 0, 0]}>
          <Earth ref={earthRef} earthRadius={earthRadius} earthPos={earthPos} />
          <group ref={planetOrbitRef}>
            {/* another planet */}
            {/* <Moon earthPos={planetOrbitRef} /> */}
          </group>
        </group>
      </mesh>
    </>
  );
}

export default App;
