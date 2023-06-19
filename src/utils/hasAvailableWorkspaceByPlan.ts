import { PlanOptions } from "@/components/Plan";

enum AvailableWorkspaceTotal {
  FREE = 1,
  STANDARD = 10,
  PREMIUM = "Unlimited",
}
const hasAvailableWorkspaceByPlan = (currentPlan: IPlan, workspaces: Iworkspace[]): boolean => {
  /** 檢查是否會超出方案內Workspace數量 */
  const filterActiveWorkspace = workspaces.filter((item) => !item.isArchived);

  if (currentPlan.name === PlanOptions.FREE) {
    return !!(filterActiveWorkspace.length < AvailableWorkspaceTotal.FREE);
  }
  if (currentPlan.name === PlanOptions.STANDARD) {
    return !!(filterActiveWorkspace.length < AvailableWorkspaceTotal.STANDARD);
  }
  return true;
};
export default hasAvailableWorkspaceByPlan;
