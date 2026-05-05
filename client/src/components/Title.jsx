import React from 'react'

const Title = ({title, subTitle,align}) => {
  return (
    <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">{title}</h1>
        <p className="text-gray-600 text-base sm:text-lg">{subTitle}</p>
    </div>
  )
}

export default Title