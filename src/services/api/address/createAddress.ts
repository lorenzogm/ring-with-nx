import type { Address } from 'types/address'

export default async function createAddress(address: Address): Promise<void> {
  localStorage.setItem('address', JSON.stringify(address))

  await Promise.resolve()

  // fetch('/api/address/createAddress', {
  //   method: 'POST',
  //   body: JSON.stringify({ address }),
  // }).then((res) => res.json())
}
