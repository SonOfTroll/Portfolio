'use client'

import { useRef, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'

/* ═══════════════════════════════════════════════
   Procedural Environment Map — no external HDR needed
   ═══════════════════════════════════════════════ */
function ProceduralEnvironment() {
    const { scene, gl } = useThree()

    useEffect(() => {
        const pmremGenerator = new THREE.PMREMGenerator(gl)
        pmremGenerator.compileCubemapShader()

        const envScene = new THREE.Scene()
        // Dark gradient sky
        const skyColor = new THREE.Color('#0a0a1a')
        const groundColor = new THREE.Color('#050510')
        const hemisphereLight = new THREE.HemisphereLight(skyColor, groundColor, 0.3)
        envScene.add(hemisphereLight)

        // Subtle point lights for reflections
        const light1 = new THREE.PointLight('#1a3a5c', 0.5, 100)
        light1.position.set(10, 10, 10)
        envScene.add(light1)

        const light2 = new THREE.PointLight('#00ff41', 0.2, 100)
        light2.position.set(-10, -5, -10)
        envScene.add(light2)

        envScene.background = new THREE.Color('#050510')

        const envMap = pmremGenerator.fromScene(envScene, 0.04).texture
        scene.environment = envMap

        pmremGenerator.dispose()
        envScene.clear()

        return () => {
            envMap.dispose()
            scene.environment = null
        }
    }, [gl, scene])

    return null
}

/* ═══════════════════════════════════════════════
   Scroll-reactive offset hook (reads CSS scroll)
   ═══════════════════════════════════════════════ */
function useScrollOffset() {
    const ref = useRef(0)

    if (typeof window !== 'undefined') {
        const update = () => {
            const scrollY = window.scrollY
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight
            ref.current = maxScroll > 0 ? scrollY / maxScroll : 0
        }
        requestAnimationFrame(function loop() {
            update()
            requestAnimationFrame(loop)
        })
    }

    return ref
}

/* ═══════════════════════════════════════════════
   CAMERA ANIMATOR — Igloo Warp Zoom
   Flies camera INTO the sphere on project access
   ═══════════════════════════════════════════════ */
function CameraAnimator({ activeProject }: { activeProject: string | null }) {
    const { camera } = useThree()

    useEffect(() => {
        if (activeProject) {
            // WARP IN: Fly inside the crystal
            gsap.to(camera.position, { z: 0.5, duration: 1.5, ease: 'power4.inOut' })
        } else {
            // WARP OUT: Reset to default
            gsap.to(camera.position, { z: 10, duration: 1.5, ease: 'power4.inOut' })
        }
    }, [activeProject, camera])

    return null
}

/* ═══════════════════════════════════════════════
   THE CYBER-CORE — MASSIVE Background Icosahedron
   Scale 2 — atmospheric glass backdrop
   ═══════════════════════════════════════════════ */
function CyberCore({ activeProject }: { activeProject: string | null }) {
    const meshRef = useRef<THREE.Mesh>(null)
    const materialRef = useRef<THREE.MeshPhysicalMaterial>(null)
    const scrollOffset = useScrollOffset()

    // Smooth interpolation targets
    const target = useRef({ x: 0, y: 0, z: 0, scale: 2, rotSpeed: 0.3 })

    // Warp glitch effect on material when accessing projects
    useEffect(() => {
        if (!materialRef.current) return

        if (activeProject) {
            // Spike material distortion during warp
            gsap.to(materialRef.current, {
                ior: 3.5,
                thickness: 8,
                duration: 0.5,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut',
            })
        } else {
            gsap.to(materialRef.current, {
                ior: 1.5,
                thickness: 3,
                duration: 0.5,
                ease: 'power2.out',
            })
        }
    }, [activeProject])

    useFrame((state) => {
        if (!meshRef.current) return

        const time = state.clock.elapsedTime
        const offset = scrollOffset.current

        // ═══ SCROLL CHOREOGRAPHY ═══
        if (offset < 0.2) {
            target.current = { x: 0, y: 0, z: 0, scale: 2, rotSpeed: 0.3 }
        } else if (offset < 0.4) {
            const t = (offset - 0.2) / 0.2
            target.current = { x: 3.5 * t, y: -0.5 * t, z: 0, scale: 2 - 0.3 * t, rotSpeed: 0.4 }
        } else if (offset < 0.6) {
            const t = (offset - 0.4) / 0.2
            target.current = { x: 3.5 - 7 * t, y: -0.5, z: 0, scale: 1.7 - 0.2 * t, rotSpeed: 0.8 }
        } else if (offset < 0.8) {
            const t = (offset - 0.6) / 0.2
            target.current = { x: -3.5 * (1 - t), y: -0.5 * (1 - t), z: -2 * t, scale: 1.5 - 0.5 * t, rotSpeed: 0.2 }
        } else {
            const t = (offset - 0.8) / 0.2
            target.current = { x: 0, y: 0, z: -2 + 2 * t, scale: 1.0 + 3 * t, rotSpeed: 0.1 }
        }

        // Smooth interpolation (lerp)
        const lerp = 0.04
        meshRef.current.position.x += (target.current.x - meshRef.current.position.x) * lerp
        meshRef.current.position.y += (target.current.y - meshRef.current.position.y) * lerp
        meshRef.current.position.z += (target.current.z - meshRef.current.position.z) * lerp

        const currentScale = meshRef.current.scale.x
        const newScale = currentScale + (target.current.scale - currentScale) * lerp
        meshRef.current.scale.setScalar(newScale)

        // Rotation (continuous + scroll-reactive speed)
        meshRef.current.rotation.y += target.current.rotSpeed * 0.01
        meshRef.current.rotation.x += target.current.rotSpeed * 0.005
        meshRef.current.rotation.z = Math.sin(time * 0.2) * 0.1

        // Gentle float
        meshRef.current.position.y += Math.sin(time * 0.5) * 0.003
    })

    return (
        <mesh ref={meshRef} scale={2}>
            <icosahedronGeometry args={[1, 1]} />
            <meshPhysicalMaterial
                ref={materialRef}
                color="#00ff41"
                transmission={1}
                thickness={3}
                roughness={0.1}
                metalness={0.05}
                ior={1.5}
                transparent
                opacity={0.9}
                envMapIntensity={1.5}
                clearcoat={1}
                clearcoatRoughness={0.1}
                attenuationColor={new THREE.Color('#00ff41')}
                attenuationDistance={5}
            />
        </mesh>
    )
}

/* ═══════════════════════════════════════════════
   ICE PARTICLES — Floating debris
   ═══════════════════════════════════════════════ */
function IceParticles() {
    const meshRef = useRef<THREE.Points>(null)
    const count = 800

    const [positions, sizes] = useMemo(() => {
        const positions = new Float32Array(count * 3)
        const sizes = new Float32Array(count)
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 50
            positions[i * 3 + 1] = (Math.random() - 0.5) * 50
            positions[i * 3 + 2] = (Math.random() - 0.5) * 50
            sizes[i] = Math.random() * 2 + 0.3
        }
        return [positions, sizes]
    }, [])

    useFrame((state) => {
        if (!meshRef.current) return
        const time = state.clock.elapsedTime
        const posArray = meshRef.current.geometry.attributes.position.array as Float32Array
        for (let i = 0; i < count; i++) {
            const i3 = i * 3
            posArray[i3 + 1] += Math.sin(time * 0.15 + i * 0.08) * 0.001
            posArray[i3] += Math.cos(time * 0.1 + i * 0.04) * 0.0005
        }
        meshRef.current.geometry.attributes.position.needsUpdate = true
        meshRef.current.rotation.y = time * 0.01
    })

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={count}
                    array={sizes}
                    itemSize={1}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.04}
                color="#a0d4ff"
                transparent
                opacity={0.4}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    )
}

/* ═══════════════════════════════════════════════
   FLOATING SHARDS — Small crystals orbiting
   ═══════════════════════════════════════════════ */
function FloatingShards() {
    const groupRef = useRef<THREE.Group>(null)

    const shards = useMemo(() => {
        return Array.from({ length: 20 }, (_, i) => ({
            position: [
                (Math.random() - 0.5) * 25,
                (Math.random() - 0.5) * 25,
                (Math.random() - 0.5) * 20,
            ] as [number, number, number],
            rotation: [
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI,
            ] as [number, number, number],
            scale: Math.random() * 0.15 + 0.03,
            speed: Math.random() * 0.4 + 0.1,
        }))
    }, [])

    useFrame((state) => {
        if (!groupRef.current) return
        const time = state.clock.elapsedTime
        groupRef.current.children.forEach((child, i) => {
            child.rotation.x += shards[i].speed * 0.004
            child.rotation.z += shards[i].speed * 0.002
            child.position.y += Math.sin(time * shards[i].speed + i) * 0.001
        })
    })

    return (
        <group ref={groupRef}>
            {shards.map((shard, i) => (
                <mesh key={i} position={shard.position} rotation={shard.rotation} scale={shard.scale}>
                    <octahedronGeometry args={[1, 0]} />
                    <meshPhysicalMaterial
                        color="#c0e8ff"
                        transparent
                        opacity={0.1}
                        roughness={0.05}
                        metalness={0}
                        transmission={0.6}
                        thickness={0.3}
                    />
                </mesh>
            ))}
        </group>
    )
}

/* ═══════════════════════════════════════════════
   SCENE EXPORT — The 3D Engine
   Fixed background, z-index: -1, pointer-events: none
   ═══════════════════════════════════════════════ */
export default function Scene({ activeProject }: { activeProject: string | null }) {
    return (
        <Canvas
            camera={{ position: [0, 0, 10], fov: 55 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            style={{ background: 'transparent' }}
        >
            <Suspense fallback={null}>
                {/* Lighting — cold, ethereal */}
                <ambientLight intensity={0.2} color="#b0d4ff" />
                <directionalLight position={[5, 8, 5]} intensity={0.4} color="#d0e8ff" />
                <pointLight position={[-5, -3, -5]} intensity={0.15} color="#00ff41" distance={20} />
                <pointLight position={[3, 5, -8]} intensity={0.1} color="#4080ff" distance={25} />

                {/* Fog */}
                <fog attach="fog" args={['#050505', 10, 40]} />

                {/* Procedural environment for reflections — no external HDR fetch */}
                <ProceduralEnvironment />

                {/* Camera Warp Animator */}
                <CameraAnimator activeProject={activeProject} />

                {/* The Cyber-Core — MASSIVE */}
                <CyberCore activeProject={activeProject} />

                {/* Particles & Shards */}
                <IceParticles />
                <FloatingShards />
            </Suspense>
        </Canvas>
    )
}
