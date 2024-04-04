import { IconButton, Tooltip } from '@chakra-ui/react';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const ShowPasswordToggleButton = ({ show, setShow }) => {
  const handleClick = () => setShow(!show);
  return (
    <Tooltip label={show ? "Hide password" : "Show password"}>
      <IconButton size='sm' variant='ghost' color="secondary.inputHelper" icon={show ? <IoMdEye /> : <IoMdEyeOff />} onClick={handleClick} />
    </Tooltip>
  )
}

export default ShowPasswordToggleButton;