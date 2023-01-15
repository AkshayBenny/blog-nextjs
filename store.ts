import { useMemo } from 'react'
import {
	applySnapshot,
	Instance,
	SnapshotIn,
	SnapshotOut,
	types,
} from 'mobx-state-tree'

let store: IStore | undefined

// Models
const ProductModel = types.model('ProductModel', {})

const Store = types.model('Store', {
	product: ProductModel,
})
// .actions((self) => {
// 	let timer: any
// 	const start = () => {
// 		timer = setInterval(() => {
// 			// mobx-state-tree doesn't allow anonymous callbacks changing data.
// 			// Pass off to another action instead (need to cast self as any
// 			// because TypeScript doesn't yet know about the actions we're
// 			// adding to self here)
// 			;(self as any).update()
// 		}, 1000)
// 	}
// 	const update = () => {
// 		self.lastUpdate = new Date(Date.now())
// 		self.light = true
// 	}
// 	const stop = () => {
// 		clearInterval(timer)
// 	}
// 	return { start, stop, update }
// })

export type IStore = Instance<typeof Store>
export type IStoreSnapshotIn = SnapshotIn<typeof Store>
export type IStoreSnapshotOut = SnapshotOut<typeof Store>

export function initializeStore(snapshot = null) {
	const _store = store ?? Store.create({ lastUpdate: 0 })

	// If your page has Next.js data fetching methods that use a Mobx store, it will
	// get hydrated here, check `pages/ssg.tsx` and `pages/ssr.tsx` for more details
	if (snapshot) {
		applySnapshot(_store, snapshot)
	}
	// For SSG and SSR always create a new store
	if (typeof window === 'undefined') return _store
	// Create the store once in the client
	if (!store) store = _store

	return store
}

export function useStore(initialState: any) {
	const store = useMemo(() => initializeStore(initialState), [initialState])
	return store
}

// -----store.ts

// import { types } from "mobx-state-tree";

// const Store = types
//   .model("Store", {
//     // your state properties here
//     count: types.number
//   })
//   .actions(self => ({
//     increment() {
//       self.count++;
//     },
//     decrement() {
//       self.count--;
//     }
//   }));

// export default Store;

// -----------------------------------

// import { inject, observer } from "mobx-react";

// interface Props {
//   store?: typeof Store.Type;
// }

// const MyComponent = ({ store }: Props) => {
//   return (
//     <div>
//       <h1>{store?.count}</h1>
//       <button onClick={store?.increment}>Increment</button>
//       <button onClick={store?.decrement}>Decrement</button>
//     </div>
//   );
// };

// export default inject("store")(observer(MyComponent));

// ---------------OR----------------------
// import { useStore } from "mobx-react";

// const MyComponent = () => {
//   const store = useStore();
//   return (
//     <div>
//       <h1>{store?.count}</h1>
//       <button onClick={store?.increment}>Increment</button>
//       <button onClick={store?.decrement}>Decrement</button>
//     </div>
//   );
// };

// export default observer(MyComponent);

// =====================================================================

// import { types } from "mobx-state-tree";

// const Product = types
//   .model("Product", {
//     id: types.identifier,
//     name: types.string,
//     price: types.number
//   });

// const User = types
//   .model("User", {
//     id: types.identifier,
//     name: types.string,
//     email: types.string
//   });

// const Cart = types
//   .model("Cart", {
//     user: types.reference(User),
//     products: types.array(Product),
//     total: types.number,
//     quantity: types.number
//   });

// const Order = types
//   .model("Order", {
//     user: types.reference(User),
//     cart: types.reference(Cart),
//     status: types.enumeration("Status", ["pending", "shipped", "delivered"]),
//     date: types.Date
//   });

// const RootStore = types
//   .model("RootStore", {
//     products: types.array(Product),
//     user: types.maybe(User),
//     cart: types.maybe(Cart),
//     orders: types.array(Order)
//   })
//   .actions(self => ({
//     // actions to update and manipulate the state
//     addProductToCart(product: typeof Product.Type) {
//       self.cart.products.push(product);
//       self.cart.quantity++;
//       self.cart.total += product.price;
//     },
//     removeProductFromCart(product: typeof Product.Type) {
//       self.cart.products.splice(
//         self.cart.products.indexOf(product),
//         1
//       );
//       self.cart.quantity--;
//       self.cart.total -= product.price;
//     },
//     placeOrder() {
//       self.orders.push({
//         user: self.user,
//         cart: self.cart,
//         status: "pending",
//         date: new Date()
//       });
//     }
//   }));

// export default RootStore;
// ------------------------------------
// import { useStore } from "mobx-react";

// const MyComponent = () => {
//   const store = useStore();
//   const handleAddProduct = (product: typeof Product.Type) => {
//     store.addProductToCart(product);
//   };
//   const handleRemoveProduct = (product: typeof Product.Type) => {
//     store.removeProductFromCart(product);
//   };
//   const handlePlaceOrder = () => {
//     store.placeOrder();
//   };

//   return (
//     <div>
//       <h1>{store.cart.total}</h1>
//       <button onClick={() => handleAddProduct(product)}>Add Product</button>
//       <button onClick={() => handleRemoveProduct(product)}>Remove Product</button>
//       <button onClick={handlePlaceOrder}>Place Order</button>
//     </div>
//   );
// };
// ------------------------
// To update multiple states at once,
// const snapshot = { name: "John", age: 30 };
// store.applySnapshot(snapshot);
