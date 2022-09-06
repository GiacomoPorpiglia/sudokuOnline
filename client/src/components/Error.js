import React from 'react'

const Error = ({errorHandler}) => {

  return (
    errorHandler.hasError ? (
    <div className="errorDiv">{errorHandler.message}</div>
    ) : (<></>)
  )
}

export default Error