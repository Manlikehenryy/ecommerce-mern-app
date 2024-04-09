import React from 'react';
import PaystackPop from '@paystack/inline-js'
import toast from "react-hot-toast";




const usePaystack = (config) => {
    const paystack = new PaystackPop();
    paystack.newTransaction({
        ...config,
        key: 'pk_test_1c99a03d4ae9bdb0641358bb6afdb33984701be4',
        onSuccess: async (transaction) => {
          try {
            //verify payment on paystack
            const res = await fetch(`https://api.paystack.co/transaction/verify/${transaction.reference}`, {
              method: "GET",
              headers: {
                "Authorization": "Bearer sk_test_ecbe94713cea2f465c5f703575916afec8142ffe",
              "Cache-Control": "no-cache" 
            },
            });
            const data = await res.json();
    
            
            if (data?.data.status == 'success') {
              try {
                //update order status to purchased
                const res = await fetch(`/api/order`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({transactionReference: transaction.reference })
                });

                const data = await res.json();
        
                if (data.error) throw new Error(data.error);

                toast.success('Payment was successful');
              } catch (error) {
                toast.error(error.message);
              }
            }
            else{
              toast.error('Payment was not successful');
            }
           
              
          } catch (error) {
            toast.error(error.message);
          }
        },
        onCancel(){
          toast.error('Payment was canceled');
        }
      })
  
};


export default usePaystack;