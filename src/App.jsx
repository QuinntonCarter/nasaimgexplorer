import "./App.css";
import {
  EnvironmentMap,
  OrbitControls,
  useEnvironment,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import Earth from "./components/Earth";
import { useRef } from "react";
import Sun from "./components/Sun";

// add emission shaders to planets

function App() {
  const sunRadius = 8;
  const earthRadius = 4;
  const earthPos = sunRadius + 13;
  let testRef = useRef(null);
  let planetOrbitRef = useRef(null);
  const envMap = useEnvironment({ files: "./spaceENV.hdr" });
  // console.log(envMap);
  useFrame((state, delta) => {
    // testRef.current.rotation.y -= delta * 0.5;
    // another planet
    // planetOrbitRef.current.rotation.y -= delta * 0.5;
  });
  console.log(<EnvironmentMap />);
  return (
    <>
      <EnvironmentMap background map={envMap} />
      <OrbitControls />

      <directionalLight  position={[1, 2, 3]} intensity={0.5} color={"white"} />
      <ambientLight intensity={0.3} />
      <mesh ref={testRef}>
        <Sun sunRadius={sunRadius} />
        <group ref={planetOrbitRef} position={[0, 0, 0]}>
          <Earth earthRadius={earthRadius} earthPos={earthPos} />
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
