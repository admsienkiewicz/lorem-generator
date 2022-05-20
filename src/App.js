import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import './App.css'
import data from './data'
import { Options } from './Options'

function App() {
  const [generatorType, setGeneratorType] = useState('Paragraphs')
  const [count, setCount] = useState(0)
  const [text, setText] = useState([])
  const [includeTags, setIncludeTags] = useState('yes')
  const [htmlTag, setHtmlTag] = useState('p')

  const adjustTextLength = (textToAdjust) => {
    if (count > data.length) {
      while (textToAdjust.length < count)
        textToAdjust = [...textToAdjust, ...data]
    }
    return textToAdjust.slice(0, count)
  }

  const generateText = (e) => {
    e.preventDefault()
    const joinedData = data.join('')
    let newText = []
    switch (generatorType) {
      case 'Paragraphs':
        newText = [...data]
        newText = adjustTextLength(newText)
        break
      case 'Sentences':
        const splitOnDot = joinedData.split('.')
        newText = [...splitOnDot]
        newText = [adjustTextLength(newText).join('.') + '.']
        break
      case 'Words':
        const splitOnSpace = joinedData.split(' ')
        newText = [...splitOnSpace]
        newText = [
          adjustTextLength(newText)
            .join(' ')
            .replace(/[.,]/g, '')
            .toLowerCase(),
        ]
        break
      default:
        throw new Error('Wrong type')
    }
    console.log(newText)
    console.log(includeTags)
    if (includeTags === 'yes') {
      newText = newText.map(
        (paragraph) => `<${htmlTag}>` + paragraph + `</${htmlTag}>`
      )
    }
    console.log(newText)
    setText(newText)
  }

  return (
    <section className="App">
      <header>
        <h2>Lorem Ipsum Generator</h2>
      </header>
      <Options
        count={count}
        setCount={setCount}
        generatorType={generatorType}
        setGeneratorType={setGeneratorType}
        generateText={generateText}
        includeTags={includeTags}
        setIncludeTags={setIncludeTags}
        htmlTag={htmlTag}
        setHtmlTag={setHtmlTag}
      />
      {text.length > 0 && (
        <CopyToClipboard
          text={text.join('')}
          onCopy={() => console.log('copied')}
        >
          <button>Copy to clipboard with button</button>
        </CopyToClipboard>
      )}
      <div>
        {text.map((paragraph, index) => {
          return <p key={index}>{paragraph}</p>
        })}
      </div>
    </section>
  )
}

export default App
