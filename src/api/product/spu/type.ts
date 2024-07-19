// "records": [
  //             {
  //                 "id": 13009,
  //                 "createTime": "2024-07-13 19:55:25",
  //                 "updateTime": "2024-07-13 20:55:18",
  //                 "spuId": 13933,
  //                 "price": 22,
  //                 "skuName": "fasd",
  //                 "skuDesc": "22",
  //                 "weight": "22.00",
  //                 "tmId": 1,
  //                 "category3Id": 480,
  //                 "skuDefaultImg": "http://139.198.127.41:9000/sph/20240713/aa.jpg",
  //                 "isSale": 1,
  //                 "skuImageList": null,
  //                 "skuAttrValueList": null,
  //                 "skuSaleAttrValueList": null
//             },
export interface SPU_OBJ { 
  id: number | null,
  createTime: string | null,
  updateTime: string | null,
  spuId: number | null,
  price: number | null,
  skuName: string | null,
  skuDesc: string | null,
  weight: float | null,
  tmId: number | null,
  category3Id: number | null,
  skuDefaultImg: string | null,
  isSale: number | null,
  skuImageList: any,
  skuAttrValueList: any,
  skuSaleAttrValueList: any,
}

export type SPU_OBJS = SPU_OBJ[];