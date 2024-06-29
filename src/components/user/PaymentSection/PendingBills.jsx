
import React, { useEffect, useState } from 'react';
import api from '../../../axiosInterceptors';

const PendingBills = () => {
    const userId = localStorage.getItem('userId');
    const [orders, setOrders] = useState([]);
    const [totals, setTotals] = useState([]);

    useEffect(() => {
        async function fetchApi() {
            try {
                const response = await api.get(`payment/billgeneration/${userId}`);
                console.log(response, "response");
             

                setOrders(response.data.data);
                setTotals(response.data.monthlyTotals);

           
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchApi();
    }, [userId]);




    async function handleButton() {
        const monthNumber = new Date(orders[0].purchaseDate).getMonth() + 1;
   console.log('called',monthNumber);
        try {
            const response = await api.post('payment/monthlypayment', {
                userId,
                month:monthNumber,
               
            });
            console.log(response);

            if(response.status===200){
                const value=window.location.href=response.data.session
              }
        } catch (error) {
            console.error('Error processing payment:', error);
        }
    }

    return (
        <div className="w-full bg-gradient-to-r flex flex-col justify-center items-center p-5 space-y-10 ">
        {orders?.map((x) => (
                <div key={x.month} className="bg-white border rounded-lg shadow-2xl p-6 w-full max-w-4xl">
                    <h1 className="font-bold text-3xl my-4 text-center text-blue-600">{x.Month}</h1>
                    <hr className="mb-4" />
                    <div>
                        <div className="flex justify-between mb-6">
                            <h1 className="text-lg font-bold">Invoice</h1>
                            <div className="text-gray-700 text-right">
                                <div>Invoice #:{x?._id}</div>
                            </div>
                        </div>

                        <table className="w-full mb-8">
                            <thead>
                                <tr>
                                    <th className="text-left font-bold text-gray-700">Description</th>
                                    <th className="text-right font-bold text-gray-700">Amount</th>
                                </tr>
                            </thead>
                            <tbody>

                            {x.ProductIds?.map((x,i) => (
   
        <tr key={i}>
            <td className="text-left text-gray-700">{x.productname}</td>
            <td className="text-right text-gray-700">{x.price}</td>
        </tr>
    
))}

                            </tbody>
                            <tfoot>
                                <hr className="mb-4" />
                                <tr>
                                    <td className="text-left font-bold text-gray-700 text-2xl">Total</td>
                                    <td className="text-right font-bold text-gray-700 text-2xl">{x.totalAmount}</td>
                                </tr>
                            </tfoot>
                        </table>
                        <div className='flex justify-between'>
                            <div>
                                <div className="text-gray-700 mb-2">Thank you for your business!</div>
                                <div className="text-gray-700 text-sm">Please remit payment within 30 days.</div>
                            </div>
                            <div>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                    onClick={()=>handleButton()}
                                >
                                    Pay
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PendingBills;
