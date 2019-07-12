import React from 'react';
import genericFileIcon from '../../assets/file.svg';
import closeIcon from '../../assets/close.svg'

const FileMessage = (props) => {

  const meta = props.message.data.meta || null
  const text = props.message.data.text || ''
  const file = props.message.data.file
  const author = props.message.author
  const size = props.message.size
  const name = props.message.name
  const fileType = props.message.type
  return (
    <div className='sc-message--file'>
      {
        props.message &&
        author === "me" &&
        props.onDelete &&
        <button className='delete-message' onClick={() => props.onDelete(props.message)}>
          x
          </button>
      }
      <div className='sc-message--file-icon' style={{ padding: 10, marginTop: "-0px" }}>
        <a href={file.url || '#'} target='_blank'>
          <img src={genericFileIcon} alt={name} height={60} />
        </a>
      </div>
      {/* <div className='sc-message--file-name'>
        <a href={file.url ? file.url : '#'} target='_blank'>{file.name}</a>
      </div>
      <div className='sc-message--file-text' >
        {text}
      </div>
      {meta && <p className='sc-message--meta'>{meta}</p>} */}
    </div>
  )
}

export default FileMessage