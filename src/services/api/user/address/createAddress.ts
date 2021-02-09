import { Address } from './address'

export default function createAddress(address: Address): void {
  localStorage.setItem('address', JSON.stringify(address))

  // return fetch('/api/user/address/createAddress', {
  //   method: 'POST',
  //   body: JSON.stringify({ address }),
  // }).then((res) => res.json())
}
