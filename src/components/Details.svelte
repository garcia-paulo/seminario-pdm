<script>
  import { db } from "../firebase";
  import { collection, addDoc } from "firebase/firestore";

  export let authenticated;
  let author = "";
  let quote = "";
  let error = "";
  let loading = false;

  const enterKeyPress = (e) => {
    if (e.keyCode === 13) addQuote();
  };
  const addQuote = async () => {
    error = "";
    loading = true;

    if (!quote.trim() || !author.trim()) {
      error = "Erro ao adicionar citação!";
      return;
    }

    const docRef = await addDoc(collection(db, "quotes"), {
      author: author,
      quote: quote,
      user: authenticated.email,
    })
      .then(() => {
        author = "";
        quote = "";
      })
      .catch((e) => {
        error = "Erro ao adicionar citação!";
      });
    loading = false;
  };
</script>

<main class="d-flex flex-column">
  {#if authenticated}
    {#if error}
      <div class="alert alert-danger">{error}</div>
    {/if}
    <h1>Adicionar citação</h1>
    <label for="author">Autor:</label>
    <input
      bind:value={author}
      on:keypress={enterKeyPress}
      type="text"
      id="author"
    />
    <label for="message">Mensagem:</label>
    <input
      bind:value={quote}
      on:keypress={enterKeyPress}
      type="text"
      id="message"
    />
    <div class="d-flex justify-content-center">
      <button on:click={addQuote} class="btn btn-success">ADICIONAR</button>
    </div>
  {:else}
    <h1>Usuário não está logado.</h1>
  {/if}
</main>

<style>
  main {
    background: white;
    padding: 50px;
    border-radius: 15px;
  }

  label {
    margin-top: 1em;
  }

  button {
    margin-top: 2em;
  }
</style>
