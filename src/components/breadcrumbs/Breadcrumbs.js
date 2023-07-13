
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@chakra-ui/react'
import { VscChevronRight } from "react-icons/vsc";

const Breadcrumbs = () => {
  const [searchParams] = useSearchParams();
  const currentParams = Object.fromEntries([...searchParams]); // Array of param objects in key:value pairs ie: [id, 1] or [condition, new]
  const currentValue = Object.values(currentParams)[0];
  const [path, setPath] = useState('');
  const [category, setCategory] = useState('');
  const location = useLocation()

  useEffect(() => {
    if (location.pathname !== "/product") {
      setPath(location.pathname + location.search);
      setCategory(currentValue);
    }
  }, [location]);

  const getProductBreadcrumb = () => {
    if (category && path != null)
      return (<BreadcrumbItem>{getBreadcrumbType()}</BreadcrumbItem>)
  }

  const getTitleBreadcrumb = () => {
    if (location.pathname === "/product")
      return (
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to={location.pathname + location.search}>{searchParams.get('title')}</BreadcrumbLink>
        </BreadcrumbItem>
      )
  }

  const getBreadcrumbType = () => {
    return <BreadcrumbLink as={Link} to={path} textTransform="capitalize">{category}</BreadcrumbLink>
  }

  if (location.pathname === "/search" || location.search !== '') {
    return (
      <Box spacing="35px" py={1} px={20} color='#3B0839' bgColor="white" boxShadow='sm' zIndex='1'>
        <Breadcrumb spacing='8px' separator={<VscChevronRight color='#3B0839' />}>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to='/'>Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to='/search'>Search</BreadcrumbLink>
          </BreadcrumbItem>

          {getProductBreadcrumb()}

          {getTitleBreadcrumb()}

        </Breadcrumb>
      </Box>
    )
  }
}

export default Breadcrumbs;
