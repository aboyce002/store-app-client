import { useState, Fragment } from 'react';
import { Box, IconButton, useBreakpointValue } from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
// And react-slick as our Carousel Lib
import Slider from 'react-slick';

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 700,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipe: false,
};

const HomeCarousel = () => {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = useState(null);
  //const sliderRef = useRef(null);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: '50%', md: '50%' });
  const side = useBreakpointValue({ base: '0px', md: '0px' });
  const arrowSize = useBreakpointValue({ base: '30px', md: '50px' });

  // These are the images used in the slide
  const cards = [
    require('../../../assets/images/carousel-plush-banner.png'),
    require('../../../assets/images/carousel-dinos-banner.png'),
    require('../../../assets/images/carousel-charms_c-banner.png'),
  ];

  return (
      <Box
        position={'relative'}
        height={[150, 250, 350, 500]}
        w="100%"
        overflow={'hidden'}>
        {/* CSS files for react-slick */}
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        {/* Left Icon */}
        <IconButton
          aria-label="left-arrow"
          fontSize={arrowSize}
          height="100%"
          color="white"
          variant="ghost"
          borderRadius="0px"
          _hover={{ bg: 'rgba(33, 33, 33, 0.3)' }}
          position="absolute"
          left={side}
          top={top}
          transform={'translate(0%, -50%)'}
          zIndex={1}
          onClick={() => slider?.slickPrev()}>
          <AiOutlineLeft border="6px solid red" />
        </IconButton>
        {/* Right Icon */}
        <IconButton
          aria-label="right-arrow"
          fontSize={arrowSize}
          height="100%"
          color="white"
          variant="ghost"
          borderRadius="0px"
          _hover={{ bg: 'rgba(33, 33, 33, 0.3)' }}
          position="absolute"
          right={side}
          top={top}
          transform={'translate(0%, -50%)'}
          zIndex={1}
          onClick={() => slider?.slickNext()}>
          <AiOutlineRight />
        </IconButton>
        {/* Slider */}
        <Slider {...settings} ref={(slider) => setSlider(slider)}>
          {cards.map((url, index) => (
            <Fragment key={index}>
              <Box
                key={index}
                height={'lg'}
                position="relative"
                backgroundPosition="center"
                backgroundSize="contain"
                backgroundRepeat="no-repeat"
                backgroundImage={`url(${url})`}
                backdropFilter="auto"
                backdropBlur="6px">
              </Box>
            </Fragment>
          ))}
        </Slider>
      </Box>
  );
}
// <TextCard text={cardText[index]}/>

export default HomeCarousel;
