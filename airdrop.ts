// Outsource Imports
import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
// Local Imports
import wallet from "./dev-wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Create a Solana devnet connection to use devnet SOL tokens
const connection = new Connection("https://api.devnet.solana.com");

(async () => {
  try {
    // We're going to airdrop 2 SOL to the new wallet
    const txhash = await connection.requestAirdrop(
      keypair.publicKey,
      2 * LAMPORTS_PER_SOL
    );
    console.log(`Success! Check out your TX here: 
            https://explorer.solana.com/tx/${txhash}`);
  } catch (error) {
    console.error(`Oops, something went wrong! ${error}`);
  }
})();
