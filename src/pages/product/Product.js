import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams, Link } from 'react-router-dom';
import { TailSpin } from 'react-loading-icons'
import { Box, HStack, VStack, Image, Flex, Button, Heading, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure } from '@chakra-ui/react'
import { addToCart } from '../../utils/cart/cartSlice';
import { fetchProduct, getProduct, getStatus } from '../../utils/products/productsSlice';
import RenderFromData from '../../components/renderfromdata/RenderFromData';
import ProductCarousel from '../../components/carousels/productcarousel/ProductCarousel'

const Product = () => {
  // Gets data of one product to display on the product page
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchParams] = useSearchParams();
  const status = useSelector(getStatus);
  const product = useSelector(getProduct);
  const [currentImage, setCurrentImage] = useState(product?.image);

  useEffect(() => {
    dispatch(fetchProduct(searchParams.get('id')));
    setCurrentImage(product?.image);
  }, [product?.id]);

  const getAvailability = (product) => {
    if (product.availability !== "available")
      return (
        <Button colorScheme='red' disabled>Sold Out</Button>
      );
    else if (product.condition === "preorder")
      return (
        <Link to="/preorder">
          <Button colorScheme='mainPurple'>Preorder</Button>
        </Link>
      );
    else
      return (
        <Link to="/cart" onClick={() => dispatch(addToCart(product))}>
          <Button>Add to Cart</Button>
        </Link>
      );
  }

  const getPreviewImages = (product) => {
    return product.additional_images.map((image, index) => (
      <Box key={index} as='button' border='1px' borderColor='mainPurple.200' boxShadow={currentImage === image ? "dark-lg" : null}>
        <Image key={image} alt={product.title} src={image} boxSize='80px' objectFit='cover' onClick={() => setCurrentImage(image)} />
      </Box>
    ));
  }

  const renderProduct = () => {
    switch (product) {
      case null:
        return <Box>Product not found.</Box>;
      case false:
        return <Box>Cannot retrieve product; please try again later.</Box>;
      default:
        return (
          <>
            <Flex>
              <HStack spacing="24px">
                <VStack>
                  <Box key={product.id} as='button' display="flex">
                    <Image key={product.id} alt={product.title} src={currentImage}
                      maxW={{ base: "300px", lg: "500px" }}
                      maxH={{ base: "300px", lg: "500px" }}
                      objectFit='contain'
                      onClick={onOpen} />
                  </Box>
                  <HStack spacing={3}>
                    {getPreviewImages(product)}
                  </HStack>
                </VStack>
                <VStack>
                  <Box><Heading>{product.title}</Heading></Box>
                  <Box>${Number(product.price).toFixed(2)}</Box>
                  <Box>{product.description}</Box>
                  <Box>
                    {getAvailability(product)}
                  </Box>
                </VStack>
              </HStack>
            </Flex>
            <Flex>
              <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent bgColor="transparent" boxShadow="none">
                  <ModalBody>
                    <ProductCarousel currentImage={currentImage} product={product} onClose={onClose} />
                  </ModalBody>
                </ModalContent>
              </Modal>
            </Flex>
          </>
        );
    }
  }

  // Change purchase button based on availability
  if (status === 'pending')
    return <TailSpin stroke="#3B0839" />;
  else return (
    renderProduct()
    /*
    <RenderFromData
      data={product}
      ifNull={<Box>Error: Product not found.</Box>}
      ifFalse={<Box>Error: Cannot fetch product.</Box>}
      ifExists={renderProduct()} />
    */
  )
}

export default Product;
