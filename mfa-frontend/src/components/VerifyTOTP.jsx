import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function VerifyTOTP() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/verify-totp`, { code }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("MFA verified successfully!");
      navigate("/dashboard");
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Enter TOTP Code</h2>
      <form onSubmit={handleVerify}>
        <input type="text" placeholder="Enter code" value={code} onChange={(e) => setCode(e.target.value)} required />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
}

export default VerifyTOTP;
