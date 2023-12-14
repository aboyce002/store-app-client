import { TailSpin } from 'react-loading-icons'

const RenderFromData = ({ data, ifNull, ifFalse, ifEmpty, ifExists }) => {
  switch (data) {
    case null:
      return ifNull || <TailSpin stroke="#3B0839"/>;
    case false:
      return ifFalse;
    case !data.length:
      return ifEmpty;
    default:
      return ifExists;
  }
}

export default RenderFromData;
