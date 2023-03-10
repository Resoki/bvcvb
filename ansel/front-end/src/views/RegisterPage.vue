<template>
  <div class="hello">
    <h1>Register</h1>
    <form class="form-login" @submit.prevent="submitForm($event)">
      <img
        circle
        src="https://img.icons8.com/pastel-glyph/2x/create-new--v4.png"
      />
      <div class="separator"></div>
      <div class="form-group">
        <label for="login">Username</label>
        <input type="text" id="login" v-model="login" />
      </div>
      <div class="form-group">
        <label for="gender">Gender</label>
        <select id="gender" v-model="gender">
          <option value="M">M</option>
          <option value="F">F</option>
        </select>
      </div>
      <div class="form-group">
        <label for="firstname">Firstname</label>
        <input type="text" id="firstname" v-model="firstname" />
      </div>
      <div class="form-group">
        <label for="lastname">Lastname</label>
        <input type="text" id="lastname" v-model="lastname" />
      </div>
      <div class="form-group">
        <label for="category">Category</label>
        <select id="category" v-model="category">
          <option value="NodeJS">NodeJS</option>
          <option value="Symfony">Symfony</option>
        </select>
      </div>
      <div class="form-group">
        <label for="photo">Photo</label>
        <input type="file" id="photo" @change="handleFileUpload" />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <button class="btn">Register</button>
      <p v-if="message">{{ message }}</p>
      <div class="separator"></div>
      <a @click="backToLogin">Back to login</a>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "RegisterPage",
  data() {
    return {
      email: "",
      password: "",
      login: "",
      gender: "",
      firstname: "",
      lastname: "",
      category: "",
      message: "",
      photo: null,
      date: Date.now(),
      posts: [],
    };
  },
  methods: {
    backToLogin() {
      this.$router.push("/");
    },
    async submitForm() {
      try {
        await axios
          .post("http://localhost:3000/register", {
            login: this.login,
            email: this.email,
            gender: this.gender,
            firstname: this.firstname,
            lastname: this.lastname,
            category: this.category,
            password: this.password,
            photo: this.photo,
            date: this.date,
          })
          .then(() => {
            this.message = "User created successfully!";
            this.$router.go("/");
          })
          .catch((err) => {
            console.log("err", err.response);
            if (err.response.status === 409) {
              this.message =
                "Un membre avec cette adresse email ou ce pseudo existe déjà !";
            } else {
              this.message = "Une erreur a eu lieu!";
            }
          });
      } catch (error) {
        console.error(error);
      }
    },
    async handleFileUpload(event) {
      const file = event.target.files[0];

      if (!file) return;
      this.photo = file.name;
      const formData = new FormData();
      formData.append("file", file);

      axios.post("http://localhost:3000/upload", formData).then((res) => {console.log("photo save", res)});

      console.log(file);
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

img {
  width: 60px;
  margin-bottom: 10px;
}
</style>


