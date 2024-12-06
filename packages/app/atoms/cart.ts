import type { Product } from '@t4/api/src/db/schema'
import { atom, useAtom } from 'jotai'

export const cartAtom = atom<Product[]>([])

export const addToCartAtom = atom(null, (get, set, update) => {
  const product = update
  const cart = get(cartAtom)
  const current = cart.find((item) => item.product.id === product.id)
  const currentProduct = current?.product

  if (!currentProduct) {
    set(cartAtom, [...cart, { product, quantity: 1 }])
    return
  }

  set(
    cartAtom,
    cart.map((product) => {
      if (product.product.id === currentProduct.id) {
        return { product: product.product, quantity: product.quantity + 1 }
      }
      return product
    })
  )
})

export const decreaseCartAtom = atom(null, (get, set, update) => {
  console.log('triggered')

  const product = update
  const cart = get(cartAtom)
  const current = cart.find((item) => item.product.id === product.id)

  console.log(current)

  const currentProduct = current.product
  const currentQuantity = current.quantity

  if (currentQuantity > 1) {
    set(
      cartAtom,
      cart.map(({ product, quantity }) => {
        if (product.id === currentProduct.id) {
          return { product: product, quantity: quantity - 1 }
        }
        return { product, quantity }
      })
    )
  }
  if (currentQuantity === 1) {
    const updatedCart = cart.filter((item) => item.product.id !== product.id)
    set(cartAtom, updatedCart)
  }
})

export const removeFromCartAtom = atom(null, (get, set, update: Pick<Product, 'id'>) => {
  const cart = get(cartAtom)
  const updatedCart = cart.filter((item) => item.product.id !== update.id)
  set(cartAtom, updatedCart)
})

export const cartTotalAtom = atom((get) =>
  get(cartAtom)
    .reduce((total, prod) => total + prod.price * prod.quantity, 0)
    .toFixed(2)
)

export const cartTotalQuantity = atom((get) =>
  get(cartAtom)
    .reduce((total, prod) => total + prod.quantity, 0)
    .toFixed(2)
)
