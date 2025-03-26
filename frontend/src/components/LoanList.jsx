import { useAuth } from "../context/AuthContext";
import axiosInstance from "../axiosConfig";

const LoanList = ({ loans, setLoans, setEditingLoan }) => {
  const { user } = useAuth();

  const handleDelete = async (loanId) => {
    try {
      await axiosInstance.delete(`/api/loans/${loanId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setLoans(loans.filter((loan) => loan._id !== loanId));
    } catch (error) {
      alert("Deletion failed");
    }
  };

  return (
    <div>
      {loans.map((loan) => (
        <div key={loan._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <h2 className="font-bold">{loan.borrowerName}</h2>
          <p>Amount: ${loan.amount}</p>
          <p>interest rate: {loan.interestRate}%</p>
          <div className="mt-2">
            <button
              onClick={() => setEditingLoan(loan)}
              className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              edit
            </button>
            <button
              onClick={() => handleDelete(loan._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoanList;
