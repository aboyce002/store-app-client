import { useState } from 'react';
import { AbsoluteCenter, Container, IconButton, Image, useBreakpointValue } from '@chakra-ui/react';
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Slider from 'react-slick';

const ProductCarousel = (props) => {
  // Go through array of product's images and check for current image index
  const initialSlideValue = props.product.additional_images.findIndex(image => image === props.currentImage);

  // Settings for the slider
  const settings = {
    adaptiveHeight: true,
    accessibility: true,
    dots: false,
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: false,
    speed: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: initialSlideValue,
    swipe: false,
  };

  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = useState(null);
  //const sliderRef = useRef(null);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: '50%', md: '50%' });
  const side = useBreakpointValue({ base: '0px', md: '-0px' });
  const arrowSize = useBreakpointValue({ base: '30px', md: '50px' });

  console.log("current carousel image: ", props.currentImage);

  // These are the images used in the slide
  const cards = props.product.additional_images;

  return (
    <AbsoluteCenter>
      <Container
        overflow={'hidden'}
        align="center"
        minW={"calc(40vw)"}
      >
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
          icon={<AiOutlineLeft />}
          isRound={true}
          p='4px'
          aria-label="left-arrow"
          fontSize={arrowSize}
          size='xl'
          color="white"
          variant="ghost"
          _hover={{ bg: 'rgba(33, 33, 33, 0.3)' }}
          position="absolute"
          left={side}
          top={top}
          transform={'translate(0%, -50%)'}
          zIndex={1}
          onClick={() => slider?.slickPrev()} />
        {/* Right Icon */}
        <IconButton
          icon={<AiOutlineRight />}
          isRound={true}
          p='4px'
          aria-label="right-arrow"
          fontSize={arrowSize}
          size='xl'
          color="white"
          variant="ghost"
          _hover={{ bg: 'rgba(33, 33, 33, 0.3)' }}
          position="absolute"
          right={side}
          top={top}
          transform={'translate(0%, -50%)'}
          zIndex={1}
          onClick={() => slider?.slickNext()} />
        {/* Slider */}
        <Slider {...settings} ref={(slider) => setSlider(slider)}>
          {cards.map((url, index) => (
            <Image
              key={index}
              height={['500px', 'auto']}
              maxW={"500px"}
              src={url}
              objectFit='cover' />
          ))}
        </Slider>
      </Container>
    </AbsoluteCenter>
  );
}

export default ProductCarousel;
