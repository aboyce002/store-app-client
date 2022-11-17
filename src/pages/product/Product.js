import { connect } from 'react-redux';
import { Box, VStack } from '@chakra-ui/react'
import * as actions from "../../utils old/actions";
import ProductSelect from '../../components/productSelect/ProductSelect';
import { GlobalContext } from '../../utils old/contexts/GlobalState';

const RenderProduct = (props) => {
  switch (props.product){ 
    case null || undefined:
      return <Box>Loading...</Box>;
    case false:
      return <Box>Error: Cannot fetch products</Box>;
    default:
      return <Box><ProductSelect/></Box>;
  }
}

const Product = () => {
  return (
    <>
      {RenderProduct()}
    </>
  )
}

export default connect(null, actions)(Product);
