import './App.css';
import CurrencyRow from './CurrencyRow';
import React, {useState, useEffect} from 'react';

const BASE_URL = 'http://localhost:5000'

function App() {

  const [currencyOptions, setCurrencyOptions] = useState(([]))
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [amount, setAmount] = useState(1)
  const [isAmountFromCurrency, setIsAmountFromCurrency] = useState(true)
  const [exchangeRates, setExchangeRates] = useState()

  useEffect(() => {
    fetch(`${BASE_URL}/all`)
    .then(res => res.json())
    .then(data => {
      setCurrencyOptions([data.base, ...Object.keys(data.rates)])
      setFromCurrency(data.base)
      setToCurrency((Object.keys(data.rates)[0]))
      setExchangeRates((data.rates[Object.keys(data.rates)[0]]))
    })
  }, [])

  useEffect(() => {
    if(fromCurrency != null && toCurrency != null){
      fetch(`${BASE_URL}/${fromCurrency}/${toCurrency}`)
      .then(res => res.json())
      .then(data => {
        setExchangeRates(data.rates)
      }) 
    }
  }, [fromCurrency, toCurrency])

  let fromAmount, toAmount 

  if(isAmountFromCurrency){
    fromAmount = amount
    toAmount = fromAmount * exchangeRates
  }
  else
  {
    toAmount = amount
    fromAmount = toAmount / exchangeRates    
  }

  function OnFromAmountChangeHandler(e){
    setAmount(e.target.value)
    setIsAmountFromCurrency(true)
  }

  function OnToAmountChangeHandler(e){
    setAmount(e.target.value)
    setIsAmountFromCurrency(false)
  }

  return (
    <>
      <h1>Currency Converter</h1>
      <CurrencyRow currencyOptions = {currencyOptions} selectedOption = {fromCurrency} onChangeHandler = {e => setFromCurrency(e.target.value)} amount = {fromAmount} onAmountChangeHandler = {OnFromAmountChangeHandler}/>
      <div className="equalsTo">=</div>
      <CurrencyRow currencyOptions = {currencyOptions} selectedOption = {toCurrency} onChangeHandler = {e => setToCurrency(e.target.value)} amount = {toAmount} onAmountChangeHandler = {OnToAmountChangeHandler}/>
    </>
  );
}

export default App;
