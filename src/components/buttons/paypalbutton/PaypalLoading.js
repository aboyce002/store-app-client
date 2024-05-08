import { TailSpin } from 'react-loading-icons';
import { usePayPalScriptReducer } from "@paypal/react-paypal-js";

const PaypalLoading = () => {
  const [{ isPending }] = usePayPalScriptReducer();
  if (isPending)
    return <TailSpin stroke="#3B0839" />;
  else return null;
}

export default PaypalLoading;
