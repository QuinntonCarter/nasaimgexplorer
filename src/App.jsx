/* eslint-disable react/no-unknown-property */
import "./App.css";
import {
  EnvironmentMap,
  OrbitControls,
  useEnvironment,
} from "@react-three/drei";
import { useRef } from "react";
import Earth from "./components/celestial_bodies/earth/Earth";
import Sun from "./components/celestial_bodies/Sun";
import OrbitSys from "./components/OrbitSys";
import Mercury from "./components/celestial_bodies/Mercury";
import Venus from "./components/celestial_bodies/Venus";
import Mars from "./components/celestial_bodies/Mars";
import Jupiter from "./components/celestial_bodies/Jupiter";
import Saturn from "./components/celestial_bodies/Saturn";
import Uranus from "./components/celestial_bodies/Uranus";
import Neptune from "./components/celestial_bodies/Neptune";

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
        {/* adds mercury orbit sys */}
        <OrbitSys rotationSpeed={0.05}>
          <Mercury />
        </OrbitSys>
        {/* adds venus orbit sys */}
        <OrbitSys rotationSpeed={0.05}>
          <Venus />
        </OrbitSys>
        <OrbitSys rotationSpeed={0.05}>
          <Earth earthRadius={earthRadius} earthPos={earthPos} />
        </OrbitSys>
        {/* adds mars orbit sys */}
        <OrbitSys rotationSpeed={0.05}>
          <Mars />
        </OrbitSys>
        {/* adds jupiter orbit sys */}
        <OrbitSys rotationSpeed={0.05}>
          <Jupiter />
        </OrbitSys>
        {/* adds saturn orbit sys */}
        <OrbitSys rotationSpeed={0.05}>
          <Saturn />
        </OrbitSys>
        {/* adds uranus orbit sys */}
        <OrbitSys rotationSpeed={0.05}>
          <Uranus />
        </OrbitSys>
        {/* adds neptune orbit sys */}
        <OrbitSys rotationSpeed={0.05}>
          <Neptune />
        </OrbitSys>
        {/* adds pluto orbit sys <3 */}
        <OrbitSys rotationSpeed={0.05}>{/* <Pluto /> */}</OrbitSys>
      </object3D>
    </>
  );
}

export default App;
