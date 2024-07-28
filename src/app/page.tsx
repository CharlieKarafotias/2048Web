import Board from "./components/Board";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-8">
      <header>2048 MultiPlayer</header>
      <br />
      <Board />
    </main>
  );
}
