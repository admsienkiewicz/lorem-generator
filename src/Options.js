import React from 'react'
import { CustomSelector } from './CustomSelector/CustomSelector'
import { NumberInput } from './NumberInput/NumberInput'

export const Options = ({
  count,
  setCount,
  generatorType,
  setGeneratorType,
  generateText,
  includeTags,
  setIncludeTags,
  htmlTag,
  setHtmlTag,
}) => {
  return (
    <div className="options-form">
      <NumberInput count={count} setCount={setCount} />
      <CustomSelector
        placeholder="Select type"
        options={['Paragraphs', 'Sentences', 'Words']}
        setState={setGeneratorType}
        state={generatorType}
        className="type-select"
      />
      <span> HTML tag:</span>
      <CustomSelector
        placeholder="Select tag"
        options={['None', 'p', 'h1', 'h2', 'h3', 'h4']}
        setState={setHtmlTag}
        state={htmlTag}
        id="tag-select"
      />
      <button
        className="generate-btn"
        type="submit"
        onClick={(e) => generateText(e)}
      >
        Generate
      </button>
    </div>
  )
}
