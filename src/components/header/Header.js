import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PayStripe from '../PayStripe';
import SearchBar from '../searchbar/SearchBar';
import { Box, Flex, HStack, Spacer } from '@chakra-ui/react'
import { FiShoppingCart } from 'react-icons/fi';
import { fetchProducts, getProducts } from '../../utils/products/productsSlice';
import { getUser, getCredits } from '../../utils/user/userSlice';

const Header = () => {
  // const { productList, fetchProductsByParams } = useContext(GlobalContext);
  const productList = useSelector(getProducts);
  const user = useSelector(getUser);
  const credits = useSelector(getCredits);
  const dispatch = useDispatch();

  // Get info for specific product page
  const onSubmit = async (condition, category) => {
    // fetchProductsByParams(condition, category);
    dispatch(fetchProducts());
    console.log("Products: " + productList);
    console.log("User?: " + user);
  }

  const renderContent = () => {
    <Spacer/>
    switch (user){ 
      case null:
        return <Box>Loading...</Box>;
      case false:
        return <Box><a href="/login">Log In</a></Box>;
      default:
        return [
            <Box key="1"><PayStripe/></Box>,
            <Box key="3" style={{ margin: '0 10px'}}>
              Credits: { credits }
            </Box>,
            <Box key="2"><a href="/api/logout">Logout</a></Box>
        ];
    }
  }

  // To-do: When acct is logged in, Show one box w/ name and avatar, one box w/ orders?
  return (
    <Box w="100%" sx={{ position: 'sticky', top: '0', zIndex: '1' }}>
      <HStack className="topHeader" p={2} spacing="24px" color="white" bgColor="#7E1F69">
        <Box>
        <Link to={user ? '/' : '/'} className="left logo"></Link>
          <Link to='/account' className="left">
            My Account
          </Link>
        </Box>
        <Box>
          <Link to='/' className="left logo">
            Home
          </Link>
        </Box>
          <SearchBar/>
        <Spacer/>
        <Box>
          <Link to='/cart'>
            <FiShoppingCart/>
          </Link>
        </Box>
        <HStack>
          {renderContent()}
        </HStack>
      </HStack>

      <HStack className="topHeader" p={2} spacing="24px" color="" bgColor="#FAF1F0">
        <Box>
          <Link to={{ pathname: "/search", search: "?condition=new"}} onClick={() => { onSubmit('new', null) }}>New</Link>
        </Box>
        <Box>
          <Link to={{ pathname: "/search", search: "?category=plushies"}} onClick={() => { onSubmit(null, 'plushies') }}>Plushies</Link>
        </Box>
        <Box>
          <Link to={{ pathname: "/search", search: "?category=charms"}} onClick={() => { onSubmit(null, 'charms') }}>Charms</Link>
        </Box>
        <Box>
          <Link to={{ pathname: "/search", search: "?category=prints"}} onClick={() => { onSubmit(null, 'prints') }}>Prints</Link>
        </Box>
        <Box>
          <Link to={{ pathname: "/search", search: "?category=stickers"}} onClick={() => { onSubmit(null, 'stickers') }}>Stickers</Link>
        </Box>
      </HStack>
    </Box>
  );
}

export default Header;
