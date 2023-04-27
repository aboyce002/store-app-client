import { Global } from '@emotion/react'

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'Fredoka';
        src: local('Fredoka'), url('../assets/fonts/Fredoka/Fredoka-VariableFont_wdth,wght.ttf') format('truetype');
      }
      @font-face {
        font-family: 'Gluten';
        src: local('Gluten'), url('../assets/fonts/Gluten/Gluten-VariableFont_slnt_wght.ttf') format('truetype');
      }
      @font-face {
        font-family: 'Overpass';
        src: local('Overpass'), url('../assets/fonts/Overpass/Overpass-VariableFont_wght.ttf') format('truetype');
      }
      @font-face {
        font-family: 'Overpass Italic';
        src: local('Overpass Italic'), url('../assets/fonts/Overpass/Overpass-Italic-VariableFont_wght.ttf') format('truetype');
      }
      @font-face {
        font-family: 'Vazirmatn';
        src: local('Vazirmatn'), url('../assets/fonts/Vazirmatn/Vazirmatn-VariableFont_wght.ttf') format('truetype');
      }
    `}
  />
)

export default Fonts;
