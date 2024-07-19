//基本返回数据
interface BaseResponseData { 
  code: number,
  message: string | null,
  ok: boolean
}

export interface BaseTrademark { 
  createTime: string,
  id: number,
  logoUrl:string,
  tmName:string,
  updateTime:string,
}
 
export interface ResponseData { 
  countId: string | number | null,
  current: number | null,
  hitCount: boolean | null,
  maxLimit: number | null,
  optimizeCountSql: boolean | null,
  orders: any,
  pages: number | null,
  records: BaseTrademark[],
  searchCount: boolean | null,
  size: number | null,
  total: number | null,
}

export interface TrademarkResponseData extends BaseResponseData { 
  data: ResponseData
} 


export interface TradeMarkSaveResponse extends BaseResponseData { 
  data: any
}
