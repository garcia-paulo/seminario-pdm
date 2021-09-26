<script>
  import Login from "./components/Login.svelte";
  import Details from "./components/Details.svelte";
  import Register from "./components/Register.svelte";
  import Tittle from "./components/Title.svelte";
  import Edit from "./components/Edit.svelte";

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
</main>

<style>
  :global(body) {
    background: #000000;
    background: linear-gradient(to top right, #434343, #000000);
    height: 100vh;
  }
  main {
    margin: 0 auto;
  }
</style>
