export const workspaceInitValue: Iworkspace = {
  workspaceId: "",
  workspaceName: "",
  kanbans: [],
  members: [],
  isArchived: false,
};

export const kanbanInitValue: Ikanban = {
  _id: "",
  name: "",
  key: "",
  listOrder: [],
  workspaceId: "",
  isPinned: false,
  isArchived: false,
};
