// eslint-disable-next-line import/no-extraneous-dependencies
import instance from "../instance";

// 透過header取得使用者的workspace
export const getWorkspacesByUserId = () => {
  return instance.get("workspaces/me");
};

// 新建 workspace
export const addWorkspace = (data: Pick<Iworkspace, "workspaceName" | "members">) => {
  return instance.post("workspaces", data);
};
// 修改 workspace
export const updateWorkspace = (workspaceId: string, data: Pick<Iworkspace, "workspaceName" | "members">) => {
  return instance.patch(`workspaces/${workspaceId}`, data);
};

// 封存 workspace
export const archivedWorkspace = (workspaceId: string) => {
  return instance.patch(`workspaces/${workspaceId}/isArchived`, { workspaceId });
};
