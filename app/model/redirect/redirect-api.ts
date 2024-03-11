export const createRedirectSession = async ({}: {
  checkoutId: string,
  callbacks: {
    postFlowUrl: string,
    thankYouPageUrl: string,
    cartPageUrl: string,
  }}) => {
  return { redirectSession: { fullUrl: 'http://localhost:3000/' } };
}
