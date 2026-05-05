import React from 'react'

const Title = ({title, subTitle}) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-semibold text-slate-950 sm:text-4xl">{title}</h1>
      <p className="mt-2 text-sm text-slate-500 sm:text-base">{subTitle}</p>
    </div>
  )
}

export default Title