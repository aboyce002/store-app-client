import { Button } from '@chakra-ui/react'

const AvailibilityButton = ({ productCondition }) => {
  return <Button colorScheme={productCondition}>{productCondition}</Button>
}

export default AvailibilityButton;
