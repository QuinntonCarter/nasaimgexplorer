/* eslint-disable react/no-unknown-property */
import "./App.css";
import {
  EnvironmentMap,
  OrbitControls,
  useEnvironment,
} from "@react-three/drei";
import Earth from "./components/Earth";
import { useRef } from "react";
import Sun from "./components/Sun";
import OrbitSys from "./components/OrbitSys";

function App() {
  // sun
  const sunRadius = 8;
  const earthRadius = 4;
  // earth
  const earthPos = sunRadius + 13;
  // solar system
  const solarSysRef = useRef(null);
  // env map
  const envMap = useEnvironment({ files: "./spaceENV.hdr" });

  return (
    <>
      <EnvironmentMap background map={envMap} />
      <OrbitControls />
      {/* Contains solar system */}
      <object3D ref={solarSysRef}>
        <Sun sunRadius={sunRadius} />
        {/* adds earth orbit sys */}
        <OrbitSys rotationSpeed={0.05}>
          <Earth earthRadius={earthRadius} earthPos={earthPos} />
          {/* <OrbitSys rotationSpeed={0.05}> */}
          {/* another planet sys */}
          {/* <Moon earthPos={earthPos} /> */}
          {/* </OrbitSys> */}
        </OrbitSys>
      </object3D>
    </>
  );
}

export default App;
