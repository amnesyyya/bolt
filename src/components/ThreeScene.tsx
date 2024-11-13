import React, { useRef, useState, useEffect, Suspense } from 'react'
    import { Canvas, useFrame, useThree } from '@react-three/fiber'
    import { Environment } from '@react-three/drei'
    import * as THREE from 'three'

    function DebugCube() {
      return (
        <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      )
    }

    function CameraController() {
      const { camera } = useThree()
      const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
      const originalPosition = useRef(new THREE.Vector3(0, 0, 10))
      const currentPosition = useRef(new THREE.Vector3(0, 0, 10))

      useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
          const x = (event.clientX / window.innerWidth) * 2 - 1
          const y = -(event.clientY / window.innerHeight) * 2 + 1
          
          setMousePos({ 
            x: x * 1.5,
            y: y * 1.5
          })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
      }, [])

      useFrame(() => {
        currentPosition.current.x = THREE.MathUtils.lerp(
          currentPosition.current.x, 
          originalPosition.current.x + mousePos.x, 
          0.05
        )
        
        currentPosition.current.y = THREE.MathUtils.lerp(
          currentPosition.current.y, 
          originalPosition.current.y + mousePos.y, 
          0.05
        )

        camera.position.copy(currentPosition.current)
        camera.lookAt(0, 0, 0)
      })

      return null
    }

    export default function ThreeScene() {
      const [backgroundColor, setBackgroundColor] = useState('#2a2a2a')
      const [isClient, setIsClient] = useState(false)

      useEffect(() => {
        setIsClient(true)
      }, [])

      return (
        <div className="hero-container">
          <div className="overlay">
            <div className="controls">
              <input 
                type="color" 
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
              />
            </div>
            <div className="hero-text">
              <h1>Explore Interactive 3D Worlds</h1>
              <p>Interact with models, change backgrounds, and discover immersive experiences</p>
            </div>
          </div>
          {isClient && (
            <Canvas 
              className="canvas-container"
              camera={{ 
                position: [0, 0, 10],
                fov: 45
              }}
              style={{ background: backgroundColor }}
              onClick={(e) => e.preventDefault()}
            >
              <CameraController />
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} intensity={0.8} />
              <Suspense fallback={null}>
                <DebugCube />
                <Environment preset="studio" />
              </Suspense>
            </Canvas>
          )}
        </div>
      )
    }
