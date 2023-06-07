export type Statistiques = {
  goals: number
  assists: number
  goalkeeper: number
  nutmeg: number
}

export type PlayerStatistiques = {
  playerName: string
} & Statistiques

export type FirestoreStats = {
  id: string
  username: string
  userId: string
  gameId: string
} & Statistiques
