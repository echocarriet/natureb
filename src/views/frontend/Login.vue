<template>
  <div class="container vh-100">
    <form class="row justify-content-center align-items-center h-100" @submit.prevent="signIn">
      <div class="col-md-6">
        <h1 class="h2 text-center fw-bold py-3">後台登入頁面</h1>
        <div class="form-floating mb-3">
          <input
            type="email"
            class="form-control"
            id="username"
            placeholder="name@example.com"
            v-model="user.username"
            required
          />
          <label for="username">登入帳號</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
            v-model="user.password"
            required
          />
          <label for="password">密碼</label>
        </div>
        <button type="submit" class="btn btn-warning btn-lg w-100">登入</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  inject: ['$httpMessageState'],
  methods: {
    signIn() {
      const api = `${process.env.VUE_APP_API}/admin/signin`;
      this.$http
        .post(api, this.user)
        .then((response) => {
          if (response.data.success) {
            const { token, expired } = response.data;
            document.cookie = `carrieHexToken=${token}; expires=${new Date(expired)};`;
            this.$httpMessageState(response, '登入結果');
            this.$router.push('/admin');
          } else {
            this.$httpMessageState(response, '登入結果');
            console.log(response.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
