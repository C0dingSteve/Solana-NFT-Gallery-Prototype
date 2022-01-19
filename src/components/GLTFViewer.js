import { useRef, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'

function Model({link}) {
  const group = useRef()
  const gltf = useGLTF(link)
  console.log("gltf" + gltf.scene);
  return (
    <primitive object={gltf.scene} position={[0, 0, 0]} />
  )
}

export default function GLTFViewer({url}) {
  return (
    <div className="App">
      <Canvas style={{width:'50px'}} camera={{ position: [0, 0, 10] }}>
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