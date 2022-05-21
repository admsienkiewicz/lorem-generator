import React, { useState } from 'react'
import './CustomSelector.css'

export const CustomSelector = ({ placeholder, options, setState, state }) => {
  const [activeOptions, setActiveOptions] = useState(false)

  return (
    <div className="select-box">
      {activeOptions && (
        <div className="options-container">
          {options.map((option, index) => {
            return (
              <div
                className="option"
                key={index}
                onClick={(e) => {
                  setState(e.target.querySelector('label').textContent)
                  setActiveOptions(false)
                  console.log('clicked')
                }}
              >
                <input
                  className="radio"
                  type="radio"
                  name="type"
                  id={option}
                  value={option}
                />
                <label
                  htmlFor={option}
                  onClick={(e) => {
                    setState(e.target.textContent)
                    setActiveOptions(false)
                  }}
                >
                  {option}
                </label>
              </div>
            )
          })}
        </div>
      )}
      <div
        className="selected"
        onClick={() => setActiveOptions(!activeOptions)}
      >
        {state ? state : <em className="placeholder">{placeholder}</em>}
      </div>
    </div>
  )
}
