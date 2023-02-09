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
import { v4 as uuidv4 } from 'uuid';
import { ethers } from 'ethers';
import Bankselect from './Bankselect';
import Banksmodal from './Banksmodal';
import Collectcryptoaddress from './Collectcryptoaddress';
import Accountdetails from './Accountdetails';
import Accountdetailsus from './Accountdetailsus';
import Accountdetailsuk from './Accountdetailsuk';





const options = [
    { value: 'usd', label: 'USD', icon:  currencyUSD},
    { value: 'eur', label: 'EUR', icon:  currencyUSD },
]; 

const optionstwo = [
    { value: 'ethereum', label: 'ETH', icon:  currencyETH},
    { value: 'bitcoin', label: 'BTC', icon:  currencyBTC },
    { value: 'binancecoin', label: 'BNB', icon:  currencyBNB },
]; 



const rate_options = [
    { value: 'mtpelerin', label: 'Mt Pelerin',},
    { value: 'Moonpay', label: 'Moon pay',},
    { value: 'mercuryo', label: 'mercuryo',},
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











export default function Sellform(props) {



    const [selectedCrypto, setSelectedCrypto] = useState(optionstwo[0]);
    const [cryptoAmountBuy, setCryptoAmountBuy] = useState(undefined);
    const [moneyinput, setMoneyInput] = useState(4000);
    const [picked, setPicked] = useState(false);

    //clients country
    const [country, setCountry] = useState(undefined);

    //for forms
    const [formbankselect, setFormbankselect] = useState(false);
    const [formbankdetails, setFormbankdetails] = useState(false);
    const [formsellersaddress, setFormsellersaddress] = useState(false);
    const [formtransfercrypto, setFormtransfercrypto] = useState(false);
    const [formcomplete, setFormcomplete] = useState(false);

    //check details entered
    const [proceednext, setProceednext] = useState(false);

    //btc price
    const [btc, setBTC] = useState(undefined);
    //notification
    const [notify, setNotiy] = useState(undefined);

    //sellers bank account details
    const [bankAccount, setBankAccount] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    //list of banks
    const [banklist, setBankList] = useState(undefined);
    //bank modal
    const [modalbank, setModalBank] = useState(false);

    //us and uk values
    const [routingNumber, setRoutingNumber] = useState(undefined);
    const [swiftCode, setSwiftCode] = useState(undefined);
    const [beneficiaryName, setBeneficiaryName] = useState(undefined);
    const [beneficiaryCountry, setBeneficiaryCountry] = useState(undefined);
    const [beneficiaryAddress, setBeneficiaryAddress] = useState(undefined);
    const [postalCode, setPostalCode] = useState(undefined);
    const [streetNumber, setStreetNumber] = useState(undefined);
    const [StreetName, setStreetName] = useState(undefined);
    const [city, setCity] = useState(undefined);

    //confirm account number
    const [confirmcAccount, setConfirmAccount] = useState(false);


    const [test, setTest] = useState([
        { value: 'mtpelerin', label: 'Mt Pelerin',},
        { value: 'Moonpay', label: 'Moon pay',},
        { value: 'mercuryo', label: 'mercuryo',},
    ])






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

        //create an employer
        //test url  http://localhost:8000/paymentlink
        //main url  https://blok-ramp.herokuapp.com/paymentlink
        
        const getpaymentlink = await fetch(`https://blok-ramp.herokuapp.com/sellcrypto`, 
            {
                method: 'POST',   
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    id: id, 
                    amount: moneyinput, 
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
            }
        );
         const url = await getpaymentlink.json();
         console.log(url);
         //console.log(url.response);
         
         //props.setFrameurl(url.payment_url);
         //props.setCallframe(true);
         window.open(url.payment_url, 'rating', 'width=500,height=600');
        //window.open(url.response.data.link, 'newwindow', 'width=500,height=600');
        
        props.setLoading(true);
        loop(); 
       
    }


    //start polling data

    const loop = async () => {
        let solution = await fetch(`https://blok-ramp.herokuapp.com/checkpaid`);
        const value = await solution.json();
        console.log(value);
      
        if (value.check === true) {
           console.log('this will run')

           console.log("call server to call fluter wave and transfer money");
           props.setLoading(false);
           //then call transfer money
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
       console.log("Recalled");
       setProceednext(false);
       console.log(formbankselect);
        if(!formcomplete && !formbankselect) {
            setFormbankselect(true);
        } else if( !formcomplete && formbankselect) {
            console.log("ionside")
            setFormbankdetails(true);
            setFormcomplete(true);
        } else {
            console.log("hi");
        }
    }
    

 
   //test http://localhost:8000/getbanks
   //live https://blok-ramp.herokuapp.com/getbanks
   const getListOfBanks = async (data) => {
    console.log(data, "country data");
    let response = await fetch(`https://blok-ramp.herokuapp.com/getbanks/${data}`);
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
            
               {!formbankselect ?
                <>
                    <div className="form-group currency-form mb-4">
                    <input type="number" class="input-control" aria-label="Input" onChange={(e) => changeing(e)} defaultValue={cryptoAmountBuy} />
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
                        defaultValue={optionstwo[0]}
                        options={optionstwo}
                        onChange={(choose) => setSelectedCrypto(choose) }
                        components={{ Option: IconOption, IndicatorSeparator:() => null, DropdownIndicator, ValueContainer}}
                    />
                </div>



                <div className="form-group currency-form mb-4">
                    <input type="number" class="input-control"  aria-label="Input" value={moneyinput}  />
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
                </>
                :

                <div className="">
                    { !formbankdetails ? 
                      <Bankselect 
                        setFormbankselect={setFormbankselect}
                        setProceednext={setProceednext}
                        />
                      :

                      <>
                     
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
                        setConfirmAccount={setConfirmAccount}
                        setNotiy={setNotiy}
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
                        setBeneficiaryCountry={setBeneficiaryCountry}
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
                        setBeneficiaryCountry={setBeneficiaryCountry}
                        setPostalCode={setPostalCode}
                        setStreetNumber={setStreetNumber}
                        setStreetName={setStreetName}
                        setCity={setCity}
                        />


                        :

                        <div className="">Ip not supported</div>

                      }

                    </>

                    }
                </div>

               }
               


              {picked &&
              
                <div className="form-group currency-form mb-4 d-flex flex-column" style={{fontSize: '13px'}}>
                    <div className="">summary</div>
                    <div className="">You get ${moneyinput} for {cryptoAmountBuy} {selectedCrypto.label} </div>
                </div>
            
              }
               

               { formcomplete ? 
                  <div className="form-group">
                    <button  className={ !confirmcAccount ? "btn btn-primary w-100 rounded-pill shadow buttongrey second": "btn btn-primary w-100 rounded-pill shadow"} onClick={ (e) => sell(e)} >Complete</button>
                  </div>
                 :
                <div className="form-group">
                  <div  className={ !formbankselect ? "btn btn-primary w-100 rounded-pill shadow" : !proceednext && formbankselect ? "btn btn-primary w-100 rounded-pill shadow buttongrey second": "btn btn-primary w-100 rounded-pill shadow"} onClick={ () => openextform()} > {formbankselect ? "Proceed" : <>Sell {selectedCrypto.label}</> }  </div>
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