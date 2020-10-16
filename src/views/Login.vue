<template>
  <div class="login-main">
    <section class="container">
      <div class="columns is-multiline">
        <div class="column is-8 is-offset-2 login-panel">
          <div class="columns">
            <div class="column left">
              <h1 class="title is-1">Welcome to Mailcow!</h1>
              <h2 class="subtitle colored is-4">
                Easy way of manage your emails
              </h2>
              <p>Mailcow is a Docker based email server which provides an elegant web interface for managing domains</p>
            </div>
            <div class="column right has-text-centered">
              
              <img width="60" src="https://www.debinux.de/256.png" alt="MailCow"/>
              <p class="description">Login mailcow</p>
              <form>
                <div class="field">
                  <div class="control">
                    <input class="input is-medium" type="text" placeholder="Email address">
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <input class="input is-medium" type="email" placeholder="Password">
                  </div>
                </div>
                <button class="button is-block is-primary is-fullwidth is-medium">Login</button>
                <br />
                <small><em>Forget my password?</em></small>
              </form>
            </div>
          </div>
        </div>
        <div class="column is-8 is-offset-2">
          <br>
          <nav class="level">
            <div class="level-left">
              <div class="level-item">
                <span class="icon">
                  <i class="fab fa-twitter"></i>
                </span> &emsp;
                <span class="icon">
                  <i class="fab fa-facebook"></i>
                </span> &emsp;
                <span class="icon">
                  <i class="fab fa-instagram"></i>
                </span> &emsp;
                <span class="icon">
                  <i class="fab fa-github"></i>
                </span> &emsp;
                <span class="icon">
                  <i class="fas fa-envelope"></i>
                </span>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </section>
  </div>
</template>
