import Head from "next/head";
import styles from "../styles/Home.module.css";
import InsertionSort from "../components/InsertionSort";

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Visualized Sort Algorithm</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Visualized Sort Algorithm</h1>

        <InsertionSort />
      </main>
    </div>
  );
};

export default Home;
