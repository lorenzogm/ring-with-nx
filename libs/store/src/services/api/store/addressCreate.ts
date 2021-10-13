import { StoreUserAddress } from '@ring/store'

export async function addressCreate(address: StoreUserAddress): Promise<void> {
  localStorage.setItem('address', JSON.stringify(address))

  await Promise.resolve()

  // fetch('/api/address/createAddress', {
  //   method: 'POST',
  //   body: JSON.stringify({ address }),
  // }).then((res) => res.json())
}
