import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Canvas } from "@react-three/fiber";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Canvas shadows={true} camera={{ position: [18, 50, 0] }}>
    <App />
  </Canvas>
);
