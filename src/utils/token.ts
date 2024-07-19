export function GET_TOKEN() {
  return localStorage.getItem('TOKEN')
}

export function SET_TOKEN(value: string) {
  return localStorage.setItem('TOKEN', value)
}

export function REMOVE_TOKEN() {
  return localStorage.removeItem('TOKEN')
}
