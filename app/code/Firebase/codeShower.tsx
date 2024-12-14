'use client'

import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';


interface codeshowerprops {
    code:codeExamples
}

interface codeExamples {
    name:string,
    description:string,
    code:string
}

export  const CodeShower:React.FC<codeshowerprops> = ({code}) => {
    
    const [copyed, setCopyed] = useState(false)
  return (
    

    <div className=' max-w-4xl min-w-[25rem] rounded-md overflow-hidden h-fit bg-[#3a404d]'>
        <div className='flex justify-between px-4 text-white text-xs items-center'>
            <h2 className='text-sm'>{code.name}</h2>
            {!copyed ? (<button className='py-1  inline-flex items-center gap-1'
            onClick={()=>{
                navigator.clipboard.writeText(code.code)
                setCopyed(true)
                setTimeout(() => {
                setCopyed(false)
                }, 1000)
                }}>
                Copy
            </button>) : (
                <button className='py-1  inline-flex items-center gap-1'>
                Copyed
            </button>
            )}
        </div>
        <SyntaxHighlighter language="jsx" style={oneDark}
        PreTag="div"
        showLineNumbers={true}
        useInlineStyles={true}
        customStyle={{
            padding:"25px",
            margin:0,
            borderRadius:0
        }}
        wrapLongLines={true}
        >
            {code.code}
        </SyntaxHighlighter>
    </div>
  )
}
