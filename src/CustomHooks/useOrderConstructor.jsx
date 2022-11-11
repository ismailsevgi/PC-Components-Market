/*
    This custom-hook is a boilder templete for creating an order document which has order properties such as orderId, products and their prices etc...

    This function has used in firebaseApi.js > inside setOrder mutation. Takes an array of basket products.

*/

export default function useOrderConstructor(array) {
  return {
    orderId: 'non',
    orderStatus: 'continues',
    orderedBy: localStorage.getItem('userDocId'),
    productOwners: Array.from(
      new Set(array.map((product) => product.productOwner))
    ),
    products: [
      ...array
        .filter((product) => product.check && product)
        .map((product) => ({
          id: product.id,
          title: product.title,
          customerMail: localStorage.getItem('userEmail'),
          sellerEmail: product.sellerEmail,
          status: 'waiting',
          quantity: product.quantity,
          owner: product.productOwner,
          productImageUrl: product.images[0],
          seller: product.sellerUsername,
          totalPrice: product.price - (product.price / 100) * product.saleRate,
        })),
    ],
  };
}
