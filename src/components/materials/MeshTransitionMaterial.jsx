import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import { easing } from 'maath' 

const MeshTransitionMaterial = (props) => {
    const materialRef = useRef()
    
    useFrame((_, delta) => {
        easing.dampC(
            materialRef.current.color,
            props.transitionColor,
            props.transitionTime ? props.transitionTime : 0.25,
            delta
        )
    })
  
    return (
        <meshPhysicalMaterial ref={materialRef} {...props} />
    )
}

export default MeshTransitionMaterial
