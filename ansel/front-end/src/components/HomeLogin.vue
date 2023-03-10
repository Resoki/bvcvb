<template>
  <div v-if="!isConnected" class="hello">
    <h1>Login</h1>
    <form class="form-login" @submit.prevent="submitForm($event)">
      <img circle src="http://cdn.onlinewebfonts.com/svg/img_241918.png" />
      <div class="separator"></div>
      <div class="form-group">
        <label for="login">Username</label>
        <input type="text" id="login" v-model="login" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <p v-if="message" class="message">{{ message }}</p>
      <button class="btn">Log in</button>
      <div class="separator"></div>
      <a @click="redirectRegister">Don't have accout? create here</a>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HomeLogin",
  data() {
    return {
      login: "",
      password: "",
      isConnected: false,
      message: "",
    };
  },
  created() {
    if (localStorage.getItem("token")) {
      this.isConnected = true;
    }
  },
  methods: {
    redirectRegister() {
      this.$router.push("/register");
    },
    async submitForm() {
      try {
        await axios
          .post("http://localhost:3000/login", {
            login: this.login,
            password: this.password,
          })
          .then((res) => {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("loginUser", this.login);
            this.isConnected = true;
            this.$router.go("/");
          })
          .catch((err) => {
            if (!this.login.length && !this.password.length) {
              this.message = "Login & Password missing!";
              return setTimeout(() => this.message = "", 800);
            }
            if (!this.login.length) {
              this.message = "Login missing!";
              return setTimeout(() => this.message = "", 800);
            }
            if (!this.password.length) {
              this.message = "Password missing!";
              return setTimeout(() => this.message = "", 800);
            }
            if (err.response.status === 401) {
              this.message = "Incorrect username or password !";
              setTimeout(() => this.message = "", 800);
            }
          });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  margin-top: 10px;
  color: #906de9ad;
  cursor: pointer;
}

.message {
  color: red;
}

img {
  width: 60px;
  margin-bottom: 10px;
}
</style>
