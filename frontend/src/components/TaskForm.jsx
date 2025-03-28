import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../axiosConfig";
import { toast } from "react-toastify";

const LoanForm = ({ loans, setLoans, editingLoan, setEditingLoan }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    borrowerName: "",
    amount: "",
    interestRate: "",
  });

  useEffect(() => {
    if (editingLoan) {
      setFormData({
        borrowerName: editingLoan.borrowerName,
        amount: editingLoan.amount,
        interestRate: editingLoan.interestRate,
      });
    } else {
      setFormData({ borrowerName: "", amount: "", interestRate: "" });
    }
  }, [editingLoan]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !formData.borrowerName ||
        !formData.amount ||
        !formData.interestRate
      ) {
        toast.error("Please fill in all fields.");
        return;
      }

      if (editingLoan) {
        const response = await axiosInstance.put(
          `/api/loans/${editingLoan._id}`,
          formData,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setLoans(
          loans.map((loan) =>
            loan._id === response.data._id ? response.data : loan
          )
        );
      } else {
        const response = await axiosInstance.post("/api/loans", formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setLoans([...loans, response.data]);
      }
      setEditingLoan(null);
      setFormData({ borrowerName: "", amount: "", interestRate: "" });
    } catch (error) {
      toast.error("Failed to save loan.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 shadow-md rounded mb-6"
    >
      <h1 className="text-2xl font-bold mb-4">
        {editingLoan ? "Edit Loan" : "New borrowing"}
      </h1>
      <input
        type="text"
        placeholder="Borrower's Name"
        value={formData.borrowerName}
        onChange={(e) =>
          setFormData({ ...formData, borrowerName: e.target.value })
        }
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Amount"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Interest Rate"
        value={formData.interestRate}
        onChange={(e) =>
          setFormData({ ...formData, interestRate: e.target.value })
        }
        className="w-full mb-4 p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        {editingLoan ? "renew" : "Added"}
      </button>
    </form>
  );
};

export default LoanForm;

