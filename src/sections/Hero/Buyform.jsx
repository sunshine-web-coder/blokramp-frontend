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
import Select, { components } from 'react-select';
import currencyUSD from './assets/currency-usd.svg';
import currencyBTC from './assets/currency-btc.svg';
import arrow from './assets/arrow-down.svg';
import shape1 from './assets/hero-shape-1.svg';
import shape2 from './assets/hero-shape-2.svg';
import shape3 from './assets/arrow-shape.svg';
import shape4 from './assets/hero-user.svg';
import currencyETH from './assets/ethereum.svg';
import currencyBNB from './assets/binance.svg';
import currencyUSDT from './assets/tether.svg';
import currencyMatic from './assets/polygon.svg';
import currencyDoge from './assets/dogecoin.svg';
import currencyATOM from './assets/cosmos.svg';
import currencyOKB from './assets/okb.svg';
import { v4 as uuidv4 } from 'uuid';
import { ethers } from 'ethers';
import Buyemailandaddress from './Buyemailandaddress';
import bitcoinaddress from 'bitcoin-address';
import { validate, getAddressInfo } from 'bitcoin-address-validation';




const options = [
    { value: 'usd', label: 'USD', icon:  currencyUSD},
    { value: 'btc', label: 'BTC', icon:  currencyBTC },
    { value: 'eur', label: 'EUR', icon:  currencyUSD },
]; 

const optionstwoa = [
    { value: 'ethereum', label: 'ETH', icon:  currencyETH},
    { value: 'usdt', label: 'USDT', icon:  currencyUSDT },
    { value: 'binancecoin', label: 'BNB', icon:  currencyBNB },
];

const optionstwo = [
    {
        value: 'ethereum',
        label: 'ETH',
        icon: currencyETH,
        address: '0x0000000000000000000000000000000000001010',
        chain: 1
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
      },
      {
        value: 'okb',
        label: 'test',
        icon: "./asset/test",
        address: "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee",
        chain: 97
      }
];





const svgVariants = {
    hidden: {
         rotate: -180
    },
    visible: {
        rotate: 0,
        transition: {
            duration: 1
        }
    }
}


const IconOption = props => (
    <components.Option {...props}>
        <span className="me-2"><img src={props.data.icon} alt={props.data.label}/></span>
        <span>{props.data.label}</span> 
    </components.Option>
);



const ValueContainer = ({children, ...props}) => {
    if (!props.hasValue) {
      return <components.ValueContainer {...props}>{children}</components.ValueContainer>;
    }
  
    const value = props.getValue()[0];
    //console.log("CAHNGE", value);

    return (
      <components.ValueContainer {...props}>
        <div className="d-flex gap-2">
            <span><img src={value.icon} alt={value.label}/></span>
            <span>{value.label}</span>
        </div>
      </components.ValueContainer>
    );
  };




const DropdownIndicator = props => {
    return (
      <components.DropdownIndicator {...props}>
        <img src={arrow} />
      </components.DropdownIndicator>
    );
};











export default function Buyform(props) {


    const [buyerEmail, setBuyerEmail] = useState();
    const [selectedCrypto, setSelectedCrypto] = useState(optionstwo[0]);
    const [cryptoAmountBuy, setCryptoAmountBuy] = useState();
    const [moneyinput, setMoneyInput] = useState(4000);
    const [picked, setPicked] = useState(false);
    const [email, setEmail] = useState();
    const [address, setAddress] = useState('');
    //for form two
    const [formtwo, setFormTwo] = useState(false);
    //check correct address
    const [proceed, setProceed] = useState(false);
    //btc price
    const [btc, setBTC] = useState();
    //notification
    const [notify, setNotiy] = useState();
    //track window instance
    const [windowTrack, setWindowTrack] = useState();
 
 



    const [test, setTest] = useState([
        { value: 'mtpelerin', label: 'Mt Pelerin',},
        { value: 'Moonpay', label: 'Moon pay',},
        { value: 'mercuryo', label: 'mercuryo',},
    ])



    const buy = () => {
        console.log("Buying");
        props.setSelected(true);
    }


    const initiate = async (e) => {
       e.preventDefault();
       const id = uuidv4();
       const mix = `${id},${selectedCrypto.value},${address},${cryptoAmountBuy},${selectedCrypto.address},${selectedCrypto.chain}`;
       props.setCofirmation(mix);
       
       //Run checks 
       if(moneyinput === "" || email === "" || address === "") {
        setNotiy("All fields must be submitted");
        console.log("All fields must be submitted");
        return;
       }

        //create an employer
        //test url  http://localhost:8000/paymentlink
        //main url  zzz/paymentlink
        const getpaymentlink = await fetch(`https://blokramp-api.onrender.com/paymentlink`, 
            {
                method: 'POST',   
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tx: mix, amount: moneyinput,  email: email})
            }
        );
         const url = await getpaymentlink.json();

         console.log(url.response);

        //window.open(url.data.link, 'newwindow', 'width=500,height=600');
        try {
            const openWindow = window.open(url.response.data.link, 'newwindow', 'width=500,height=600');
            setWindowTrack(openWindow);
    
            if(url.response.status == "success") {
                props.setLoading(true);
                loop();
            }
        } catch(err) {
            props.setLoading(false);            
        }


       
    }


    //start polling data

    
    const loop = async () => {
        let solution = await fetch(`https://blokramp-api.onrender.com/check`);
        const value = await solution.json();
        console.log(value);
      
        if (value.check === true) {
          console.log('this will run')

            props.setLoadSuccess(true);
            props.setLoading(false);
            windowTrack.close();
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

    const openformtwo = () => {
        setFormTwo(true);
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

        setBTC(firstval.usd.toLocaleString());
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
 
        const converted = (e.target.value/firstval.usd) * 1;
        setPicked(true);
        setMoneyInput(e.target.value);
        setCryptoAmountBuy(converted);
        
       //console.log( "testing", selectedCrypto);
    }

    //check for correct address
    const checkaddress = async (e) => {
     if(selectedCrypto.value !== 'bitcoin') {
      const check = ethers.utils.isAddress(e.target.value);
      console.log("checking", check);
      if(check === true) {
        setAddress(e.target.value);
        setProceed(true);
      }

     } else {
        
        console.log("In testing");
        //const check = bitcoinaddress.validate(e.target.value);
        const check = validate(e.target.value);
        console.log(check, "Tester check");
        if(check === true) {
            setAddress(e.target.value);
            setProceed(true);  
          } 
     }


    }

    



    useEffect(() => {
        if(!picked) {
            getcryptoprice();
        }

        getbtcprice();
    })



    return (
        <div className="heroform card-body p-4 p-lg-5">
           <form className='mb-5' onSubmit={initiate}>
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
               {notify &&
                <div className="text-warning" style={{fontSize: '12px'}}>
                    {notify}
                </div>
               }
            
            { !formtwo ?
               <>
                 <div className="form-group currency-form mb-4">
                    <input type="number" class="input-control"  aria-label="Input" onChange={(e) => changeing(e)} defaultValue={moneyinput} />
                    <span className="vr mx-3 my-1"></span>
                    <Select
                        styles={{
                            control: (provided, state) => ({
                                ...provided,
                                border: 0,
                                outline: 0,
                                boxShadow: 'none',
                                padding: 0,
                                fontSize: 'var(--heroform__field-big-fs, 18px)',
                                fontWeight: 400,
                                color: '#081537',
                                width: 100,
                                }),
                            valueContainer: (provided, state) => ({
                                ...provided,
                                padding: 0,
                            }),
                            option: (provided, state) => ({
                                ...provided,
                                fontSize: '15px',
                            }),
                        }}
                        defaultValue={options[0]}
                        options={options}
                        components={{ Option: IconOption, IndicatorSeparator:() => null, DropdownIndicator, ValueContainer}}
                    />
                </div>
                
                <div className="form-group currency-form mb-4">
                    <input type="number" class="input-control" aria-label="Input" value={cryptoAmountBuy} />
                    <span className="vr mx-3 my-1"></span>
                    <Select
                        styles={{
                            control: (provided, state) => ({
                                ...provided,
                                border: 0,
                                outline: 0,
                                boxShadow: 'none',
                                padding: 0,
                                fontSize: 'var(--heroform__field-big-fs, 14px)',
                                fontWeight: 400,
                                color: '#081537',
                                width: 100,
                                }),
                            valueContainer: (provided, state) => ({
                                ...provided,
                                padding: 0,
                            }),
                            option: (provided, state) => ({
                                ...provided,
                                fontSize: '15px',
                            }),
                        }}
                        defaultValue={optionstwo[0]}
                        options={optionstwo}
                        onChange={(choose) => setSelectedCrypto(choose) }
                        components={{ Option: IconOption, IndicatorSeparator:() => null, DropdownIndicator, ValueContainer}}
                    />
                </div>
               </>
              :
              <Buyemailandaddress
                setEmail={setEmail}
                email={email}
                selectedCrypto={selectedCrypto}
                checkaddress={checkaddress}
                address={address}
                setFormTwo={setFormTwo}
              />
             }
               


              {picked &&
              
                <div className="form-group currency-form mb-4 d-flex flex-column" style={{fontSize: '13px'}}>
                    <div className="">summary</div>
                    <div className="">You get {cryptoAmountBuy} {selectedCrypto.label} for ${moneyinput} </div>
                </div>
            
              }
               
               {formtwo ? 
               
               <div className="form-group">
                  <button type='submit' className={!proceed ? "btn btn-primary w-100 rounded-pill shadow buttongrey": "btn btn-primary w-100 rounded-pill shadow" }  >Proceed</button>
               </div>

               : 

               <div className="form-group">
                   <div className="btn btn-primary w-100 rounded-pill shadow" onClick={openformtwo} >Buy {selectedCrypto.label}</div>
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