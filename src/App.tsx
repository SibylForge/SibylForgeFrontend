import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import { theme } from '@/theme';
import ThreeJsCanvas from '@/components/three/Canvas';
import NavBar from '@/components/common/NavBar';
import Chat from '@/components/common/Chat';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeProvider options={theme.config}>
        <NavBar>
          <Chat />
          <ThreeJsCanvas />
        </NavBar>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default App;
