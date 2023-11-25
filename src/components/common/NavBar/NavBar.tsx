import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Avatar,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Button,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

export interface INavBarProps extends PropsWithChildren {}

export default function NavBar(props: INavBarProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  return (
    <Box>
      <Box zIndex={2000} w="100%" position="fixed" top={0}>
        <Flex h="80px" p="20px" alignItems="center" justifyContent="space-between">
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton isActive={isOpen} as={Button}>
                  {isOpen ? <CloseIcon /> : <HamburgerIcon />}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => window.open('https://github.com/SibylForge')}>Contributor</MenuItem>
                  <MenuItem onClick={() => window.open('https://github.com/SibylForge')}>Donation</MenuItem>
                </MenuList>
              </>
            )}
          </Menu>

          <Text cursor="pointer" onClick={() => navigate('/')}>
            SibylForge
          </Text>

          <Box>
            <Menu>
              <MenuButton>
                <Avatar size="sm" />
              </MenuButton>
              <MenuList>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Setting</MenuItem>
                <MenuItem onClick={toggleColorMode}>
                  Switch Color to {colorMode === 'light' ? 'Dark' : 'Light'}
                </MenuItem>
                <MenuDivider />
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Box>
      {props.children}
    </Box>
  );
}
