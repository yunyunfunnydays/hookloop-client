const isPlanAndPayValid = (currentPlan: IPlan) => {
  /** 檢查方案是否付費 或 過期 (免費版沒有期限) */
  const today = new Date();
  const targetEndDate = new Date(currentPlan.endAt);

  if (currentPlan.status === "UN-PAID" || currentPlan.status === "PAY-FAIL") {
    return false;
  }
  if (currentPlan.status === "PAY-SUCCESS" && targetEndDate < today) {
    return false;
  }
  return true;
};
