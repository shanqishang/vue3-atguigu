export const getTime = () => {
  //1.获取本地事件
  const hour = new Date().getHours()
  if (hour < 9) {
    return '上午'
  } else if (hour < 12) {
    return '中午'
  } else if (hour < 16) {
    return '下午'
  } else {
    return '晚上'
  }
}

/**
 * 获取时间并格式化函数
 * @param M 格式模板 如: YYYY-MM-DD ...
 * @param Time 可选传入时间参数 默认为 Now
 */
export const GetDate = (
  M: string,
  Time: Date | null | string | number = null,
) => {
  const D: Date = Time ? new Date(Time) : new Date()
  const P = /(Y{2,4}|M{1,2}|D{1,2}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|C{1,2}|W{1,2})/g
  const ToZ: any = (S: string | number) => (Number(S) < 10 ? '0' + S : S)
  const DS: string = M.replace(P, ($0: string) => {
    switch ($0) {
      case 'YY':
        return D.getFullYear().toString().slice(-2)
      case 'YYYY':
        return D.getFullYear()
      case 'M':
        return D.getMonth() + 1
      case 'MM':
        return ToZ(D.getMonth() + 1)
      case 'D':
        return D.getDate()
      case 'DD':
        return ToZ(D.getDate())
      case 'W':
        return D.getDay()
      case 'WW':
        return ['日', '一', '二', '三', '四', '五', '六'][D.getDay()]
      case 'H':
        return D.getHours()
      case 'HH':
        return ToZ(D.getHours())
      case 'm':
        return D.getMinutes()
      case 'mm':
        return ToZ(D.getMinutes())
      case 's':
        return D.getSeconds()
      case 'ss':
        return ToZ(D.getSeconds())
      case 'C':
        return Math.trunc(D.getTime() / 1000)
      case 'CC':
        return D.getTime()
      default:
        return $0
    }
  })
  return DS
}
