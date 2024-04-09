import React, { useState } from 'react'
import ProductOverview from '../product/ProductOverview';

const Card = ({product}) => {
    const [open, setOpen] = useState(false)

 

    const showProductOverview = () =>{
       setOpen(true);
    }

    
  return (
  
         <>
          
            
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.filePath}
                  alt={product.filePath}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a onClick={()=>showProductOverview(product._id)}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">Color</p>
                </div>
                <p className="text-sm font-medium text-gray-900">₦{product.price}</p>
              </div>
            
         
         <ProductOverview product={product} setOpen={setOpen} open={open}/>
         </>
        
  )
}

export default Card