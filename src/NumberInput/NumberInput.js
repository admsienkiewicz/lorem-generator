import React from 'react'
import './NumberInput.css'

export const NumberInput = ({ count, setCount }) => {
  return (
    <div className="counter-div">
      <input
        type="number"
        name="count-input"
        id="count-input"
        value={count}
        onChange={(e) => {
          if (count >= 0 && count < 999) setCount(parseInt(e.target.value))
        }}
      />
      <div className="buttons-div">
        <button
          className="add-btn"
          onClick={() => {
            if (count >= 0 && count < 999) setCount((prev) => prev + 1)
          }}
        >
          +
        </button>
        <button
          className="minus-btn"
          onClick={() => {
            if (count > 0 && count <= 999) setCount((prev) => prev - 1)
          }}
        >
          -
        </button>
      </div>
    </div>
  )
}
