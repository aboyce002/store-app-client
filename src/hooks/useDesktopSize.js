import { useBreakpointValue } from '@chakra-ui/react';

const useDesktopSize = () => {
  const isDesktopSize = useBreakpointValue({ base: false, lg: true });
  return isDesktopSize;
}

export default useDesktopSize;
