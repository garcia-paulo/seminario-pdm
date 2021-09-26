<script>
  import { auth } from "../firebase";
  import { signInWithEmailAndPassword } from "firebase/auth";

  export let authenticate;

  let email = "";
  let password = "";
  let error = "";
  let loading = false;

  const enterKeyPress = (e) => {
    if (e.keyCode === 13) login();
  };
  const login = async () => {
    error = "";
    loading = true;
    await signInWithEmailAndPassword(auth, email, password)
      .then((credential) => {
        authenticate(credential.user);
      })
      .catch(() => (error = "Não foi possível realizar o login."));
    loading = false;
  };
  export let toggleLogin;
</script>

<main class="d-flex flex-column">
  {#if error}
    <div class="alert alert-danger">{error}</div>
  {/if}
  <h1>Login</h1>
  <label for="email">E-mail:</label>
  <input
    bind:value={email}
    on:keypress={enterKeyPress}
    type="text"
    id="email"
  />
  <label for="password">Senha:</label>
  <input
    bind:value={password}
    on:keypress={enterKeyPress}
    type="password"
    id="password"
  />
  <div class="d-flex justify-content-around">
    <button on:click={toggleLogin} class="btn btn-primary">CADASTRO</button>
    <button disabled={loading} on:click={login} class="btn btn-success"
      >LOGIN</button
    >
  </div>
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
