import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Fire(props) {
  const { nodes, materials } = useGLTF('/fire/scene.gltf')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={20} position={[0,1,0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials['0.400000_0.400000_0.400000_0.000000_0.000000']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={materials['0.501961_0.501961_0.501961_0.000000_0.000000']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_4.geometry}
          material={materials['0.600000_0.600000_0.600000_0.000000_0.000000']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_5.geometry}
          material={materials['0.819608_0.752941_0.674510_0.000000_0.000000']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_6.geometry}
          material={materials['0.901961_0.901961_0.901961_0.000000_0.000000']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_7.geometry}
          material={materials['0.913725_0.647059_0.329412_0.000000_0.000000']}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/fire/scene.gltf')