import "./App.css";
import { Center, OrbitControls } from "@react-three/drei";
import Earth from "./components/Earth";
import Moon from "./components/Moon";

function App() {
  const earthRadius = 4;
  return (
    <>
      <OrbitControls />

      <directionalLight position={[1, 2, 3]} intensity={0.5} color={"white"} />
      <ambientLight intensity={0.3} />
      <group position={[-2, 0, -8]}>
        <Earth earthRadius={earthRadius} />
        <Moon earthRadius={earthRadius} />
      </group>
    </>
  );
}

export default App;
