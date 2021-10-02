<script>
  import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
  import { db } from "../firebase";

  let quotes = [];
  const deleteQuote = async (id) => {
    quotes = quotes.filter((quote) => quote.id !== id);
    await deleteDoc(doc(db, "quotes", id));
  };

  const getQuotes = async () => {
    const querySnapshot = await getDocs(collection(db, "quotes"));
    querySnapshot.forEach((doc) => {
      quotes = [...quotes, { data: doc.data(), id: doc.id }];
    });
  };
  getQuotes();
</script>

<main>
  <table
    class="table table-striped table-light table-hover my-table table-borderless mt-5"
  >
    <thead>
      <tr>
        <th> Usuario </th>
        <th> Citação </th>
        <th> Autor </th>
      </tr>
      <tr />
    </thead>
    <tbody>
      {#each quotes as quote}
        <tr>
          <td>{quote.data.user}</td>
          <td>{quote.data.quote}</td>
          <td>{quote.data.author}</td>
          <td><span on:click={deleteQuote(quote.id)}>🗑️</span></td>
        </tr>
      {/each}
    </tbody>
  </table>
</main>

<style>
  .my-table {
    border-radius: 15px;
  }
  span {
    cursor: pointer;
  }
</style>
