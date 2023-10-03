/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 ./public/nasaNeptune.glb --transform 
Files: ./public/nasaNeptune.glb [585.1KB] > nasaNeptune-transformed.glb [48.58KB] (92%)
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/nasaNeptune-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Neptune.geometry} material={materials['Default OBJ.001']} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  )
}

useGLTF.preload('/nasaNeptune-transformed.glb')
