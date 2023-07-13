import { extendTheme } from '@chakra-ui/react'
import { menuTheme } from './menuTheme'

const theme = extendTheme(
  {
    // Colors for product attributes
    semanticTokens: {
      colors: {
        new: '#66ADEA',
        preorder: 'mainPurple.400',
        soldout: 'red'
      },
    },
    // Color schemes
    colors: {
      mainBlue: {
        100: "#AFE6FE",
        200: "#9BDCF8",
        300: "#88D3F3",
        400: "#66ADEA", // light blue - new text
        500: "#61B6DA", // blue - button
        600: "#4595B7", // darker blue - button hover
        700: "#438AA8",
        800: "#306F89",
        900: "#1D546B",
      },
      mainPurple: {
        100: "#FFFFFF", // white - text, bg
        150: "#FAF8FA", // lighter red - text boxes
        200: "#EAEAEA", // light red - bg
        300: "#E4DBDB", // light red - text
        400: "#D16F7F", // light pink - preorder text, heading text
        500: "#CE628D",
        600: "#B74682",
        700: "#9C307C",
        800: "#7E1F69", // light purple - menu
        900: "#3B0839", // dark purple - header, footer
      }
    },
    // Fonts
    fonts: {
      baseStyle: `'Vazirmatn', 'Kreon', Georgia, Arial, sans-serif`,
      headingLinks: `'Gluten', Georgia, Arial, sans-serif`,
      titleStyle: `'Fredoka', 'Vazirmatn', Arial, sans-serif`,
    },
    // Text decorating
    textStyles: {
      baseStyle: {
        fontFamily: 'var(--chakra-fonts-baseStyle)',
        fontSize: '15px',
        fontWeight: '300',
        letterSpacing: '.01em',
        lineHeight: '1.4em',
      },
      headingLinks: {
        color: 'mainPurple.300',
        fontFamily: 'var(--chakra-fonts-headingLinks)',
        fontSize: '22px',
        fontWeight: 'bold',
        letterSpacing: '.06em',
        lineHeight: '1.8em',
      },
      header: {
        fontFamily: 'var(--chakra-fonts-titleStyle)',
        fontSize: '16px',
        fontWeight: '400',
        letterSpacing: '.06em',
      },
      footer: {
        color: 'mainPurple.300',
        fontFamily: 'var(--chakra-fonts-baseStyle)',
        fontSize: '13px',
        letterSpacing: '.06em',
      }
    },
    // Component base styles
    components: {
      Menu: menuTheme,
      Link: {
        /*variants: {
          primary: ({ colorScheme = "purple" }) => ({
            color: `${colorScheme}.500`,
            _hover: {
              color: `${colorScheme}.400`,
            },
          }),
        },
        defaultProps: {
          variant: "primary",
        },*/
        baseStyle: {
          transitionDuration: "200ms",
          _hover: {
            color: '#FFFFFF',
            textDecoration: 'none'
          },
        },
      },
      Button: {
        defaultProps: {
          colorScheme: 'mainBlue',
        },
        baseStyle: {
          fontFamily: 'var(--chakra-fonts-baseStyle)',
          fontSize: '25px',
          fontWeight: '400',
          letterSpacing: '.02em',
          lineHeight: '1.2em',
        },
      },
      IconButton: {
        defaultProps: {
          colorScheme: 'mainBlue',
          fontSize: 'xl',
        },
        baseStyle: {
          fontSize: 'xl',
        },
      },
      Heading: {
        baseStyle: {
          color: '#505050',
          decoration: 'none',
          fontFamily: 'var(--chakra-fonts-headingLinks)',
          fontSize: '50px',
          fontWeight: '600',
          lineHeight: '1.2em',
          letterSpacing: '.05em'
        },
      },
      List: {
        // this will style the MenuList component
        color: '#505050',
        py: '4',
        borderRadius: 'xl',
        border: 'none',
        bg: 'teal.500',
      },
      Item: {
        // this will style the MenuItem and MenuItemOption components
        color: '#505050',
        _hover: {
          bg: 'teal.600',
        },
        _focus: {
          bg: 'teal.600',
        },
      },
      GroupTitle: {
        // this will style the text defined by the title prop
        // in the MenuGroup and MenuOptionGroup components
        textTransform: 'uppercase',
        color: '#505050',
        textAlign: 'center',
        letterSpacing: 'wider',
        opacity: '0.7',
      },
      Tabs: {
        variants: {
          line: {
            tab: {
              _selected: {
                color: "red.500"
              }
            }
          }
        },
        baseStyle: {
          tab: {
            _focus: {
              boxShadow: "none"
            },
            _hover: {
              bg: "blue.200"
            },
            _selected: {
              _hover: {
                bg: "blue.200"
              }
            }
          }
        }
      },
    },
    styles: {
      global: {
        body: {
          bg: 'gray.400',
          color: 'white',
        },
        "*": {
          borderColor: '#E4DBDB'
        },
      },
    },
  });

export default theme
