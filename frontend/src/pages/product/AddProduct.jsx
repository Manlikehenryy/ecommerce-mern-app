import React, { useState } from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import useAddProduct from '../../hooks/useAddProduct'

const AddProduct = () => {

    const {loading, addProduct} = useAddProduct();
    const [inputs, setInputs] = useState({name:'', price:'', description:'',file:''})


  

    const handleSubmit = async (e) =>{

        e.preventDefault();
       
        const form = new FormData()
		form.append('name',inputs.name);
        form.append('price',inputs.price);
        form.append('description',inputs.description);
        form.append('productImage',inputs.file);

        await addProduct(form)

        setInputs({name:'', price:'', description:'',file:''})
    }
  return (

    <>
        <form onSubmit={handleSubmit} className='bg-base-100 shadow-lg rounded-lg p-5 my-20'>
      <div className="space-y-12">
      

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Product Information</h2>
         

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="Name" className="block text-sm font-medium leading-6 text-gray-900">
               Name
               </label>
              <div className="mt-2">
                <input
                  value={inputs.name}
                  required
                  onChange={(e)=>setInputs({...inputs,name: e.target.value})}
                  type="text"
                  name="Name"
                  id="Name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="Price" className="block text-sm font-medium leading-6 text-gray-900">
                Price
              </label>
              <div className="mt-2">
                <input
                  required
                  value={inputs.price}
                  onChange={(e)=>setInputs({...inputs,price: e.target.value})}
                  type="number"
                  name="Price"
                  id="Price"
                  autoComplete="Price"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            

            <div className="col-span-full">
              <label htmlFor="Description" className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <input
                  required
                  value={inputs.description}
                  onChange={(e)=>setInputs({...inputs,description: e.target.value})}
                  type="text"
                  name="Description"
                  id="Description"
                  autoComplete="Description"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Upload Product Image
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  {inputs.file &&  <span>{inputs.file.name}</span>}
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                        
                       <span className='px-10'>Upload a file</span>
                      <input id="file-upload" required name="file-upload"  type="file" onChange={(e)=>setInputs({...inputs,file: e.target.files[0]})} className="sr-only" />
                    </label>
                    {/* <p className="pl-1">or drag and drop</p> */}
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

        

          
          </div>
        </div>

       
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          disabled={loading}>
                           
		 	{loading ? <span className='loading loading-spinner'></span> : "Save"}
          
        </button>
      </div>

      
    </form>
    
    <br /><br />
    </>
  )
}

export default AddProduct