import { Node } from "slate"

export const serializePlainText = (nodes: any[]) => {
  return nodes.map(n => Node.string(n)).join('\n')
}