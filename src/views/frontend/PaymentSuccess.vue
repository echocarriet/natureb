<template>
  <div class="container">
    <h1 class="logoText position-absolute" style="z-index:1; ">
      <router-link class="h3 text-white fw-bold mb-0" to="/">natureB</router-link>
    </h1>
  </div>
  <header class="position-relative">
    <img
      class="bg-mask-50 img-cover pageBanner w-100"
      src="@/assets/stylesheets/images/paymentSuccess.jpg"
      alt="購物車banner"
    />
    <h2 class="position-absolute text-hv-center h2 fw-bold text-white pageBanner-text">
      Thank You
    </h2>
  </header>
  <div class="container py-7 py-md-9">
    <h2 class="h3 fw-bold text-center">訂單完成</h2>
    <p class="text-secondary text-center mb-6">
      感謝您的購買，今日下單，5 天出貨<br />
      <span>( 不含下單當天、例假日、離島。)</span>
    </p>
    <div class="border border-brown-400 rounded bg-white py-7 px-3 mb-8">
      <h3 class="h4 fw-bold border-bottom text-center pb-3 px-2 mb-7">訂單明細</h3>
      <div class="row">
        <div class="col-md-6">
          <table class="table table-striped">
            <tbody>
              <tr v-for="item in order.products" :key="item" class="align-middle">
                <td class="border-0">
                  <img
                    :src="item.product.imageUrl"
                    :alt="item.product.title"
                    style="width:100px;"
                  />
                </td>
                <td class="border-0">
                  <p class="mb-2 mb-md-0">{{ item.product.title }}</p>
                  <p class="h6 text-secondary">
                    價錢 : NT ${{ $filters.currency(item.product.price) }}
                  </p>
                </td>
                <td class="border-0">
                  <p class="h6">x {{ item.qty }}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-md-6 d-md-flex flex-md-column justify-content-md-center">
          <hr class="d-block d-md-none my-6 my-md-0" style="z-index:15;" />
          <table class="table">
            <tbody>
              <tr>
                <th class="fw-normal border-0">訂單編號</th>
                <td class="text-secondary fw-normal border-0">{{ orderId }}</td>
              </tr>
              <tr>
                <th class="fw-normal  border-0">姓名</th>
                <td class="text-secondary fw-normal border-0">{{ order.user.name }}</td>
              </tr>
              <tr>
                <th class="fw-normal  border-0">電話</th>
                <td class="text-secondary fw-normal border-0">{{ order.user.tel }}</td>
              </tr>
              <tr>
                <th class="fw-normal  border-0">信箱</th>
                <td class="text-secondary fw-normal border-0">{{ order.user.email }}</td>
              </tr>
              <tr>
                <th class="fw-normal  border-0">地址</th>
                <td class="text-secondary fw-normal border-0">{{ order.user.address }}</td>
              </tr>
              <tr>
                <th class="fw-normal  border-0">付款方式</th>
                <td class="text-secondary fw-normal border-0">{{ order.user.payment }}</td>
              </tr>
              <tr>
                <th class="fw-normal  border-0">留言</th>
                <td class="text-secondary fw-normal border-0">{{ order.message }}</td>
              </tr>
              <tr>
                <th class="fw-normal  border-0">付款狀態</th>
                <td class="text-secondary fw-normal border-0">
                  <span v-if="order.is_paid">已付款</span>
                  <span v-else class="text-danger">尚未付款</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="text-center">
      <router-link class="btn btn-warning text-white" to="/products">繼續選購</router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      order: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
          payment: '',
        },
      },
      orderId: '',
    };
  },
  methods: {
    // 取得訂單列表 API
    getOrder() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${this.orderId}`;
      this.isLoading = true;
      this.$http
        .get(url)
        .then((response) => {
          if (response.data.success) {
            this.order = response.data.order;
            this.isLoading = false;
          } else {
            this.$swal({
              title: `<p class="h4"> ${response.data.data.product.title}</p>`,
              icon: 'error',
            });
          }
        })
        .catch((err) => {
          this.$swal({
            title: `<p class="h4">${err} 發生錯誤，請重新整理頁面</p>`,
            icon: 'error',
          });
        });
    },
  },
  mounted() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
  },
};
</script>
