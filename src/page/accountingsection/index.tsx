import { Routes, Route } from "react-router-dom";
import PageNotFound from "../404/PageNotFound";
import { FeesPayment } from "./feespayment/FeesPayment";
import { ManageFees } from "./managefees/ManageFees";
import { PayFees } from "./payfees/PayFees";
const AccountingSection = () => {
  return (
    <Routes>
      <Route path="/feespayment/" element={<FeesPayment />} />
      <Route path="/managefees/" element={<ManageFees />} />
      <Route path="/payfees/" element={<PayFees />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AccountingSection;
