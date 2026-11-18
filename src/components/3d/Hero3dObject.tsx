import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

const InteractivePrismRing = () => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const { pointer } = state
    const time = state.clock.getElapsedTime()

    // Smooth rotational glide + interactive cursor tilt
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      pointer.y * 0.7 + time * 0.25,
      0.05
    )
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      pointer.x * 1.0 + time * 0.35,
      0.05
    )
  })

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={1.35}>
        <torusKnotGeometry args={[1, 0.32, 96, 24, 2, 3]} />
        <meshPhysicalMaterial
          roughness={0.08}
          metalness={0.15}
          transmission={0.85}
          ior={1.52}
          color="#F3C3CF"
          reflectivity={0.95}
          clearcoat={1}
          clearcoatRoughness={0.08}
        />
      </mesh>
    </Float>
  )
}

export const Hero3dObject: React.FC<{ className?: string }> = ({ className = 'w-48 h-48 sm:w-64 sm:h-64' }) => {
  return (
    <div className={`relative ${className} pointer-events-auto select-none`}>
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 8, 5]} intensity={2.5} color="#FFF0F5" />
        <pointLight position={[-5, -5, -2]} intensity={1.8} color="#141937" />
        <InteractivePrismRing />
      </Canvas>
    </div>
  )
}
