import React, {useState, useEffect} from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { ethers } from 'ethers';


  export default function Accountdetails(props) {


  const [validAccount, setvalidAccount] = useState(0);



  const goback = () => {
    props.setFormbankdetails(false);
    props.setLevels("bankselect");
    //props.setChooseMethod(false);
    //navigate(`/`);
  }  


  const confirmAccount = async (e) => {
    //main https://blok-ramp.herokuapp.com/confirmaccount 
    //test http://localhost:8000/confirmaccount
    //console.log(e.target.value.length);
    
   if(e.target.value.length === 10) {

        const getpaymentlink = await fetch(`https://blokramp-api.onrender.com/confirmaccount`, 
        {
            method: 'POST',   
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bank: props.bankAccount, accnumber: e.target.value})
        }
        );
        const url = await getpaymentlink.json();
        console.log(url);

        if(url.status === 'success') {
          props.setAccountNumber(e.target.value);
          setvalidAccount(1);
        } else{
          console.log("this guy called");
          props.setNotiy("This account number is invalid");
          setvalidAccount(2);
        }

   }
    
   }


   const confirmAddress = (e) => {
    const check = ethers.utils.isAddress(e.target.value);
    if(check === true) {
      props.setConfirmBank(true);
      props.setUserAddress(e.target.value);
    }
   }


   useEffect(() => {
    console.log(props.bankAccount);

    setTimeout(() => {
      setvalidAccount(false);
    }, 2000);
  }, [props.bankAccount, validAccount])


  return (
    <div>
        <div className="" style={{ padding: '5px', cursor: 'pointer' }}>
          <BiArrowBack onClick={goback} />
      </div>

       <div className="form-group currency-form mb-4">
       <label style={{height: '68px', width: '100%'}} >
       <select
          onChange={(e) => props.setBankAccount(e.target.value)}
          style={{width: '100%', height: '30px', border: 'none', fontSize: '17px', color: 'rgb(133,133,133'}}
          >
         {
          props?.banklist.map((data, index) => (
            <option value={data.code}  key={index} >{data.name}</option>
          ))
         }
       </select>
     </label>
    </div>
        
        <div className="form-group currency-form mb-4" style={{  }}>
            <input 
                type="number" 
                className="input-control" 
                placeholder="account number"
                aria-label="Input" 
                name='customerAddress' 
                defaultValue={props.accountNumber}
                style={{ 
                    fontSize: '17px', 
                    borderBottom: `${ validAccount == 2  ? "1px solid #ffcccb": validAccount == 1 && "1px solid #00ff00" }`, 
                    color: `${ validAccount == 2 ? "#B33A3A" : validAccount == 1 && "#00ff00"}`
                  }}
                onChange={(e) => confirmAccount(e)}/>
        </div>


        <div className="form-group currency-form mb-4">
            <input 
                type="text" 
                class="input-control" 
                placeholder={`${props.selectedCrypto.label} address`}
                aria-label="Input" 
                name='customerAddress'
                style={{fontSize: '17px'}}
                onChange={(e) => confirmAddress(e)}/>
        </div>


    </div>
  )
}
