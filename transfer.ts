// Outsource Imports
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
// Local Imports
import wallet from "./dev-wallet.json";

const from = Keypair.fromSecretKey(new Uint8Array(wallet));
const to = new PublicKey("6KpybZWRSHw5zzLq16UYxc3nzFQhv5w1SmsVNgLQAwLy");

// Create a Solana devnet connection to use devnet SOL tokens
const connection = new Connection("https://api.devnet.solana.com");

(async () => {
  try {
    // We're going to transfer 0.1 SOL from the first wallet to the second wallet
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: 0.1 * LAMPORTS_PER_SOL,
      })
    );
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash("confirmed")
    ).blockhash;
    transaction.feePayer = from.publicKey;

    // Sign the transaction, broadcast, and confirm the results
    const signature = await sendAndConfirmTransaction(connection, transaction, [
      from,
    ]);
    console.log(
      `Success! Check out your TX here: https://explorer.solana.com/tx/${signature}?cluster=devnet`
    );
  } catch (error) {
    console.error(`Oops, something went wrong! ${error}`);
  }
})();
