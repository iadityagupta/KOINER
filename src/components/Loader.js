import React from 'react'
import {MutatingDots} from 'react-loader-spinner'

const Loader = () => {
  return (
    <div style={{display:'flex', justifyContent: 
    'Center'    ,height:"100vh" }}> 

 <MutatingDots
  visible={true}
  height="100"
  width="100"
  color="orange"
  secondaryColor="#4fa94d"
  radius="12.5"
  ariaLabel="mutating-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
      
    </div>
  )
}

export default Loader

