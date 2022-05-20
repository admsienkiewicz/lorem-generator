import React from 'react'

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
    <form onSubmit={(e) => generateText(e)}>
      <input
        type="number"
        name="number"
        id="number"
        value={count}
        onChange={(e) => {
          if (e.target.value >= 0) setCount(e.target.value)
        }}
      />
      <select
        id="generator-type"
        defaultValue={generatorType}
        onChange={(e) => setGeneratorType(e.target.value)}
      >
        <option value="Paragraphs">Paragraphs</option>
        <option value="Sentences">Sentences</option>
        <option value="Words">Words</option>
      </select>
      <select
        defaultValue={includeTags}
        onChange={(e) => setIncludeTags(e.target.value)}
      >
        <option value={'yes'}>yes</option>
        <option value={'no'}>no</option>
      </select>
      {includeTags === 'yes' && (
        <select
          defaultValue={htmlTag}
          onChange={(e) => setHtmlTag(e.target.value)}
        >
          <option value={'p'}>p</option>
          <option value={'h1'}>h1</option>
          <option value={'h2'}>h2</option>
          <option value={'h3'}>h3</option>
          <option value={'h4'}>h4</option>
        </select>
      )}
      <button type="submit">Generate</button>
    </form>
  )
}
