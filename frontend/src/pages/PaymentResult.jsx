import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PaymentResult = () => {
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const status = search.get('status');
  const reference = search.get('reference');

  useEffect(() => {
    if (status === 'success') {
      toast.success(`Payment successful (ref: ${reference || 'N/A'})`);
      // After showing toast, navigate to home after a short delay
      const t = setTimeout(() => navigate('/'), 2500);
      return () => clearTimeout(t);
    }

    if (status === 'failed') {
      toast.error('Payment failed');
      const t = setTimeout(() => navigate('/'), 2500);
      return () => clearTimeout(t);
    }
  }, [status, reference, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <p className="text-xl">Processing payment result...</p>
      </div>
    </div>
  );
};

export default PaymentResult;
