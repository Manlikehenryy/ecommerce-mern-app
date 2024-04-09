import React from 'react'
import Card from './Card'
import useGetAllProducts from '../../hooks/useGetAllProducts'
import CardSkeleton from '../skeletons/CardSkeleton';

const Cards = () => {
    const {loading,products} =  useGetAllProducts();
    

    
  return (
    <>
	{!loading && <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
    {!loading &&
				products.length > 0 &&
				products.map((product) => (
					<div key={product._id} className="group relative cursor-pointer">
						<Card product={product} />
					</div>
				))}
      </div>}
	  
			{loading && <div className='flex mt-10'>{[...Array(4)].map((_, idx) => <CardSkeleton key={idx} />)}</div>}
			{!loading && products.length === 0 && (
				<h1 className='mx-auto text-lg font-semibold'>There are no products currently</h1>
			)} 

    </>
  )
}

export default Cards