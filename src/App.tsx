import { ChakraProvider, ColorModeProvider, Flex } from '@chakra-ui/react';
import { theme } from '@/theme';
import ThreeJsCanvas from '@/components/three/Canvas';
import NavBar from '@/components/common/NavBar';
import { useMemo } from 'react';
import { KeyboardControls, KeyboardControlsEntry } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
export const Controls = {
  forward: 'forward',
  back: 'back',
  left: 'left',
  right: 'right',
  jump: 'jump',
};

function App() {
  const map = useMemo<KeyboardControlsEntry[]>(
    () => [
      { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
      { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
      { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
      { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
      { name: Controls.jump, keys: ['Space'] },
    ],
    []
  );
  return (
    <ChakraProvider theme={theme}>
      <ColorModeProvider options={theme.config}>
        <NavBar>
          <KeyboardControls map={map}>
            <Flex w="100%" h="100vh">
              <Canvas shadows camera={{ position: [10, 10, 10], fov: 30 }}>
                <ThreeJsCanvas />
              </Canvas>
            </Flex>
          </KeyboardControls>
        </NavBar>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default App;
