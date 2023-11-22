import React, { Suspense } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { Stats, OrbitControls, Center, Environment } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { useSnapshot } from 'valtio';
import state from '../store';

const MainModel = ({modelStr}) => {
  var gltf = ''
  if(modelStr !== ''){
    var modelstr = '/' + modelStr
    gltf = useLoader(GLTFLoader, modelstr)
  }

  return(
    <>
    <Center>
    <primitive object={gltf.scene} position={[0, 0.1, 0]} />
    </Center>
    </>
  )
}

const CanvasModel = () => {

  const snap = useSnapshot(state);

  return (
    <Canvas className='w-full max-w-full h-full transition-all ease-in'>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <Environment files="https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@environment/public/img/venice_sunset_1k.hdr" background blur={0.5} />
        <Center>
          {snap.model !== '' ?
          <Suspense fallback={null}>
            <MainModel modelStr={snap.model} />
          </Suspense> :
          <mesh>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial attach="material" color="#6be092" />
          </mesh>
          }
        </Center>
        <axesHelper args={[1]} position={[0, 0.1, 0]}   />
        <gridHelper />
        <OrbitControls />
        <Stats />
      </Suspense>
    </Canvas>
  )
}

export default CanvasModel