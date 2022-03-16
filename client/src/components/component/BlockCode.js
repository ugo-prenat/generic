import React, { useEffect, useState } from 'react'

import { Prism as Code } from 'react-syntax-highlighter';
import { vscDarkPlus as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { request as fetch } from '../../controller/request';

export default function BlockCode(props) {
  const backendUrl = process.env.REACT_APP_BACKEND_URL
  
  const [showErrorMsg, setShowErrorMsg] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  const [fileContent, setFileContent] = useState()
  const [fileType, setFileType] = useState(props.type)
  const [fileUrl, setFileUrl] = useState(props.url)
  const [filename, setFilename] = useState(props.name)
  
  
  useEffect(() => {
    /* if (props.content === 'error') setShowErrorMsg(true)
    else setShowErrorMsg(false) */
    setIsLoading(true)
    
    const getFileContent = async() => {
      if (props.type === 'file') {
        // Fetch the file content
        const content = await fetch.getFile(props.url)
        setFileContent(content)
      }
      setFileType(props.type)
      setFileUrl(props.url)
      setFilename(props.name)
      
      setIsLoading(false)
    }
    getFileContent()
    
  }, [props])
  
  if (isLoading) return (<div className='loading'>Chargement du fichier...</div>)
  
  return (
    <div className='block-code'>
      <p className='section-title'>{filename}</p>
      { 
        showErrorMsg ?
          <div className='loading'>Le contenu du fichier ne peut pas être affiché...</div>
        :
        fileType === 'image' ?
          <img src={backendUrl + fileUrl} alt={''} style={{width: '100px',height:'100px'}} />
        :
          <Code
            language='jsx'
            style={theme}
            showLineNumbers={true}
            lineNumberContainerStyle={{ 'color': 'grey' }}
          >
            {fileContent}
          </Code>
      }
    </div>
  )
}