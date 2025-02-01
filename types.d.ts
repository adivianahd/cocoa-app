export interface Instrument {
    id: number
    ticker: string
    name: string
    type: string
    last_price: number
    close_price: number
    side?: Side
}

export interface Portfolio {
    instrument_id: number
    ticker: string
    quantity: number
    last_price: number
    close_price: number
    avg_cost_price: number
}

export type Side = 'BUY' | 'SELL'

export type OrderType = 'MARKET' | 'LIMIT'


export interface OrderBodyBase {
    instrument_id: Instrument['id']
    side: Side
    type: OrderType
    quantity: number
}

export interface OrderMarketBody extends OrderBodyBase {
    type: 'MARKET'
}
export interface OrderLimitBody extends OrderBodyBase {
    type: 'LIMIT'
    price: number
}

export type OrderBody = OrderMarketBody | OrderLimitBody


export interface OrderResponse {
    id: number
    instrument_id: Instrument['id']
    price: number
    quantity: number
    side: string
    status: 'FILLED' | 'PENDING' | 'REJECTED' 
    type: string
  }
  