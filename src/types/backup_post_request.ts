interface ArticleInfo {
  amount: number,
  input: number,
  output: number,
}

interface HistoryIndex {
  [ key: string ]: ArticleInfo
}

interface Article {
  id: string,
  name: string,
  weight: number,
  price: number,
  amount: number,
  history: HistoryIndex,
}

interface Inventory {
  [ key: string ]: Article
}

interface Units {
  mass: string,
  currency: string,
}

interface BackupPostRequest {
  inventory: Inventory,
  history: string[],
  units: Units,
}

export default BackupPostRequest
export { Article, ArticleInfo, BackupPostRequest, HistoryIndex, Units }