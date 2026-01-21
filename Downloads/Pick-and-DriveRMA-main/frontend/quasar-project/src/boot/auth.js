import { ref } from 'vue'

export const korisnikIme = ref(
  localStorage.getItem('korisnicko_ime') || ''
)

export const korisnikFirst = ref(
  localStorage.getItem('korisnicko_ime') || ''
)

export const korisnikLast = ref(
  localStorage.getItem('korisnicko_ime') || ''
)
