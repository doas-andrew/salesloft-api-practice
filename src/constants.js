export const proxy_url = "https://cors-anywhere.herokuapp.com/"
export const SL_People_url = "https://api.salesloft.com/v2/people"

export const debounce = (func, delay) => { 
    let debounceTimer 
    return function() { 
      const context = this
      const args = arguments 
      clearTimeout(debounceTimer) 
      debounceTimer = setTimeout(() => func.apply(context, args), delay) 
    } 
}
