import useWallet from "@/contexts/useWallet";

export default function Home() {
  const { account, connect, error } = useWallet()

  return (
    <div
      className="flex items-center justify-center flex-col min-h-screen gap-4"
    >
      <img className="w-20" src="./metamask.png" />
      {account ? (
        <div>{account}</div>
      )
        : (
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg" onClick={() => connect()}>Connect Wallet</button>
        )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
