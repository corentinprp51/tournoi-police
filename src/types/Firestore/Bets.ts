export type Bet = {
  id: string
  ask: string
  status: BetStatus
  endDate?: string
  endHours?: string
  isEnded?: boolean
  vote?: string
  username?: string
  userId?: string
  bets?: Array<Vote>
  votes?: Array<Vote>
  type: BetTypes
}

export enum BetStatus {
  ENDED = 'Terminé',
  TO_BET = 'Parier',
  TO_FINAL_VOTE = 'Voter'
}

export type Vote = {
  username: string
  userId: string
  vote: string
}

export type RankingVotes = {
  username: string
  userId: string
  votes: number | string
}

export enum BetTypes {
  PLAYERS = 'Joueurs',
  YESORNOT = 'Oui/Non',
  NUMBERS = 'Chiffres'
}
