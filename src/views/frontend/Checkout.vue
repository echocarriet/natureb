<template>
  <div class="container py-6 py-md-8">
    <Loading :active="isLoading" :z-index="1060"></Loading>
    <h1 class="logoText pb-2 mb-6 border-bottom">
      <router-link class="h3 fw-bold mb-0" to="/">natureB</router-link>
    </h1>
    <div class="row">
      <div class="col-md-6">
        <h2 class="h4 fw-bold mb-4 mb-md-6">訂單清單</h2>
        <table class="table table-striped mb-4 mb-md-6">
          <tbody>
            <tr v-for="item in order.products" :key="item" class="align-middle">
              <td>
                <img :src="item.product.imageUrl" :alt="item.product.title" style="width:100px;" />
              </td>
              <td>
                <p class="mb-2 mb-md-0">{{ item.product.title }}</p>
                <p class="h6">數量 : {{ item.qty }}</p>
                <p class="d-table-cell d-lg-none">
                  NT ${{ $filters.currency(item.product.price * item.qty) }}
                </p>
              </td>
              <td class="text-center d-none d-lg-table-cell">
                NT ${{ $filters.currency(item.product.price * item.qty) }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="border-0">
                <p class="h4 fw-bold text-end mb-3">
                  總金額 : NT ${{ $filters.currency(order.total) }}
                </p>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="col-md-6">
        <hr class="d-block d-md-none my-6 my-md-0" />
        <h2 class="h4 fw-bold mb-4 mb-md-6">收件資訊</h2>
        <table class="table border border-brown-400 rounded">
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
    <hr />
    <!-- 無串接金流，按下後自動付款成功 -->
    <div class="text-center">
      <button class="btn btn-warning btn-lg" v-if="!order.is_paid" @click="payOrder">
        確認結帳
      </button>
      <button
        class="btn btn-primary text-white btn-lg"
        v-else
        @click="$router.push('/products')"
      >
        繼續購物
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLoading: false,
      order: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
          payment: '',
        },
      },
      price: '',
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
            console.log(response.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 結帳付款
    payOrder() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`;
      this.isLoading = true;
      this.$http
        .post(url)
        .then((response) => {
          if (response.data.success) {
            this.$swal({
              title: `<p class="h4">${response.data.message}</p>`,
              icon: 'success',
            });
            this.$router.push(`/paymentsuccess/${this.orderId}`);
            this.getOrder();
          } else {
            this.$swal({
              title: `<p class="h4">${response.data.message}</p>`,
              icon: 'error',
            });
          }
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
  },
};
</script>
<style lang="scss">
.logoText {
  font-family: 'Playfair Display';
  font-size: 40px;
}
</style>
