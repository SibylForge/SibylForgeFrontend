import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Quaternion, SphereGeometry, Mesh, Vector3, Texture } from 'three';

function useKeyboard() {
  const keyMap = useRef<{ [key: string]: boolean }>({});

  useEffect(() => {
    const onDocumentKey = (e: KeyboardEvent) => {
      keyMap.current[e.code] = e.type === 'keydown';
    };
    document.addEventListener('keydown', onDocumentKey);
    document.addEventListener('keyup', onDocumentKey);
    return () => {
      document.removeEventListener('keydown', onDocumentKey);
      document.removeEventListener('keyup', onDocumentKey);
    };
  }, []);

  return keyMap.current;
}

interface BallProps {
  floor: any;
  texture: Texture;
}

function Ball({ floor, texture }: BallProps) {
  const ref = useRef<Mesh>(null!!);
  const keyMap = useKeyboard();

  const v = useMemo(() => new Vector3(), []);
  const q = useMemo(() => new Quaternion(), []);
  const angularVelocity = useMemo(() => new Vector3(), []);

  useFrame((_, delta) => {
    keyMap['KeyW'] && (angularVelocity.x -= delta * 5);
    keyMap['KeyS'] && (angularVelocity.x += delta * 5);
    keyMap['KeyA'] && (angularVelocity.z += delta * 5);
    keyMap['KeyD'] && (angularVelocity.z -= delta * 5);

    q.setFromAxisAngle(angularVelocity, delta).normalize();
    ref?.current?.applyQuaternion(q);

    angularVelocity.lerp(v, 0.01); // slow down the roll

    floor.current!.position.x += angularVelocity.z * delta;
    floor.current!.position.z -= angularVelocity.x * delta;

    floor.current!.position.x = floor.current!.position.x % 10;
    floor.current!.position.z = floor.current!.position.z % 10;
  });

  return (
    <mesh ref={ref} position-y={1.0}>
      <sphereGeometry args={[1, 32, 32]} />
      {/* <meshNormalMaterial wireframe /> */}
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

export default Ball;
