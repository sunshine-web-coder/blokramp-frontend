import React, {useState, useEffect, useRef} from 'react';
import EthereumQRPlugin from 'ethereum-qr-code';
import QRCode from "react-qr-code";


export default function Sendcrypto({setConfirmTx, selectedCrypto, userAddress, setAmountRecieved}) {

    const [notifyUser, setNofifyUser] = useState(false);
    const [notifyMsg, setNotifyMsg] = useState("");
    const [copy, setCopy] = useState('Copy');
    const [validate, setValidate] = useState(0);

    const textToCopy = "0xef15cB58639c116d66C283a1bF63415F2e3015Ae";

    function isValidHash(b) {
        if(b.length != 64) return false;
    
        for (let i=0; i<64; i++) {
            if (b[i] < "0") return false;
            if (b[i] > "9" && b[i] <"a") return false;
            if (b[i] > "f") return false;
        }
    
        return true;
     }

   const getHash = async (e) => {
     //check if hash is correct
     /*
     const check = isValidHash(e.target.value);
     if(!check){
        //notify
        setNofifyUser(true);
        setNotifyMsg("Input not a tx hash");
     }
     */

     //send hash to backend
     let response = await fetch(`https://blokramp-api.onrender.com/tx/${e.target.value}/${selectedCrypto.chain}/${userAddress}`);
     let value = await response.json();
     if(value.data) {
        setConfirmTx(value.data);
        setAmountRecieved(value.amount);
        setValidate(1);
     } else {
        setValidate(2);
     }

   }

   const copyToClipboard = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopy("copied");
};

    useEffect(() => {
        if(notifyUser) {
            setTimeout(() => {
                setNofifyUser(true);
                setNotifyMsg("Input not a tx hash");
            }, 3000);
        }

        setTimeout(() => {
            setCopy("copy");
          }, 2000);
    }, [notifyUser, copy])
    

  return (
    <div className='d-flex flex-column justify-content-center align-items-center w-100'>
        <small style={{fontWeight: 'bold', fontSize: '15px', color: '#1554EF', width: '390px'}}>Make your transfer and Send us the transaction hash</small>
        <div className="" style={{padding: '10px'}} >
           <QRCode
               size={200}
               style={{ height: "auto", maxWidth: "100%", width: "100%" }}
               value={"0xef15cB58639c116d66C283a1bF63415F2e3015Ae"}
               viewBox={`0 0 256 256`}
           />
        </div>
        <div className="" style={{fontWeight: 'light', fontSize: '15px', marginTop: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px'}}>
            <div className="" style={{overflow: 'hidden', textOverflow: 'ellipsis', width: '200px', whiteSpace: 'nowrap'}}> 0xef15cB58639c116d66C283a1bF63415F2e3015Ae </div>
            <div className="" style={{ background: '#1554EF', color: '#fff', padding: '5px', borderRadius: '5px'}} onClick = {copyToClipboard} > {copy} </div>
        </div>

        <div className="form-group currency-form mb-4 w-100 mt-3 d-flex justify-content-center align-items-center gap-5">
            <input 
                type="text" 
                className="input-control" 
                placeholder="Input transaction tx"
                aria-label="Input" 
                name='customerTx' 
                style={{ 
                    fontSize: '17px', 
                    borderBottom: `${ validate == 2  ? "1px solid #ffcccb": validate == 1 && "1px solid #00ff00" }`, 
                    color: `${ validate == 2 ? "#B33A3A" : validate == 1 && "#00ff00"}`
                  }}
                onChange={(e) => getHash(e)}
                />
                 
        </div>

        {
            notifyUser &&
            <small style={{fontWeight: 'bold', fontSize: '15px', color: '#1554EF', width: '390px'}} >{notifyMsg}</small>
        }

        
    </div>
  )
}
