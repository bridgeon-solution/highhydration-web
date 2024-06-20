import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import ad from '../../assets/Supplier/sup1.png';
import { FaEdit, FaTrash } from 'react-icons/fa';
import api from '../../axiosInterceptors';
import Loader from '../../components/Loader';

const Location = () => {
  const [pincodes, setPincodes] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [newPincode, setNewPincode] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [selectedPincode, setSelectedPincode] = useState('');
  const [selectedCombinations, setSelectedCombinations] = useState([]);
  const [editingPincodeId, setEditingPincodeId] = useState(null);
  const [editingPincodeValue, setEditingPincodeValue] = useState('');
  const [editingCombinationId, setEditingCombinationId] = useState(null);
const [editingSupplierId, setEditingSupplierId] = useState('');
const [editingCombinationPincodeId, setEditingCombinationPincodeId] = useState('');
const [loading,setLoading]=useState(false)

  useEffect(() => {
    fetchPincodes();
    fetchSuppliers();
    fetchCombinations();
  }, []);
  const fetchPincodes = async () => {
    setLoading(true)
    try {
      const response = await api.get(`/pincodes`);
      setPincodes(response.data.pincodes);
      setLoading(false)
      
    } catch (error) {
      console.error('Error fetching pincodes:', error);
    }
  };

  const fetchSuppliers = async () => {
    setLoading(true)
    try {
      const response = await api.get(`/admin/suppliers`);
      setSuppliers(response.data.data);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const fetchCombinations = async () => {
    setLoading(true)
    try {
      const response = await api.post(`/pincodes/supplierss`);
      setSelectedCombinations(response.data.supplierPincodes);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching supplier-pincode combinations:', error);
    }
  };

  const handleAddPincode = async () => {
    setLoading(true)
    try {
      await api.post(`/pincodes`, { pincode: newPincode });
      fetchPincodes();
      setNewPincode('');
      setLoading(false)
    } catch (error) {
      console.error('Error adding pincode:', error);
    }
  };

  const startEditingPincode = (pincode) => {
    setEditingPincodeId(pincode._id);
    setEditingPincodeValue(pincode.pincode);
  };
  
  const handleEditPincodeChange = (e) => {
    setEditingPincodeValue(e.target.value);
  };
  
  const handleSavePincode = async () => {
    setLoading(true)
    try {
      await api.put(`/pincodes/${editingPincodeId}`, { pincode: editingPincodeValue });
      fetchPincodes();
      setEditingPincodeId(null);
      setEditingPincodeValue('');
      setLoading(false)
    } catch (error) {
      console.error('Error updating pincode:', error);
    }
  };
  

  const handleDeletePincode = async (pincodeId) => {
    setLoading(true)
    try {
      await api.delete(`/pincodes/${pincodeId}`);
      fetchPincodes();
      setLoading(false)
    } catch (error) {
      console.error('Error deleting pincode:', error);
    }
  };

  const handleAddCombination = async () => {
    setLoading(true)
    // Check if both supplier and pincode are selected
    if (selectedSupplier && selectedPincode) {
      try {
       await api.post(`/pincodes/suppliers`, { supplierId: selectedSupplier, pincodeId: selectedPincode });
        fetchCombinations();
        setLoading(false)
        // Reset dropdowns
        setSelectedSupplier('');
        setSelectedPincode('');
      } catch (error) {
        console.error('Error saving supplier-pincode combination:', error);
      }
    }
  };

  const startEditingCombination = (combination) => {
    setEditingCombinationId(combination._id);
    setEditingSupplierId(combination.supplierId._id);
    setEditingCombinationPincodeId(combination.pincodeId._id);
  };

  
  const handleSaveCombination = async () => {
    setLoading(true)
    try {
     await api.put(`/pincodes/suppliers/${editingCombinationId}`, {
        supplierId: editingSupplierId,
        pincodeId: editingCombinationPincodeId
      });
      setLoading(false)
      fetchCombinations();
      setEditingCombinationId(null);
      setEditingSupplierId('');
      setEditingCombinationPincodeId('');
    } catch (error) {
      console.error('Error updating supplier-pincode combination:', error);
    }
  };

  const handleDeleteCombination = async (combinationId) => {
    setLoading(true)
    try {
      await api.delete(`/pincodes/suppliers/${combinationId}`);
      setLoading(false)
      fetchCombinations();
    } catch (error) {
      console.error('Error deleting supplier-pincode combination:', error);
    }
  };

  return (
    <div className="flex w-full h-screen overflow-hidden bg-[#F8F8F8]">
  {loading && <Loader />}
  <div className="min-h-screen">
    <AdminSidebar />
  </div>
  <div className="flex-1 overflow-scroll p-2">
    <div className="w-full h-1/4 flex flex-col lg:flex-row border rounded-lg" style={{ backgroundColor: '#303c6c' }}>
      <div className="flex-1 flex items-center justify-center p-4 lg:p-0">
        <p className="text-white text-2xl md:text-6xl font-bold text-center">Welcome To High Hydration</p>
      </div>
      <div className="flex items-center justify-center p-4 lg:p-5">
        <img className="h-14 w-14 md:h-36 md:w-36 xl:h-36 xl:w-40" src={ad} alt="Advertisement" />
      </div>
    </div>

    {/* Pincode to supplier and Add Pincode */}
    <div className="flex flex-wrap items-center justify-between pb-4 mt-4 space-y-4 md:space-y-0">
      <div className="relative flex items-center space-x-2 w-full md:w-auto">
        <input
          type="text"
          value={newPincode}
          onChange={(e) => setNewPincode(e.target.value)}
          className="block w-full p-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          placeholder="Add Pincode..."
        />
        <button
          onClick={handleAddPincode}
          className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap items-center space-x-2 w-full md:w-auto">
        <select
          value={selectedSupplier}
          onChange={(e) => setSelectedSupplier(e.target.value)}
          className="block w-full md:w-60 p-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Supplier</option>
          {suppliers.map((supplier) => (
            <option key={supplier._id} value={supplier._id}>
              {`${supplier.first_name} ${supplier.last_name}`}
            </option>
          ))}
        </select>
        <select
          value={selectedPincode}
          onChange={(e) => setSelectedPincode(e.target.value)}
          className="block w-full md:w-60 p-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Pincode</option>
          {pincodes.map((pincode) => (
            <option key={pincode._id} value={pincode._id}>
              {pincode.pincode}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddCombination}
          className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Save
        </button>
      </div>
    </div>

    {/* Tables */}
    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
      {/* Pincode Table */}
      <div className="overflow-x-auto w-full lg:w-1/2 shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs uppercase bg-[#303c6c] text-white">
            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Pincode</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pincodes.map((pincode, index) => (
              <tr key={pincode._id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">
                  {editingPincodeId === pincode._id ? (
                    <input
                      type="text"
                      value={editingPincodeValue}
                      onChange={handleEditPincodeChange}
                      className="block w-full p-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p>{pincode.pincode}</p>
                  )}
                </td>
                <td className="px-6 py-4 flex items-center space-x-6">
                  {editingPincodeId === pincode._id ? (
                    <button onClick={handleSavePincode} className="text-blue-500 cursor-pointer">Save</button>
                  ) : (
                    <FaEdit className="text-blue-500 cursor-pointer" onClick={() => startEditingPincode(pincode)} />
                  )}
                  <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleDeletePincode(pincode._id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Supplier-Pincode Table */}
      <div className="overflow-x-auto w-full lg:w-1/2 shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs uppercase bg-[#303c6c] text-white">
            <tr>
              <th scope="col" className="px-6 py-3">Supplier</th>
              <th scope="col" className="px-6 py-3">Pincode</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {selectedCombinations.map((combination) => (
              <tr key={combination._id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  {editingCombinationId === combination._id ? (
                    <select
                      value={editingSupplierId}
                      onChange={(e) => setEditingSupplierId(e.target.value)}
                      className="block w-full p-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Supplier</option>
                      {suppliers.map((supplier) => (
                        <option key={supplier._id} value={supplier._id}>
                          {`${supplier.first_name} ${supplier.last_name}`}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p>{combination?.supplierId?.first_name}</p>
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingCombinationId === combination._id ? (
                    <select
                      value={editingPincodeId}
                      onChange={(e) => setEditingCombinationPincodeId(e.target.value)}
                      className="block w-full p-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Pincode</option>
                      {pincodes.map((pincode) => (
                        <option key={pincode._id} value={pincode._id}>
                          {pincode.pincode}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p>{combination?.pincodeId?.pincode}</p>
                  )}
                </td>
                <td className="px-6 py-4 flex items-center space-x-6">
                  {editingCombinationId === combination._id ? (
                    <button onClick={handleSaveCombination} className="text-blue-500 cursor-pointer">Save</button>
                  ) : (
                    <FaEdit className="text-blue-500 cursor-pointer" onClick={() => startEditingCombination(combination)} />
                  )}
                  <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleDeleteCombination(combination._id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

  
  );
};

export default Location;
