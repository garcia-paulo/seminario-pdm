<script>
  import Login from "./components/Login.svelte";
  import Details from "./components/Details.svelte";
  import Register from "./components/Register.svelte";
  import Tittle from "./components/Title.svelte";
  import Edit from "./components/Edit.svelte";
  import Table from "./components/Table.svelte";

  let loginTab = true;
  let authenticated;

  const toggleLogin = () => {
    loginTab = !loginTab;
  };
  const authenticate = (user) => {
    authenticated = user;
  };
  const unauthenticate = () => {
    authenticated = null;
  };
</script>

<main class="container">
  <Tittle />
  <div class="row">
    <div class="col">
      {#if authenticated}
        <Edit {authenticated} {unauthenticate} />
      {:else if loginTab}
        <Login {toggleLogin} {authenticate} />
      {:else}
        <Register {toggleLogin} {authenticate} />
      {/if}
    </div>
    <div class="col">
      <Details {authenticated} />
    </div>
  </div>
  {#if authenticated}
    <Table />
  {/if}
</main>

<style>
  :global(html) {
    height: 100%;
  }

  :global(body) {
    background: #000000;
    background: linear-gradient(to top right, #434343, #000000);
    background-repeat: no-repeat;
    background-attachment: fixed;
    height: 100%;
  }
  main {
    margin: 0 auto;
  }
</style>
