// eslint-disable-next-line import/no-extraneous-dependencies
import instance from "../instance";

// 透過header取得使用者的workspace
export const getWorkspacesByUserId = () => {
  return instance.get("workspaces/me");
};
