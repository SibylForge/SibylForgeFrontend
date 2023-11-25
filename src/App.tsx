import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import { theme } from '@/theme';
import ThreeJsCanvas from '@/components/three/Canvas';
import NavBar from '@/components/common/NavBar';


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
