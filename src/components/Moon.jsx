import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { damp } from "three/src/math/MathUtils";

export default function Moon({ earthRadius }) {
  const moonRef = useRef(null);
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime() * 0.5;
    let axis = new THREE.Vector3(earthRadius).normalize();
    // const quaternion = new THREE.Quaternion();
    // let x = Math.sin(time + axis);
    // let y = Math.cos(time + axis);
    // let angle = x + y;
    // quaternion.setFromAxisAngle(axis, angle);
    // moonRef.current.applyQuaternion(quaternion);
    // * * *
    damp((moonRef.current.position.x -= Math.sin(time + axis.x * 0.5) * 0.05));
    damp((moonRef.current.position.y -= Math.cos(time + axis.y * 0.5) * 0.05));
    // * * *
    // moonRef.current.position.y -=
    //   Math.cos(time + testMoonVec.x * 0.5 * -1) * 0.05;
    // moonRef.current.position.x -=
    //   Math.sin(time + testMoonVec.x * 0.5 * -1) * 0.05;
    // moonRef.current.position.z -=
    //   Math.sin(time + testMoonVec.x * 0.5 * -1) * 0.05;
  });

  return (
    <>
      <mesh ref={moonRef} scale={[1, 1, 1]} position={[0, 0, 0]}>
        <sphereGeometry />
        <meshStandardMaterial color="lightgray" />
      </mesh>
    </>
  );
}
