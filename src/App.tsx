import ThreeJsCanvas from '@/components/three/Canvas';
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import NavBar from '@/components/common/NavBar';
import { theme } from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeProvider options={theme.config}>
        <NavBar>
          <ThreeJsCanvas />
        </NavBar>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default App;
