<template>
  <div class="hello">
    <button class="btn" @click="home">Home</button>
    <button class="btn-logout" @click="logout">Logout</button>
    <div v-if="isConnected">
      <div class="profile">
        <h2>Profil of @{{ data.login }}</h2>
        <img
          :src="data.dataDisplay"
          name="photo"
          @change="editData"
          v-if="data.dataDisplay"
        />
        <div class="file-input-container">
          <input
            type="file"
            id="fileInput"
            name="fileInput"
            class="file-input"
          />
          <label for="fileInput" class="file-label">
            <i class="fa fa-cloud-upload"></i> Sélectionnez un fichier
          </label>
        </div>

        <p v-if="isSymfony" class="category">Symfony Member</p>
        <p v-else class="category">Node JS Member</p>
        <hr />
        <ul>
          <li>
            <span>Firsname:</span> {{ data.firstname }}
            <input
              class="input-style"
              type="text"
              v-if="isOpenEditFirstname"
              v-model="data.firstname"
              @change="editData"
              :placeholder="data.firstname"
            />
          </li>
          <li>
            <span>Lastname:</span> {{ data.lastname }}
            <input
              class="input-style"
              type="text"
              v-if="isOpenEditLastname"
              v-model="data.lastname"
              @change="editData"
              :placeholder="data.lastname"
            />
          </li>
          <li>
            <span>Gender:</span> {{ data.gender }}
            <input
              class="input-style"
              type="text"
              v-if="isOpenEditGender"
              v-model="data.gender"
              @change="editData"
              :placeholder="data.gender"
            />
          </li>
          <li>
            <span>Acount create:</span>
            {{ new Date(data.date).toLocaleDateString() }}
          </li>
        </ul>
      </div>

      <div class="feed-post" v-for="(post, index) in newTab" :key="index">
        <CardProfil
          v-if="post.login === data.login"
          :img="`http://localhost:3000/${post.photo}`"
          :photoUser="`http://localhost:3000/${post.userPhoto}`"
          :comments="post.comments"
          :seeComments="addComment"
          :title="post.title"
          :author="post.login"
          :date="post.id"
          @valueContent="handleContent"
          @id-selected="handleId"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CardProfil from "../components/CardProfil.vue";
export default {
  name: "ProfilOther",
  components: { CardProfil },
  data() {
    return {
      isConnected: false,
      isOpenEditMenu: false,
      isOpenEditFirstname: false,
      isOpenEditLastname: false,
      isOpenEditGender: false,
      contentHere: "",
      comments: [],
      posts: [],
      isOpenEditEmail: false,
      idSelected: 0,
      newTab: [],
      formatedDate: "",
      photoName: "",
      photoNameComment: "",
      photoUser: "",
      data: {
        lastname: "",
        firstname: "",
        login: "",
        gender: "",
        category: "",
        email: "",
        photo: null,
        date: "",
        dataDisplay: "",
        posts: [],
      },
    };
  },
  created() {
    if (localStorage.getItem("token")) {
      this.isConnected = true;

      this.getAllPosts();
    }

    const userSee = localStorage.getItem("seeProfilUser");

    // const username = localStorage.getItem("loginUser");
    axios
      .get(`http://localhost:3000/profile/${userSee}`)
      .then((res) => {
        this.data.firstname = res.data.firstname;
        this.data.lastname = res.data.lastname;
        this.data.login = res.data.login;
        this.data.gender = res.data.gender;
        this.data.email = res.data.email;
        this.data.category = res.data.category;
        this.data.photo = res.data.photo;
        this.data.date = res.data.date;
        this.data.dataDisplay = `http://localhost:3000/${res.data.photo}`;
      })
      .catch((err) => {
        console.log("err", err);
      });

    this.formatedDate = this.data.date;
    this.getData();
  },
  methods: {
    async getData() {
      const username = localStorage.getItem("loginUser");
      await axios
        .get(`http://localhost:3000/profile/${username}`)
        .then((res) => {
          this.photoName= res.data.photo;
          this.photoUser = res.data.photo;
        });
    },
    handleContent(value) {
      this.contentHere = value;
    },
    handleId(value) {
      this.idSelected = value;
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
    isSymfony() {
      return this.data.category === "Symfony";
    },
    logout() {
      localStorage.setItem("token", "");
      localStorage.setItem("loginUser", "");
      this.$router.push("/");
    },
    home() {
      this.$router.push("/");
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
        login:  localStorage.getItem("loginUser"),
        photo: this.photoName,
      };
      console.log('obj', obj)
      console.log("posfft", this.photoNameComment);
      console.log("post", post);
      post.comments.push(obj);
      await axios
        .put("http://localhost:3000/add/post", post)
        .then(() => {
          setTimeout(() => this.getAllPosts(), 200);
        })
        .catch(() => {
          alert("Error during post message !");
        });
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

.input-style {
  margin-left: 12px;
  width: 100px;
  height: 4px;
}

.edit-menu input {
  margin-top: 10px;
}

.edit-btn {
  margin-left: 10px;
  border-radius: 12px;
  cursor: pointer;
}

.edit-btn img {
  width: 18px;
}

img {
  width: 180px;
  border-radius: 23px;
}

input[type="file"] {
  margin: 0 auto;
}

.file-input-container {
  position: relative;
}

.file-input {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.file-label {
  display: inline-block;
  margin: 0 auto;
  background-color: #4caf50;
  color: white;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 150px;
  height: 15px;
}

.file-label:hover {
  background-color: #3e8e41;
}

.canvas {
  max-width: 200px;
  max-height: 200px;
  border-radius: 50%;
  margin-top: 20px;
}
</style>
