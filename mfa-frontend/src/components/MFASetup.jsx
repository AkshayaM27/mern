import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";

const MFASetup = () => {
  const [secret, setSecret] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [userToken, setUserToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post("http://localhost:5000/api/mfa/setup", {}, { withCredentials: true })
      .then((res) => {
        setSecret(res.data.secret);
        setQrCodeUrl(res.data.qrCodeUrl);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching MFA setup:", err);
        setLoading(false);
      });
  }, []);

  const handleVerify = () => {
    setVerifying(true);
    axios
      .post("http://localhost:5000/api/mfa/verify", { token: userToken }, { withCredentials: true })
      .then((res) => {
        setVerifying(false);
        if (res.data.success) {
          alert("MFA Setup Successful!");
          navigate("/dashboard");
        } else {
          alert("Invalid OTP! Please try again.");
        }
      })
      .catch((err) => {
        setVerifying(false);
        console.error("Error verifying OTP:", err);
      });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 5, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Set Up Multi-Factor Authentication (MFA)
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Scan the QR code using Google Authenticator.
        </Typography>

        {loading ? (
          <CircularProgress sx={{ marginTop: 2 }} />
        ) : qrCodeUrl ? (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <QRCodeCanvas value={qrCodeUrl} size={200} />
          </Box>
        ) : (
          <Typography color="error">Failed to load QR Code.</Typography>
        )}

        <Typography variant="body2" sx={{ marginTop: 2 }}>
          Or enter this secret manually in Google Authenticator:
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold", marginTop: 1 }}>
          {secret || "Generating..."}
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          label="Enter OTP"
          value={userToken}
          onChange={(e) => setUserToken(e.target.value)}
          sx={{ marginTop: 3 }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={handleVerify}
          disabled={verifying}
        >
          {verifying ? <CircularProgress size={24} /> : "Verify"}
        </Button>
      </Paper>
    </Container>
  );
};

export default MFASetup;
