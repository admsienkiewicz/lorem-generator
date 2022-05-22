import { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import './App.css'
import data from './data'
import { Options } from './Options/Options'
import { FaCopy } from 'react-icons/fa'
import { AiFillGithub } from 'react-icons/ai'
import { AiFillLinkedin } from 'react-icons/ai'

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
    // if (count === 0) return
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
    <>
      <header>
        <h1>Lorem Ipsum Generator</h1>
        <div className="underline"></div>
      </header>
      <section className="App">
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
            <div className="copy-div">
              <CopyToClipboard
                text={text.join('')}
                onCopy={() => console.log('copied')}
              >
                <button className="copy-btn">
                  Copy <FaCopy />
                </button>
              </CopyToClipboard>
            </div>
          )}
        </div>
        <div className="output-container">
          {text.map((paragraph, index) => {
            return <p key={index}>{paragraph}</p>
          })}
        </div>
      </section>
      <footer className="footer">
        Adam Sienkiewicz @2022
        <a href="https://github.com/admsienkiewicz">
          <AiFillGithub className="footer-icon" />
        </a>
        <a href="https://www.linkedin.com/in/adam-sienkiewicz-0429a2214/">
          <AiFillLinkedin className="footer-icon" />
        </a>
      </footer>
    </>
  )
}

export default App
