<template>
  <div class="search-container">
    <span class="search-bar">
      <input
        type="text"
        v-model="username"
        @input="clickSearch()"
        :placeholder="value"
        class="search-input"
      />
      <img
        src="https://pluspng.com/img-png/search-button-png-search-icon-this-icon-is-supposed-to-represent-a-magnifying-glass-it-s-a-large-png-50-px-1600.png"
      />
    </span>
  </div>
    <div class="feed-post" v-for="(post, index) in displayFound" :key="index">
    <div class="user-info">
      <img class="img-user" :src="`http://localhost:3000/${post.photo}`" alt="Card Image" />
      <p class="" @click="goToProfil(post.login)">@{{ post.login }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SearchBar",
  props: {
    value: String,
  },
  data() {
    return {
      username: "",
      authorFound: "",
      photoAuthorFound: "",
      displayFound: [],
      foundItems: [],
      foundItem: false,
    };
  },
  methods: {
    async clickSearch() {
      this.displayFound = [];
      await axios
        .get(`http://localhost:3000/users/${this.username}`)
        .then((res) => {
          res.data.forEach((data) => {
              let obj = {login: data.login, photo: data.photo}
              this.displayFound.push(obj)
          })
          this.authorFound = res.data.login;
          this.photoAuthorFound = `http://localhost:3000/${res.data.photo}`;
          if (res.length) this.foundItem = true;
        });
    },

    goToProfil(login) {
      this.displayFound = [];
      localStorage.setItem("seeProfilUser", login);
      location.assign("/seeprofil");
    },
  },
};
</script>
<style scoped>
.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.search-input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  width: 300px;
  max-width: 100%;
  text-align: center;
}
.img-user {
  width: 50px;
  border-radius: 50%;
  object-fit: cover;
}

h2 {
  color: white;
}

p {
  color: white;
  font-weight: bold;
  margin-left: 10px;
}

.author:hover {
  color: grey;
  cursor: pointer;
}

span.like-count {
  display: flex;
  justify-content: center;
  align-items: center;
}

.like-count {
  color: white;
  margin-left: 20px;
  cursor: pointer;
}

.like-count img {
  color: white;
  margin-left: 7px;
  cursor: pointer;
}

.search-bar {
  position: relative;
}

.search-bar img {
  width: 33px;
  position: absolute;
  top: 5px;
  left: 4px;
}

.user-info {
  display: flex;
  align-items: center; /* pour centrer verticalement les éléments si nécessaire */
  justify-content: center;
  border: 1px solid white;
  border-radius: 12px;
  width: 250px;
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 10px;
  background-color: rgba(62, 19, 172, 0.6784313725);
}

.user-info:hover {
  background-color: rgba(91, 46, 205, 0.678);
  cursor: pointer;
}
</style>