<script>
  import { auth } from "../firebase";
  import {
    signOut,
    updateEmail,
    updatePassword,
    deleteUser,
  } from "firebase/auth";

  export let authenticated;
  export let unauthenticate;

  let email = authenticated.email;
  let password = "";
  let passwordConfirmation = "";
  let error = "";
  let loading = false;
  let message = "";

  const enterKeyPress = (e) => {
    if (e.keyCode === 13) console.log("EDITAR EMAIL");
  };
  const logout = async () => {
    error = "";
    loading = true;
    await signOut(auth)
      .then(() => {
        unauthenticate();
      })
      .catch(() => {
        error = "Falha ao sair!";
      });
    loading = false;
  };
  async function deleteAccount() {
    error = "";
    loading = true;
    await deleteUser(auth.currentUser)
      .then(() => {
        unauthenticate();
      })
      .catch(() => {
        error = "Não foi possível deletar o usuário!";
      });
    loading = false;
  }
  async function edit() {
    error = "";
    loading = true;
    if (email !== authenticated.email) {
      await updateEmail(auth.currentUser, email)
        .then(() => (message = "Perfil atualizado com sucesso!"))
        .catch(() => (error = "Falha ao atualizar perfil!"));
    }
    if (password.trim()) {
      if (password === passwordConfirmation) {
        await updatePassword(auth.currentUser, password)
          .then(() => (message = "Perfil atualizado com sucesso!"))
          .catch(() => (error = "Falha ao atualizar perfil!"));
      } else {
        error = "Senhas não conferem!";
      }
    }
    loading = false;
  }
</script>

<main class="d-flex flex-column">
  {#if message}
    <div class="alert alert-success">{message}</div>
  {/if}
  {#if error}
    <div class="alert alert-danger">{error}</div>
  {/if}
  <h1>Editar perfil</h1>
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
    placeholder="Deixe em branco para não alterar"
  />
  <label for="passwordConfirmation">Confirme sua senha:</label>
  <input
    bind:value={passwordConfirmation}
    on:keypress={enterKeyPress}
    type="password"
    id="passwordConfirmation"
    placeholder="Deixe em branco para não alterar"
  />
  <div class="d-flex justify-content-around">
    <button on:click={logout} disabled={loading} class="btn btn-primary"
      >LOGOUT</button
    >
    <button on:click={deleteAccount} disabled={loading} class="btn btn-danger"
      >DELETAR CONTA</button
    >
    <button on:click={edit} disabled={loading} class="btn btn-success"
      >EDITAR</button
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
