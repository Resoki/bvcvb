<template>
  <div class="hello">
    <button v-if="isConnected" class="btn" @click="profil">Profil</button>
    <button v-if="isConnected" class="btn-logout" @click="logout">
      Logout
    </button>
    <div v-if="isConnected">
      <h2>Bienvenue {{ username }}</h2>
    </div>
    <HomeLogin v-if="!isConnected" />
    <div v-if="isConnected">
      <img
        class="image-head"
        :src="dataDisplay"
        name="photo"
        v-if="dataDisplay"
      />
      <div class="separator"></div>
      <form>
        <textarea
          type="text"
          v-model="title"
          placeholder="Ecris ton poste ici..."
        />
        <input type="file" @change="handlePhoto" />
        <button class="button" @click="addPost">Publier</button>
      </form>
      <h2>Post récents:</h2>
      <div class="separator"></div>
      <div class="feed">
        <div class="feed-post" v-for="(post, index) in newTab" :key="index">
          <CardProfil
            :img="`http://localhost:3000/${post.photo}`"
            :photoUser="`http://localhost:3000/${post.userPhoto}`"
            :comments="post.comments"
            :title="post.title"
            :seeComments="addComment"
            :clickLike="() => addLike(post.id, post.likesListUser)"
            :author="post.login"
            :date="post.id"
            :likeCount="post.likesListUser"
            @valueContent="handleContent"
            @id-selected="handleId"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import HomeLogin from "../components/HomeLogin.vue";
import CardProfil from "../components/CardProfil.vue";
export default {
  name: "HomePage",
  components: { HomeLogin, CardProfil },
  data() {
    return {
      isConnected: false,
      dataDisplay: null,
      title: "",
      photo: "",
      posts: [],
      idSelected: 0,
      idCurrentPost: "",
      photoUser: "",
      contentHere: "",
      userPhoto: "",
      photoNameComment: "",
      comments: [],
      newTab: [],
      likesListUser: [],
      username: localStorage.getItem("loginUser"),
    };
  },
  created() {
    if (localStorage.getItem("token")) {
      this.isConnected = true;
    }
    this.getData();
    this.getAllPosts();
  },
  methods: {
    async getData() {
      const username = localStorage.getItem("loginUser");
      await axios
        .get(`http://localhost:3000/profile/${username}`)
        .then((res) => {
          this.photoNameComment = res.data.photo;
          this.dataDisplay = `http://localhost:3000/${res.data.photo}`;
          this.photoUser = res.data.photo;
        });
    },
    logout() {
      localStorage.setItem("token", "");
      localStorage.setItem("loginUser", "");
      this.$router.go("/");
    },
    handleContent(value) {
      console.log("value emit", value);
      this.contentHere = value;
    },
    handleId(value) {
      console.log("id emit", value);
      this.idSelected = value;
    },
    profil() {
      this.$router.push("/profil");
    },
    async getAllPosts() {
      await axios
        .get(`http://localhost:3000/all/posts`)
        .then((res) => {
          this.posts = [];
          res.data.forEach((el) => {
            this.posts.push(el);
          });
          this.getAllUser();
        })
        .catch((err) => console.log(err));
    },

    async getAllUser() {
      await Promise.all(
        this.posts.map(async (el) => {
          try {
            if (!el) return;
            let i = "";
            await axios
              .get(`http://localhost:3000/profile/${el.login}`)
              .then((res) => {
                i = res.data.photo;
              });
            return { ...el, userPhoto: i };
          } catch (error) {
            console.error(error);
            return el;
          }
        })
      )
        .then((updatedPosts) => {
          this.posts = updatedPosts;
          this.newTab = updatedPosts;
        })
        .catch((err) => console.error(err));
    },

    async handlePhoto(event) {
      const file = event.target.files[0];

      if (!file) {
        return;
      }
      this.photo = file.name;
      const formData = new FormData();
      formData.append("file", file);

      axios.post("http://localhost:3000/upload", formData).then((res) => {
        console.log("photo save", res);
      });
    },
    async addPost() {
      if (!this.title && !this.photoUser) return;
      if (!this.title) {
        return (this.message += "Tu dois rentrer un titre !");
      }
      if (!this.photoUser) {
        return (this.message += "Tu dois rentrer une photo!");
      }
      const post = {
        id: Date.now(),
        title: this.title,
        photo: this.photo,
        login: this.username,
        photoUser: this.photoUser,
        likesListUser: [],
        comments: this.comments,
      };

      await axios
        .post("http://localhost:3000/add/post", post)
        .then(() => {
          alert("Message Posted !");
        })
        .catch((err) => {
          alert("Error during post message !");
          if (err.response.status === 409) {
            this.message =
              "Un membre avec cette adresse email ou ce pseudo existe déjà !";
          } else {
            this.message = "Une erreur a eu lieu!";
          }
        });
    },

    async addComment() {
      const post = {
        comments: this.comments,
        post: this.idSelected,
      };

      let idDate = Date.now();
      let obj = {
        content: this.contentHere,
        date: idDate,
        login: this.username,
        photo: this.photoNameComment,
      };
      console.log("OULA", obj);
      post.comments.push(obj);
      await axios
        .put("http://localhost:3000/add/post", post)
        .then(() => {
          this.comments = [];
          return setTimeout(() => this.getAllPosts(), 200);
        })
        .catch(() => {
          return alert("Error during post message !");
        });
    },
    async addLike(id, likeTab) {
      this.likesListUser = [];
      const post = {
        likesListUser: likeTab,
        id: id,
      };

      let obj = {
        login: this.username,
      };
      post.likesListUser.push(obj);
      await axios
        .put("http://localhost:3000/add/like", post)
        .then(() => {
          return setTimeout(() => this.getAllPosts(), 200);
        })
        .catch(() => {
          return setTimeout(() => this.getAllPosts(), 200);
        });
      return;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

h2 {
  color: white;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

img {
  width: 120px;
  border-radius: 23px;
}

.image-head {
  border-radius: 100px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccd6dd;
  padding: 10px;
  border-radius: 10px;
  width: 50%;
  margin: 0 auto;
  color: white;
  background-color: #2f3239;
}

label {
  font-weight: bold;
  margin: 10px 0;
}

input[type="text"],
textarea {
  border: none;
  border-bottom: 1px solid #ccd6dd;
  padding: 5px;
  margin-bottom: 10px;
  width: 100%;
  font-size: 18px;
  background-color: #464646;
}

input[type="file"] {
  margin-bottom: 20px;
}

.button {
  background-color: #3e13acad;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #906de9ad;
}

.btn {
  background-color: #007bff;
  border: none;
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin-right: 10px;
}

.btn-logout {
  background-color: #dc3545;
  border: none;
  color: white;
  padding: 10px;
  border-radius: 5px;
}

h2 {
  font-size: 24px;
  margin-top: 20px;
  margin-bottom: 10px;
}

textarea {
  width: 100%;
  height: 100px;
  border: none;
  border-radius: 5px;
  padding: 0px;
  margin-bottom: 10px;
}

.button {
  background-color: #007bff;
  border: none;
  color: white;
  padding: 10px;
  border-radius: 5px;
}

.logged {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

.feed {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.feed-post {
  margin: 10px;
  display: flex !important;
  justify-content: center !important;
}
</style>
