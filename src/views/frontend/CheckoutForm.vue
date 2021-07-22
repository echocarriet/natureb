<template>
  <div class="container py-6 py-md-8">
    <Loading :active="isLoading" :z-index="1060"></Loading>
    <h1 class="logoText pb-2 mb-6 border-bottom">
      <router-link class="h3 fw-bold mb-0" to="/">natureB</router-link>
    </h1>
    <div class="row flex-md-row flex-column-reverse">
      <div class="col-md-6">
        <hr class="d-block d-md-none my-6 my-md-0" />
        <h2 class="h4 fw-bold mb-4 mb-md-6">收件資料</h2>
        <Form ref="form" v-slot="{ errors }" @submit="createOrder">
          <div class="mb-3">
            <label for="email" class="form-label h6 text-secondary"
              >信箱 (請填寫常用信箱以追蹤出貨狀態) <span class="text-danger ms-1">*</span>
            </label>
            <Field
              id="email"
              name="信箱"
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors['信箱'] }"
              placeholder="請輸入信箱"
              rules="required"
              v-model="form.user.email"
            ></Field>
            <ErrorMessage name="信箱" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="name" class="form-label h6 text-secondary">
              收件人姓名 <span class="text-danger ms-1">*</span>
            </label>
            <Field
              id="name"
              name="姓名"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['姓名'] }"
              placeholder="請輸入姓名"
              rules="required"
              v-model="form.user.name"
            ></Field>
            <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="tel" class="form-label h6 text-secondary"
              >收件人電話<span class="text-danger ms-1">*</span></label
            >
            <Field
              id="tel"
              name="電話"
              type="tel"
              class="form-control"
              :class="{ 'is-invalid': errors['電話'] }"
              placeholder="請輸入電話"
              rules="required|min:8|max:10"
              v-model="form.user.tel"
            ></Field>
            <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="address" class="form-label h6 text-secondary">
              收件人地址 <span class="text-danger ms-1">*</span>
            </label>
            <Field
              id="address"
              name="地址"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['地址'] }"
              placeholder="請輸入地址"
              rules="required"
              v-model="form.user.address"
            ></Field>
            <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="payment" class="form-label  h6 text-secondary"
              >付款方式<span class="text-danger ms-1">*</span></label
            >
            <Field
              as="select"
              id="payment"
              name="付款方式"
              class="form-select"
              :class="{ 'is-invalid': errors['付款方式'] }"
              rules="required"
              v-model="form.user.payment"
            >
              <option value="" disabled>請選擇付款方式</option>
              <option value="信用卡">信用卡</option>
              <option value="貨到付款">貨到付款</option>
              <option value="ATM 轉帳">ATM 轉帳</option>
            </Field>
            <ErrorMessage name="付款方式" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="message" class="form-label h6 text-secondary">留言</label>
            <textarea
              name=""
              id="message"
              class="form-control"
              cols="30"
              rows="10"
              v-model="form.message"
            ></textarea>
          </div>
          <div class="text-end">
            <router-link class="btn btn-outline-secondary me-4" to="/products"
              >繼續購物</router-link
            >
            <button type="submit" class="btn btn-warning">送出訂單</button>
          </div>
        </Form>
      </div>
      <div class="col-md-6">
        <h2 class="h4 fw-bold mb-4 mb-md-6">購物清單</h2>
        <table class="table table-striped mb-4 mb-md-6">
          <tbody>
            <template v-if="cart.carts">
              <tr v-for="item in cart.carts" :key="item" class="align-middle">
                <th>
                  <img
                    :src="item.product.imageUrl"
                    :alt="item.product.title"
                    style="width:100px;"
                  />
                </th>
                <td>
                  <p class="mb-2 mb-md-0">{{ item.product.title }}</p>
                  <p>數量 : {{ item.qty }}</p>
                </td>
                <td class="text-end">NT ${{ $filters.currency(item.product.price * item.qty) }}</td>
              </tr>
            </template>
          </tbody>
        </table>
        <p class="h4 fw-bold text-end mb-3">總金額 : NT ${{ $filters.currency(cart.total) }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
          payment: '',
        },
        message: '',
      },
      cart: {},
      isLoading: false,
    };
  },
  methods: {
    // 取得購物車列表 API
    getCart() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          this.cart = response.data.data;
          this.isLoading = false;
        }
      });
    },
    createOrder() {
      this.isLoading = true;
      // 結帳頁面填寫表單
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`;
      const order = this.form;
      this.$http
        .post(url, { data: order })
        .then((response) => {
          if (response.data.success) {
            this.$swal({
              title: `<p class="h4">${response.data.message}</p>`,
              icon: 'success',
            });
            this.$router.push(`/checkout/${response.data.orderId}`);
            this.isLoading = false;
            // 輸入完資料按送出訂單，購物車清空 ( 這邊的form 為VForm元件底下的方法clearForm )
            this.$refs.form.resetForm();
            this.getCart();
          } else {
            console.log(response.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getCart();
  },
};
</script>
<style lang="scss">
.logoText {
  font-family: 'Playfair Display';
  font-size: 40px;
}
</style>
