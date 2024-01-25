import { useRef, useState } from 'react';
import { useFrame, ReactThreeFiber } from '@react-three/fiber';
import { Mesh, Texture } from 'three';
import { useGLTF } from '@react-three/drei';

function Floor() {
  const ref = useRef<Mesh>(null!);

  useFrame((_, delta) => {
    ref.current.rotation.x += delta;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 1, 1]} />
    </mesh>
  );
}

export default Floor;
