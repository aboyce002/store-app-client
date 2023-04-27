import { menuAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys)

// define the base component styles
const baseStyle = definePartsStyle({
  // define the part you're going to style
  button: {
    // this will style the MenuButton component
  },
  list: {
    // this will style the MenuList component
    color: '#505050',
    py: '4',
    borderRadius: 'md',
    border: 'white',
    bg: 'mainPurple.200',
    boxShadow: 'md',
  },
  item: {
    // this will style the MenuItem and MenuItemOption components
    color: '#505050',
    _hover: {
      bg: 'mainPurple.300',
    },
    _focus: {
      bg: 'mainPurple.300',
    },
  },
  groupTitle: {
    // this will style the text defined by the title prop
    // in the MenuGroup and MenuOptionGroup components
    textTransform: 'uppercase',
    color: '#505050',
    opacity: '0.7',
  },
  command: {
    // this will style the text defined by the command
    // prop in the MenuItem and MenuItemOption components
    opacity: '0.8',
    letterSpacing: 'tighter',
  },
  divider: {
    // this will style the MenuDivider component
    borderColor: 'white',
    borderBottom: '2px dotted',
  },
})
// export the base styles in the component theme
export const menuTheme = defineMultiStyleConfig({ baseStyle })
