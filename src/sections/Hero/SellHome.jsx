import React from 'react';
import currencyETH from './assets/ethereum.svg';
import currencyBNB from './assets/binance.svg';
import currencyUSDT from './assets/tether.svg';
import currencyMatic from './assets/polygon.svg';
import currencyDoge from './assets/dogecoin.svg';
import currencyATOM from './assets/cosmos.svg';
import currencyOKB from './assets/okb.svg';
import Select, { components } from 'react-select';
import currencyUSD from './assets/currency-usd.svg';
import currencyBTC from './assets/currency-btc.svg';
import arrow from './assets/arrow-down.svg';
import shape1 from './assets/hero-shape-1.svg';
import shape2 from './assets/hero-shape-2.svg';
import shape3 from './assets/arrow-shape.svg';
import shape4 from './assets/hero-user.svg';




const options = [
    { value: 'usd', label: 'USD', icon:  currencyUSD},
    { value: 'eur', label: 'EUR', icon:  currencyUSD },
]; 

const optionstwoa = [
    { value: 'ethereum', label: 'ETH', icon:  currencyETH},
    { value: 'usdt', label: 'USDT', icon:  currencyUSDT },
    { value: 'binancecoin', label: 'BNB', icon:  currencyBNB },
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



export default function SellHome({cryptoAmountBuy, changeing, moneyinput, optionstwo, setSelectedCrypto}) {

  return (
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
  )
}
