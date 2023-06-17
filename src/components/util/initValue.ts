export const userInitValue: IUser = {
  username: "",
  email: "",
  password: "",
  avatar: "",
  userId: "",
};

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

export const queryTypeInitValue: IqueryType = {
  reporters: [],
  members: [],
  tags: [],
  priority: "",
  status: "",
  isMatch: false,
};
