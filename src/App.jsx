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
import OrbitSys from "./components/OrbitSys";
import Moon from "./components/Moon";

// add emission shaders to planets

function App() {
  console.log(Resizer);
  const sunRadius = 8;
  const earthRadius = 4;
  const earthPos = sunRadius + 13;
  let solarSysRef = useRef(null);
  let earthOrbitRef = useRef(null);
  const envMap = useEnvironment({ files: "./spaceENV.hdr" });

  useFrame((state, delta) => {
    // solarSysRef.current.rotation.y -= delta * 0.05;
    // another planet
  });

  return (
    <>
      <EnvironmentMap background map={envMap} />
      <OrbitControls />
      {/* Contains solar system */}
      <object3D ref={solarSysRef}>
        <Sun sunRadius={sunRadius} />
        {/* adds earth orbit path */}
        <OrbitSys rotationSpeed={0.05}>
          <Earth earthRadius={earthRadius} earthPos={earthPos} />
          {/* <OrbitSys rotationSpeed={0.05}> */}
          {/* another planet */}
          {/* <Moon earthPos={earthPos} /> */}
          {/* </OrbitSys> */}
        </OrbitSys>
      </object3D>
    </>
  );
}

export default App;
