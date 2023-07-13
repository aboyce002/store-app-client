import { Text } from '@chakra-ui/react'

const ConditionText = ({ productCondition, text }) => {
  return <Text w={{ base: '100%', md: "80%", xl: '60%' }} color='white' bgColor={productCondition} textTransform="capitalize">{text || productCondition}</Text>
}

export default ConditionText;
