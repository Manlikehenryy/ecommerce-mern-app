import React from 'react'
import Cards from './Cards'

const CardContainer = () => {
  return (
    <>
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">New arrivals</h2>
        <Cards/>
        </div>

        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>
        <Cards/>
        </div>
    </>
  )
}

export default CardContainer