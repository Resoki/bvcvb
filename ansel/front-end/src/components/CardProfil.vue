<template>
  <div class="card">
    <div class="user-info">
      <img class="img-user" :src="photoUser" alt="Card Image" />
      <p class="author" @click="goToProfil">@{{ author }}</p>
      <p class="ilya">{{ formData(date) }}</p>
      <span v-if="likeCount" class="like-count" @click="openListLike()"
        >{{ likeCount.length }}
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/001/188/163/small/heart.png"
          alt="Card Image"
          style="width: 30px"
      /></span>
    </div>
    <div class="separator" />
    <h2 class="card-title">{{ title }}</h2>
    <div class="card-content">
      <img :src="img" alt="Card Image" />
      <div v-if="isOpenListLike">
        <div class="comment-list" v-for="(el, index) in likeCount" :key="index">
          <p>{{ el.login }}</p>
        </div>
      </div>
      <button @click="clickLike" class="button-like">Like</button>
      <span class="like-add-btn" v-if="likeCount" @click="clickLike"
        >{{ likeCount.length }}
        <img
          v-if="userHasLike"
          src="https://static.vecteezy.com/system/resources/thumbnails/001/188/163/small/heart.png"
          alt="Card Image"
          style="width: 40px; height: 30px"
      /></span>
      <p :v-if="userHasLike">LIKE</p>
      <button @click="openMenuComments" class="comment-button">
        Voir les commentaires <span>({{ comments.length }})</span>
      </button>

      <div v-if="isOpenMenuComments" class="comment-menu">
        <h2>{{ comments.length }} commentaires</h2>
        <div class="separator"></div>
        <div
          class="comment-list"
          v-for="(comment, index) in comments"
          :key="index"
        >
          <div class="comment-user">
            <img
              :src="`http://localhost:3000/${comment.photo}`"
              alt="Photo de profil du commentateur"
              class="comment-user__photo"
            />
            <span
              @click="goToProfilFromCom(comment.login)"
              class="comment-user__name author"
              >{{ comment.login }}</span
            >
            <span class="comment-details__date">{{
              formData(comment.date)
            }}</span>
          </div>
          <div class="comment-content">
            <p class="comment-content__text">{{ comment.content }}</p>

            <div class="separator"></div>
          </div>
        </div>
        <div class="comment-form">
          <input
            type="text"
            v-model="valueContent"
            @change="addComment()"
            placeholder="Ajouter un commentaire..."
            class="comment-form__input"
          />
          <button @click="seeComments" class="comment-form__submit">
            Envoyer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
export default {
  name: "HomeLogin",
  props: {
    title: String,
    img: String,
    author: String,
    date: Number,
    photoUser: String,
    likeCount: Array,
    comments: Array,
    seeComments: Function,
    clickLike: Function,
    value: String,
  },
  data() {
    return {
      login: "",
      userHasLike: false,
      password: "",
      dateFormatted: "",
      dateFormattedComment: "",
      isConnected: false,
      isOpenMenuComments: false,
      valueContent: "",
      isOpenListLike: false,
    };
  },
  created() {
    this.userHasLikePost(this.date);
  },
  methods: {
    async userHasLikePost(id) {
      const username = localStorage.getItem("loginUser");
      await axios
        .get(`http://localhost:3000/checking/like/${id}/${username}`)
        .then((res) => {
          if (res.status === 200) {
            return (this.userHasLike = true);
          }
          return (this.userHasLike = false);
        })
        .catch(() => {});
    },
    openMenuComments() {
      this.isOpenMenuComments = !this.isOpenMenuComments;
    },
    goToProfil() {
      localStorage.setItem("seeProfilUser", this.author);
      location.assign("/seeprofil");
    },
    goToProfilFromCom(login) {
      console.log("setitem", login);

      localStorage.setItem("seeProfilUser", login);
      location.assign("/seeprofil");
    },
    formData(value) {
      if (value) {
        const now = moment();
        const diff = moment.duration(now.diff(moment(value)));
        if (diff.asSeconds() < 60) {
          return `Il y a ${Math.floor(diff.asSeconds())}s`;
        } else if (diff.asMinutes() < 60) {
          return `Il y a ${Math.floor(diff.asMinutes())}m`;
        } else if (diff.asHours() < 24) {
          return `Il y a ${Math.floor(diff.asHours())}h`;
        } else if (diff.asDays() < 30) {
          return `Il y a ${Math.floor(diff.asDays())}j`;
        } else if (diff.asMonths() < 12) {
          return `Il y a ${Math.floor(diff.asMonths())}m`;
        } else {
          return `Il y a ${Math.floor(diff.asYears())}y`;
        }
      }
    },
    openListLike() {
      this.isOpenListLike = !this.isOpenListLike;
      console.log(this.isOpenListLike);
    },
    addComment() {
      this.$emit("id-selected", this.date);
      this.$emit("valueContent", this.valueContent);
    },
  },
};
</script>

<style scoped>
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

.user-info {
  display: flex;
  align-items: center; /* pour centrer verticalement les éléments si nécessaire */
}

.like-add-btn img {
  border: none;
}

.like-add-btn img:hover {
  filter: grayscale(0) saturate(2) hue-rotate(180deg);
}

.comment-button {
  background-color: #2196f3;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.button-like {
  background-color: #501515;
  color: #000000;
  border: 1px solid rgb(0, 0, 0);
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 15px;
}

.comment-button span {
  font-weight: bold;
}

.ilya {
  color: rgb(175, 175, 175);
  font-size: 12px;
}

.comment-menu {
  margin-top: 24px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 16px;
}

.comment-list__photo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 16px;
}

.comment-user {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.comment-user__photo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0;
}

.comment-user__name {
  font-weight: bold;
  margin-right: 8px;
  color: white;
  margin-left: 5px;
}

.comment-content__text {
  margin: 0;
  font-size: 16px;
  line-height: 24px;
}

.comment-details__date {
  font-size: 12px;
  color: #888;
}

.comment-form__input {
  width: 80%;
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 8px;
}

.comment-form__submit {
  background-color: #2196f3;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>