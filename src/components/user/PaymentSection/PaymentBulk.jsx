import React, { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import toast from 'react-hot-toast';
import api from '../../../axiosInterceptors';

const PaymentBulk = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [payments, setPayments] = useState([]);
  const itemsPerPage = 5; 

  const userid = localStorage.getItem('userId');
  const totalLength = payments.length; 
  const totalPages = Math.ceil(totalLength / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const orderfetch = async () => {
      try {
        const response = await api.get(`payments/paymentsById/${userid}`);
        setPayments(response.data.data);
      } catch (error) {
        console.log(error);
        toast.error(error?.message);
      }
    };
    if (userid) {
      orderfetch();
    }
  }, [userid]);

  const currentItems = payments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-5/6">
      <div className="w-full bg-white rounded-2xl">
        <table className="w-full bg-white rounded-2xl">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-center font-light">Date</th>
              <th className="text-center font-light">Product Name</th>
              <th className="text-center font-light">Amount</th>
              <th className="text-center font-light">Invoice</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((x, i) => (
              <tr key={i}>
                <td className="text-center">{x.purchaseDate.slice(0, 10)}</td>
                <td className="text-center">{x.product.productname}</td>
                <td className="text-center">{x.amount}</td>
                <td className="text-center">Download</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <a
              href="#"
              onClick={handlePreviousPage}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </a>
            <a
              href="#"
              onClick={handleNextPage}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Next
            </a>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalLength)}</span> of{' '}
                <span className="font-medium">{totalLength}</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <a
                  href="#"
                  onClick={handlePreviousPage}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </a>
                {[...Array(totalPages)].map((_, index) => (
                  <a
                    key={index}
                    href="#"
                    onClick={() => handlePageClick(index + 1)}
                    aria-current={currentPage === index + 1 ? 'page' : undefined}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${currentPage === index + 1 ? 'bg-indigo-600 text-white focus-visible:outline-indigo-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    {index + 1}
                  </a>
                ))}
                <a
                  href="#"
                  onClick={handleNextPage}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentBulk;
