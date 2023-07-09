export interface IStore {
  cart: {
    [value: number]: {
      amount: number
      time: number
    }
  }
}
