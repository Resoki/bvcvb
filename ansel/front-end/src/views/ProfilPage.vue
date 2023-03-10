<template>
  <div class="hello">
    <button class="btn" @click="home">Home</button>
    <button class="btn-logout" @click="logout">Logout</button>
    <div v-if="isConnected">
      <div class="profile">
        <h2>Ton profil - @{{ data.login }}</h2>
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
            @change="handleFileUpload"
          />
          <label for="fileInput" class="file-label">
            <i class="fa fa-cloud-upload"></i> Sélectionnez un fichier
          </label>
        </div>

        <p v-if="isSymfony" class="category">Symfony Member</p>
        <p v-if="!isSymfony" class="category">Node JS Member</p>
        <hr />
        <ul>
          <li>
            <span>Prenom:</span> {{ data.firstname }}
            <button class="edit-btn" @click="openEditFirstname">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png"
              />
            </button>
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
            <span>Nom de famille:</span> {{ data.lastname }}
            <button class="edit-btn" @click="openEditLastname">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png"
              />
            </button>
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
            <span>Genre:</span> {{ data.gender }}
            <button class="edit-btn" @click="openEditGender">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png"
              />
            </button>
            <input
              class="input-style"
              type="text"
              v-if="isOpenEditGender"
              v-model="data.gender"
              @change="editData"
              :placeholder="data.gender"
            />
          </li>
          <li><span>Email:</span> {{ data.email }}</li>
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
          :title="post.title"
          :seeComments="addComment"
          :likeCount="post.likesListUser"
          :clickLike="() => addLike(post.id, post.likesListUser)"
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
  name: "ProfilPage",
  components: { CardProfil },
  data() {
    return {
      isConnected: false,
      isOpenEditMenu: false,
      isOpenEditFirstname: false,
      isOpenEditLastname: false,
      isOpenEditGender: false,
      posts: [],
      isOpenEditEmail: false,
      newTab: "",
      formatedDate: "",
      comments: [],
      photoName: "",
      photoNameComment: "",
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
    this.getData();
    if (localStorage.getItem("token")) {
      this.isConnected = true;

      this.getAllPosts();
    }

    const username = localStorage.getItem("loginUser");
    axios
      .get(`http://localhost:3000/profile/${username}`)
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
    async addComment() {
      const post = {
        comments: this.comments,
        post: this.idSelected,
      };

      let idDate = Date.now();
      let obj = {
        content: this.contentHere,
        date: idDate,
        login: localStorage.getItem("loginUser"),
        photo: this.photoNameComment,
      };
      post.comments.push(obj);
      await axios
        .put("http://localhost:3000/add/post", post)
        .then(() => {
          this.comments = [];
          return setTimeout(() => this.getAllPosts(), 200);
        })
        .catch(() => {
          alert("Error during post message !");
        });
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
    editData() {
      const data = {
        firstname: this.data.firstname,
        lastname: this.data.lastname,
        login: this.data.login,
        gender: this.data.gender,
        photo: this.data.photo,
      };
      const username = localStorage.getItem("loginUser");
      axios
        .put(`http://localhost:3000/profile/${username}`, data)
        .then((res) => {
          console.log("res::", res);
          this.data.firstname = res.data.firstname;
          this.data.lastname = res.data.lastname;
          this.data.login = res.data.login;
          this.data.gender = res.data.gender;
          this.data.email = res.data.email;
          this.data.category = res.data.category;
          this.data.photo = res.data.photo;
        })
        .catch((err) => {
          console.log("err", err);
        });

      setTimeout(() => {
        this.isOpenEditFirstname = false;
        this.isOpenEditLastname = false;
        this.isOpenEditGender = false;
        this.isOpenEditEmail = false;
      }, 800);
    },
    openEditFirstname() {
      this.isOpenEditFirstname = !this.isOpenEditFirstname;
    },
    openEditLastname() {
      this.isOpenEditLastname = !this.isOpenEditLastname;
    },
    openEditEmail() {
      this.isOpenEditEmail = !this.isOpenEditEmail;
    },
    openEditGender() {
      this.isOpenEditGender = !this.isOpenEditGender;
    },
    isSymfony() {
      return this.data.category === "Symfony";
    },
    logout() {
      localStorage.setItem("token", "");
      localStorage.setItem("loginUser", "");
      this.$router.push("/");
    },
    handleContent(value) {
      console.log("value emit", value);
      this.contentHere = value;
    },
    handleId(value) {
      console.log("id emit", value);
      this.idSelected = value;
    },
    home() {
      this.$router.push("/");
    },
    async handleFileUpload(event) {
      const file = event.target.files[0];
      console.log("e", event.target.files);

      if (!file) {
        return;
      }
      this.data.photo = file.name;
      const formData = new FormData();
      formData.append("file", file);

      axios.post("http://localhost:3000/upload", formData).then((res) => {
        console.log("photo save", res);
      });

      this.editData();
      this.$router.go("/profil");
    },

    async addLike(id, liketab) {
        this.likesListUser = [];
      const username = localStorage.getItem("loginUser");
      const post = {
        likesListUser: liketab,
        id: id,
      };

      let obj = {
        login: username,
      };
      console.log(post);
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
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
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
