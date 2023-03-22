import React from 'react'

export default function CurrencyRow(props) {
    const{
        currencyOptions,
        selectedOption,
        onChangeHandler,
        amount,
        onAmountChangeHandler
    } = props
  return (
    <div>
      <input type ="text" value={amount} onChange={onAmountChangeHandler}></input>
      <select value={selectedOption} onChange={onChangeHandler}>
        {currencyOptions.map(option => ( 
            <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}
