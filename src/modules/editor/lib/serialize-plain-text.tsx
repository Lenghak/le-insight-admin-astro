import { Node } from "slate";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const serializePlainText = (nodes: any[]) => {
  return nodes.map((n) => Node.string(n)).join("\n");
};
