import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Canvas } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Canvas shadows={false} camera={{ position: [18, 50, 0] }}>
    {/* <EffectComposer></EffectComposer> */}
    <App />
  </Canvas>
);
