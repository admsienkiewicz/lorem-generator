import { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import './App.css'
import data from './data'
import { Options } from './Options'
import { FaCopy } from 'react-icons/fa'

function App() {
  const [generatorType, setGeneratorType] = useState('')
  const [count, setCount] = useState(0)
  const [text, setText] = useState([])
  const [includeTags, setIncludeTags] = useState('no')
  const [htmlTag, setHtmlTag] = useState('None')

  const adjustTextLength = (textToAdjust) => {
    if (count > data.length) {
      while (textToAdjust.length < count)
        textToAdjust = [...textToAdjust, ...data]
    }
    return textToAdjust.slice(0, count)
  }

  const generateText = (e) => {
    e.preventDefault()
    if (count === 0) return
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
        return
    }
    if (includeTags === 'yes') {
      newText = newText.map(
        (paragraph) => `<${htmlTag}>` + paragraph + `</${htmlTag}>`
      )
    }
    setText(newText)
  }

  useEffect(() => {
    if (htmlTag !== 'None') {
      setIncludeTags('yes')
    } else {
      setIncludeTags('no')
    }
  }, [htmlTag])

  return (
    <section className="App">
      <header>
        <h2 id="title">Lorem Ipsum Generator</h2>
      </header>
      <div className="options">
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
            <button>
              Copy <FaCopy />
            </button>
          </CopyToClipboard>
        )}
      </div>
      <div className="output-container">
        {text.map((paragraph, index) => {
          return <p key={index}>{paragraph}</p>
        })}
      </div>
    </section>
  )
}

export default App
