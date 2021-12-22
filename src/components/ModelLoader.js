import { useRef, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'

function Model({link}) {
  const group = useRef()
  const gltf = useGLTF(link)
  return (
    <primitive object={gltf.scene} position={[0, 0, 0]} />
  )
}

//useGLTF.preload('https://bafybeidaknpdtvgn5v6poj2vxl4gfx2ii6uqmzfubcgbungd26d7iupnnq.ipfs.infura-ipfs.io')

export default function ModelLoader({url}) {
  return (
    <div className="App">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.5} />
          <spotLight intensity={0.8} position={[300, 300, 400]} />
          <Suspense fallback={null}>
            <Model link={url}/>
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  )
}