import React, { useState, useEffect }  from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import appStore from './assets/app-store.svg';
import playStore from './assets/play-store.svg';
import Xicon from './assets/logo.png';
import MasterCard from './assets/mastercard.svg';
import VisaCard from './assets/visacard.svg';
// import ApplePay from './assets/applepay.svg';
import Discovery from './assets/discovery.svg';
import Express from './assets/express.svg';
import { motion } from 'framer-motion';
import { Tab, Tabs } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { ethers } from 'ethers';
import Bankselect from './Bankselect';
import Banksmodal from './Banksmodal';
import Collectcryptoaddress from './Collectcryptoaddress';
import Accountdetails from './Accountdetails';
import Accountdetailsus from './Accountdetailsus';
import Accountdetailsuk from './Accountdetailsuk';
import SellHome from './SellHome';
import Sendcrypto from './Sendcrypto';
import currencyETH from './assets/ethereum.svg';
import currencyBNB from './assets/binance.svg';
import currencyUSDT from './assets/tether.svg';
import currencyMatic from './assets/polygon.svg';
import currencyDoge from './assets/dogecoin.svg';
import currencyATOM from './assets/cosmos.svg';
import currencyOKB from './assets/okb.svg';



const optionstwo = [
    {
        value: 'ethereum',
        label: 'ETH',
        icon: currencyETH,
        address: '0x0000000000000000000000000000000000001010',
        chain: 5
     },
     {
       value: 'binancecoin',
       label: 'BNB',
       icon: currencyBNB,
       address: "0x0000000000000000000000000000000000001010",
       chain: 56
     },
     {
       value: 'matic-network',
       label: 'MATIC',
       icon: currencyMatic,
       address: "0x0000000000000000000000000000000000001010",
       chain: 137
     },
     {
       value: 'usdt',
       label: 'USDT',
       icon: currencyUSDT,
       address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
       chain: 1
     },
     {
       value: 'dogecoin',
       label: 'Doge',
       icon: currencyDoge,
       address: "0xba2ae424d960c26247dd6c32edc70b295c744c43",
       chain: 56
     },
     {
       value: 'cosmos',
       label: 'ATOM',
       icon: currencyATOM,
       address: "0x0eb3a705fc54725037cc9e008bdede697f62f335",
       chain: 56
     },
     {
       value: 'okb',
       label: 'OKB',
       icon: currencyOKB,
       address: "0x75231f58b43240c9718dd58b4967c5114342a86c",
       chain: 1
     },
     {
        value: 'okb',
        label: 'test',
        icon: "./asset/test",
        address: "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee",
        chain: 97
      }
];



export default function Sellform(props) {



    const [selectedCrypto, setSelectedCrypto] = useState(optionstwo[0]);
    const [cryptoAmountBuy, setCryptoAmountBuy] = useState();
    const [moneyinput, setMoneyInput] = useState(4000);
    const [picked, setPicked] = useState(false);

    //clients country
    const [country, setCountry] = useState();

    //for forms
    const [formbankdetails, setFormbankdetails] = useState(false);
    const [formsellersaddress, setFormsellersaddress] = useState(false);
    const [formtransfercrypto, setFormtransfercrypto] = useState(false);
    const [formcomplete, setFormcomplete] = useState(false);

    //check details entered
    const [proceednext, setProceednext] = useState(false);

    //btc price
    const [btc, setBTC] = useState();
    //notification
    const [notify, setNotiy] = useState();

    //sellers bank account details
    const [bankAccount, setBankAccount] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    //list of banks
    const [banklist, setBankList] = useState();
    //bank modal
    const [modalbank, setModalBank] = useState(false);

    //us and uk values
    const [routingNumber, setRoutingNumber] = useState();
    const [swiftCode, setSwiftCode] = useState();
    const [beneficiaryName, setBeneficiaryName] = useState();
    const [beneficiaryCountry, setBeneficiaryCountry] = useState();
    const [beneficiaryAddress, setBeneficiaryAddress] = useState();
    const [postalCode, setPostalCode] = useState();
    const [streetNumber, setStreetNumber] = useState();
    const [StreetName, setStreetName] = useState();
    const [city, setCity] = useState();

    //confirms account number
    const [confirmcTx, setConfirmTx] = useState(false);
    const [confirmBank, setConfirmBank] = useState(false);
    const [formbankselect, setFormbankselect] = useState(false);

    //User Address
    const [userAddress, setUserAddress] = useState();

    //track window instance
    const [windowTrack, setWindowTrack] = useState();

   // switching
   const [levels, setLevels] = useState("home"); //"home" is default

  //data recieved
  const [amountRecieved, setAmountRecieved] = useState();


    const sell = async (e) => {
        console.log("called sell")
        //transfer the crypto to us then cal back end to end him money
       e.preventDefault();
       
       const id = uuidv4();
       //const mix = `${id},${selectedCrypto.value},${address},${cryptoAmountBuy}`;
       //const value = mix.split(',');
       //console.log(id, "idget");
       //console.log(mix);
       //console.log(value[1]);
       //console.log(value[2]);
       
       //Run checks 
       if(cryptoAmountBuy === "" || bankAccount === undefined || accountNumber === undefined) {
        setNotiy("All fields must be submitted");
        console.log("All fields must be submitted");
        return;
       }

       const sendAmount = (amountRecieved/cryptoAmountBuy) * moneyinput;

       console.log(sendAmount);

        //create an employer
        //test url  http://localhost:8000/paymentlink
        //main url  https://blok-ramp.herokuapp.com/paymentlink
         await fetch(`https://blokramp-api.onrender.com/transfertobank`, 
            {
                method: 'POST',   
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    id: id,
                    crypto: selectedCrypto.value,
                    cAddress: selectedCrypto.address,
                    chain: selectedCrypto.chain,
                    address: userAddress,
                    amount: sendAmount,
                    cryptoAmount: cryptoAmountBuy,
                    token: selectedCrypto.label,
                    country: country.currency,
                    accountbank: bankAccount,
                    accountnumber: accountNumber,
                    beneficiaryname: beneficiaryName,
                    BeneficiaryAddress: beneficiaryAddress,
                    BeneficiaryCountry: beneficiaryCountry,
                    swiftcode: swiftCode,
                    routingnumber: routingNumber,
                    PostalCode: postalCode,
                    streetnumber: streetNumber,
                    StreetName: StreetName,
                    city: city
                  })
            });

         try {
            props.setLoading(true);
            loop(); 
         } catch(err) {
            props.setLoading(false);
         }

        //window.open(url.response.data.link, 'newwindow', 'width=500,height=600');
    
       
    }


    //start polling data

    const loop = async () => {
        let solution = await fetch(`https://blokramp-api.onrender.com/checkpaid`);
        const value = await solution.json();
        console.log(value);
      
        if (value.check === true) {
           console.log('this will run')
           props.setLoading(false);
          return;

        } else {
          console.log('this will then run')
          
          return loop()
        }
      }


/*
    const openInNewTab = url => {
        window.open(url, 'newwindow', 'width=500,height=600');
      };
*/

    const openformtwosell = () => {
        setFormTwosell(true);
    }
      

    const getcryptoprice = async () => {
        let response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${selectedCrypto.value}&vs_currencies=usd`);
        let price = await response.json();
        let firstval = Object.values(price)[0];

        const converted = (moneyinput/firstval.usd) * 1;
        setCryptoAmountBuy((converted).toFixed(3));
    }

    const getbtcprice = async () => {
        let response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`);
        let price = await response.json();
        let firstval = Object.values(price)[0];

        setBTC(firstval.usd.toLocaleString("en-de"));
    }



    const changeing = async (e) => {
      if(selectedCrypto.value == "usdt") {
        setCryptoAmountBuy(moneyinput);
        return;
      }
        let response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${selectedCrypto.value}&vs_currencies=usd`);
        let price = await response.json();
        let firstval = Object.values(price)[0];
        console.log(firstval);
 
        const converted = (e.target.value/1) * firstval.usd;
        setPicked(true);
        setMoneyInput(converted);
        setCryptoAmountBuy(e.target.value);
        
    }



    const openextform = () => {

        switch (levels) {
            case "home":
               return <SellHome
               setSelectedCrypto={setSelectedCrypto}
               cryptoAmountBuy={cryptoAmountBuy}
               changeing={changeing}
               moneyinput={moneyinput}
               optionstwo={optionstwo}
                /> ;
            case "bankselect":
                return <Bankselect 
                setFormbankselect={setFormbankselect}
                setLevels={setLevels}
                setProceednext={setProceednext}
                />;
            case "accountdetails":
                return <>
                 
                { country.country == 'NG' || country.country == 'GH' || country.country == 'KE' || country.country == 'UG' || country.country == 'ZA' || country.country == 'TZ' ?

                  <Accountdetails
                  setBankAccount={setBankAccount}
                  bankAccount={bankAccount}
                  setAccountNumber={setAccountNumber}
                  accountNumber={accountNumber}
                  formbankdetails={formbankdetails}
                  setProceednext={setProceednext}
                  setFormbankdetails={setFormbankdetails}
                  banklist={banklist}
                  setConfirmBank={setConfirmBank}
                  setNotiy={setNotiy}
                  setUserAddress={setUserAddress}
                  selectedCrypto={selectedCrypto}
                  setLevels={setLevels}
                  />

                  : country.currency == "USD" ?

                  <Accountdetailsus
                  setBankAccount={setBankAccount}
                  bankAccount={bankAccount}
                  setAccountNumber={setAccountNumber}
                  accountNumber={accountNumber}
                  setProceednext={setProceednext}
                  setFormbankdetails={setFormbankdetails}
                  setRoutingNumber={setRoutingNumber}
                  setSwiftCode={setSwiftCode}
                  setBeneficiaryName={setBeneficiaryName}
                  setBeneficiaryAddress={setBeneficiaryAddress}                        
                  setBeneficiaryCountry={setBeneficiaryCountry}
                  setUserAddress={setUserAddress}
                  selectedCrypto={selectedCrypto}
                  setLevels={setLevels}
                  />

                  : country.currency == "EUR" || country.currency == "GBP" ?


                  <Accountdetailsuk
                  setBankAccount={setBankAccount}
                  bankAccount={bankAccount}
                  setAccountNumber={setAccountNumber}
                  accountNumber={accountNumber}
                  setProceednext={setProceednext}
                  setFormbankdetails={setFormbankdetails}
                  setRoutingNumber={setRoutingNumber}
                  setSwiftCode={setSwiftCode}
                  setBeneficiaryName={setBeneficiaryName}
                  setBeneficiaryAddress={setBeneficiaryAddress}
                  setBeneficiaryCountry={setBeneficiaryCountry}
                  setPostalCode={setPostalCode}
                  setStreetNumber={setStreetNumber}
                  setStreetName={setStreetName}
                  setCity={setCity}
                  setUserAddress={setUserAddress}
                  selectedCrypto={selectedCrypto}
                  setLevels={setLevels}
                  />


                  :

                  <div className="">Ip not supported</div>

                }

              </>;
              case "sendcrypto":
                return <Sendcrypto
                userAddress={userAddress}
                setConfirmTx={setConfirmTx}
                selectedCrypto={selectedCrypto}
                setAmountRecieved={setAmountRecieved}
                /> ;
            default:
                break;
        }

    }


    

 
   //test http://localhost:8000/getbanks
   //live https://blok-ramp.herokuapp.com/getbanks
   const getListOfBanks = async (data) => {
    console.log(data, "country data");
    let response = await fetch(`https://blokramp-api.onrender.com/getbanks/${data}`);
    let banks = await response.json();
    //console.log(banks);
    setBankList(banks.data);
   }


   const getClientip = async () => {
    let response = await fetch(`https://ipapi.co/json/`);
    let country = await response.json();
    console.log(country);
    setCountry(country);

    if(country.country == 'NG' || country.country == 'GH' || country.country == 'KE' || country.country == 'UG' || country.country == 'ZA' || country.country == 'TZ' ) {
      getListOfBanks(country.country);
    }

   }

    



    useEffect(() => {
        if(!picked) {
            getcryptoprice();
        }

        getbtcprice();
        getClientip();

    }, [])



    return (
        <div className="heroform card-body p-4 p-lg-5">
           <form className='mb-5' >
               <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
                   <div className='d-flex align-items-center gap-3'>
                       <div><img src={Xicon} alt="X" style={{width: "50px"}} className='heroform__field-icon'/></div>
                       <div>
                           <h6 className='mb-0 heroform__field-title fs-md-sm fw-regular'>Best rate via</h6>
                       </div>
                   </div>
                   <div>
                       <h6 className='mb-1 heroform__field-title fs-md-sm fw-regular'>1 BTC is ≈</h6>
                       <div className='fs-xs fs-md-sm'><span className="text-dark fw-bold">{btc}</span> USD</div>
                   </div>
               </div>
               {notify !== undefined &&
                <div className="text-warning" style={{fontSize: '12px'}}>
                    {notify}
                </div>
               }
            
               {openextform()}
               


              {picked &&
              
                <div className="form-group currency-form mb-4 d-flex flex-column" style={{fontSize: '13px'}}>
                    <div className="">summary</div>
                    <div className="">You get ${moneyinput} for {cryptoAmountBuy} {selectedCrypto.label} </div>
                </div>
            
              }
               

               { levels === "sendcrypto" ? 
                 <div className="form-group">
                    <button  className={ !confirmcTx ? "btn btn-primary w-100 rounded-pill shadow buttongrey second": "btn btn-primary w-100 rounded-pill shadow"} onClick={ (e) => sell(e)} >Complete</button>
                 </div>
                 : levels === "home" ?
                <div className="form-group">
                  <div  className="btn btn-primary w-100 rounded-pill shadow" onClick={ () => setLevels("bankselect")} >  Sell { selectedCrypto.label }  </div>
                </div>
                 :  levels === "bankselect" ?
                <div className="form-group">
                  <div  className={ !formbankselect ? "btn btn-primary w-100 rounded-pill shadow buttongrey second": "btn btn-primary w-100 rounded-pill shadow"} onClick={ () => setLevels("accountdetails")} > Choose Method  </div>
                </div>
                : levels === "accountdetails" &&
                <div className="form-group">
                  <div  className={ !confirmBank ? "btn btn-primary w-100 rounded-pill shadow buttongrey second": "btn btn-primary w-100 rounded-pill shadow"} onClick={ () => setLevels("sendcrypto")} > Proceed  </div>
                </div> 
               }


           </form>
           <div className='text-center'>
               <h6 className="text-dark fs-sm fw-light">We accept</h6>

               <img src={MasterCard} alt="" style={{marginRight: "10px"}} className='img-fluid'/>
              <img src={VisaCard} alt="" style={{marginRight: "10px"}} className='img-fluid'/>
              {/* <img src={ApplePay} alt="" style={{marginRight: "10px"}} className='img-fluid'/> */}
              <img src={Discovery} alt="" style={{marginRight: "10px"}} className='img-fluid'/>
              <img src={Express} alt="" className='img-fluid'/>


           </div>
       </div>
   )
}