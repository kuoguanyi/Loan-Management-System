import { useState, useEffect } from "react";
import LoanForm from "../components/LoanForm";
import LoanList from "../components/LoanList";
import axiosInstance from "../axiosConfig";
import { useAuth } from "../context/AuthContext";

const Loans = () => {
  const [loans, setLoans] = useState([]);
  const [editingLoan, setEditingLoan] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ loading 狀態
  const [error, setError] = useState(""); // ✅ 錯誤訊息

  const { user } = useAuth();

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axiosInstance.get("/api/loans", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setLoans(response.data);
      } catch (error) {
        setError("❌ Failed to obtain loan information");
      } finally {
        setLoading(false);
      }
    };
    fetchLoans();
  }, [user]);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      {loading && <p className="text-gray-500">🔄 Loading loan data...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <>
          <LoanForm
            loans={loans}
            setLoans={setLoans}
            editingLoan={editingLoan}
            setEditingLoan={setEditingLoan}
          />
          <LoanList
            loans={loans}
            setLoans={setLoans}
            setEditingLoan={setEditingLoan}
          />
        </>
      )}
    </div>
  );
};

export default Loans;
