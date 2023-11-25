import { useFrame, ReactThreeFiber } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Mesh } from 'three';

export interface IBoxProps {
  position: ReactThreeFiber.Vector3;
}

function Box(props: IBoxProps) {
  const ref = useRef<Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const { position } = props;
  useFrame((_, delta) => {
    ref.current.rotation.x += delta;
  });

  return (
    <mesh
      position={position}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={() => click(!clicked)}
      onPointerOver={(event) => {
        event.stopPropagation();
        hover(true);
      }}
      onPointerOut={() => hover(false)}
    >
      <sphereGeometry args={[1, 100, 100]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

export default Box;
