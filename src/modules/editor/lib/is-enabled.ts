export const isEnabled = (
  id: string,
  currentId?: string,
  componentId?: boolean,
) => (!currentId && componentId !== false) || currentId === id;
