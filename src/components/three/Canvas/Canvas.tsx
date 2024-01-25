import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import {
  OrbitControls,
  Box,
  Sphere,
  KeyboardControls,
  useKeyboardControls,
  KeyboardControlsEntry,
} from '@react-three/drei';
import { BallCollider, CuboidCollider, RigidBody, quat, Physics } from '@react-three/rapier';
import { Flex } from '@chakra-ui/react';
import { GridHelper, Mesh, PlaneGeometry, TextureLoader } from 'three';
import { useRef, Suspense, useState, useMemo } from 'react';
import Ball from '../Ball';
import * as THREE from 'three';
import { Controls } from '@/App';

function ThreeJsCanvas() {
  // const ref = useRef<GridHelper>(null!!);
  // const ref = useRef<PlaneGeometry>(null!!);
  const [hover, setHover] = useState(false);
  const [start, setStart] = useState(false);
  const ref = useRef<Mesh>(null!!);
  const texture = useLoader(TextureLoader, [
    '../img/laminate_floor_02_diff_4k.jpg',
    '../img/leather_white_diff_4k.jpg',
  ]);
  const cube = useRef<any>();
  const kicker = useRef<any>();
  const jump = () => {
    if (isOnFloor.current) {
      cube.current?.applyImpulse({ x: 0, y: 5, z: 0 }); // 往上跳
      isOnFloor.current = false;
    }
    // cube.current.applyImpulse({ x: 4, y: 0.1, z: 0 }); // 往右邊移動
  };
  const jumpPressed = useKeyboardControls((state) => state[Controls.jump]);
  const leftPressed = useKeyboardControls((state) => state[Controls.left]);
  const rightPressed = useKeyboardControls((state) => state[Controls.right]);
  const backPressed = useKeyboardControls((state) => state[Controls.back]);
  const forwardPressed = useKeyboardControls((state) => state[Controls.forward]);

  const handleMovement = () => {
    if (!isOnFloor.current) {
      return;
    }
    if (rightPressed) {
      cube.current.applyImpulse({ x: 0.1, y: 0, z: 0 });
    }
    if (leftPressed) {
      cube.current.applyImpulse({ x: -0.1, y: 0, z: 0 });
    }

    if (forwardPressed) {
      cube.current.applyImpulse({ x: 0, y: 0, z: -0.1 });
    }
    if (backPressed) {
      cube.current.applyImpulse({ x: 0, y: 0, z: 0.1 });
    }
  };

  // const speed = useRef(5);

  useFrame((_state, delta) => {
    if (jumpPressed) {
      jump();
    }
    handleMovement();
    if (!start) {
      return;
    }
    const curRotation = quat(kicker.current.rotation());
    // const incrementRotation = new THREE.Quaternion().setFromAxisAngle(
    //   new THREE.Vector3(0, 1, 0)
    // delta * speed.current
    // );
    // curRotation.multiply(incrementRotation);
    kicker.current.setNextKinematicRotation(curRotation);

    // speed.current += delta;
  });

  const isOnFloor = useRef(true);

  return (
    <Suspense>
      <Physics debug>
        <ambientLight intensity={0.5} />
        <directionalLight position={[-10, 10, 0]} intensity={0.4} />
        <OrbitControls />
        {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} /> */}
        {/* <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} /> */}
        {/* <Box texture={texture[0]} position={[-1.2, 0, 0]} /> */}
        {/* <Box texture={texture[1]} position={[1.2, 0, 0]} /> */}
        {/* <OrbitControls /> */}
        {/* <gridHelper args={[1, 1]} ref={ref} /> */}
        {/* <Ball floor={ref} texture={texture[1]} /> */}
        {/* <mesh receiveShadow rotation={[5, 0, 0]} position={[0, 0, 0]} ref={ref}>
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial attach="material" color="white" map={texture[0]} />
          </mesh> */}
        {/* <planeGeometry args={[100, 100, 1, 1]} ref={ref} />
        <meshStandardMaterial map={texture[1]} /> */}

        <RigidBody
          position={[-2.5, 1, 0]}
          ref={cube}
          // colliders={'ball'}
          onCollisionEnter={({ other }) => {
            if (other?.rigidBodyObject?.name === 'floor') {
              isOnFloor.current = true;
            }
          }}
          onCollisionExit={({ other }) => {
            if (other?.rigidBodyObject?.name === 'floor') {
              isOnFloor.current = false;
            }
          }}
        >
          {/* <Sphere
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
            onClick={() => setStart(true)}
          >
            <meshStandardMaterial color={hover ? 'hotpink' : 'royalblue'} map={texture[1]} />
          </Sphere> */}
          <Box
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
            onClick={() => setStart(true)}
          >
            <meshStandardMaterial color={hover ? 'hotpink' : 'royalblue'} />
          </Box>
        </RigidBody>

        <RigidBody type="kinematicPosition" position={[0, 0.75, 0]} ref={kicker}>
          <group position={[2.5, 0, 0]}>
            <Box args={[5, 0.5, 0.5]}>
              <meshStandardMaterial color="peachpuff" />
            </Box>
          </group>
        </RigidBody>

        <RigidBody type="fixed" name="floor">
          <Box position={[0, 0, 0]} args={[10, 1, 10]}>
            <meshStandardMaterial map={texture[0]} />
          </Box>
        </RigidBody>
      </Physics>
    </Suspense>
  );
}

export default ThreeJsCanvas;
