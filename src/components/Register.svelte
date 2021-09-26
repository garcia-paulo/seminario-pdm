<script>
  import { auth } from "../firebase";
  import { createUserWithEmailAndPassword } from "firebase/auth";

  export let toggleLogin;
  export let authenticate;

  let email = "";
  let password = "";
  let passwordConfirmation = "";
  let error = "";
  let loading = false;
  const enterKeyPress = (e) => {
    if (e.keyCode === 13) register();
  };
  async function register() {
    error = "";
    loading = true;
    if (password !== passwordConfirmation) {
      error = "Senhas não conferem!";
      loading = false;
      return;
    }
    await createUserWithEmailAndPassword(auth, email, password)
      .then((credential) => {
        authenticate(credential.user);
        toggleLogin();
      })
      .catch(() => (error = "Falha ao criar sua conta!"));
    loading = false;
  }
</script>

<main class="d-flex flex-column">
  {#if error}
    <div class="alert alert-danger">{error}</div>
  {/if}
  <h1>Cadastro</h1>
  <label for="email">E-mail:</label>
  <input
    bind:value={email}
    on:keypress={enterKeyPress}
    type="email"
    id="email"
  />
  <label for="password">Senha:</label>
  <input
    bind:value={password}
    on:keypress={enterKeyPress}
    type="password"
    id="password"
  />
  <label for="passwordConfirmation">Confirme sua senha:</label>
  <input
    bind:value={passwordConfirmation}
    on:keypress={enterKeyPress}
    type="password"
    id="passwordConfirmation"
  />
  <div class="d-flex justify-content-around">
    <button on:click={toggleLogin} class="btn btn-primary">VOLTAR</button>
    <button disabled={loading} on:click={register} class="btn btn-success"
      >ENVIAR</button
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
