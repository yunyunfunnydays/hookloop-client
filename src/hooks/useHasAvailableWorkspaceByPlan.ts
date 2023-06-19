import GlobalContext from "@/Context/GlobalContext";
import { PlanOptions } from "@/pageComponents/planAndPayment/Plan";
import { useContext } from "react";

enum AvailableWorkspaceTotal {
  FREE = 1,
  STANDARD = 10,
  PREMIUM = "Unlimited",
}
const useHasAvailableWorkspaceByPlan = (currentPlan: IPlan): boolean => {
  /** 檢查是否會超出方案內Workspace數量 */
  const { c_workspaces } = useContext(GlobalContext);
  const filterActiveWorkspace = c_workspaces.filter((item) => !item.isArchived);

  if (currentPlan.name === PlanOptions.FREE) {
    return !!(filterActiveWorkspace.length < AvailableWorkspaceTotal.FREE);
  }
  if (currentPlan.name === PlanOptions.STANDARD) {
    return !!(filterActiveWorkspace.length < AvailableWorkspaceTotal.STANDARD);
  }
  return true;
};
export default useHasAvailableWorkspaceByPlan;
