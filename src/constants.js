export const proxy_url = "https://cors-anywhere.herokuapp.com/"
export const SL_People_url = "https://api.salesloft.com/v2/people"

// hardcoded because the API does not provide this value
export const total_records = 346

export const defaultCount = { a:0, b:0, c:0, d: 0, e: 0, f: 0, g: 0, h: 0, i: 0, j: 0, k: 0, l: 0, m: 0, n: 0, o: 0, p: 0, q: 0, r: 0, s: 0, t: 0, u: 0, v: 0, w: 0, x: 0, y: 0, z: 0 }
export const frequency_categories = [ "Character", "Count" ]

export const people_categories = [
  { display: "id", attribute: "id"},
  { display: "Name", attribute: "last_name"},
  { display: "Email", attribute: "email_address"},
  { display: "Job Title", attribute: "title"}
]