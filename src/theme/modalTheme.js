import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  header: {
    color: "gray.600",
  },
  overlay: {
  },
  dialogContainer: {
    color: "gray.600"
  },
  dialog: {
    color: "gray.600",
  },
  closeButton: {
  },
  body: {
  },
  footer: {
  },
})

export const modalTheme = defineMultiStyleConfig({ baseStyle })
