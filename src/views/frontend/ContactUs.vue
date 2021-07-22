<template>
  <Navbar />
  <header class="position-relative">
    <img
      class="bg-mask-60 img-cover img-position-center pageBanner w-100"
      src="@/assets/stylesheets/images/About.jpg"
      alt="聯絡natureB圖片"
    />
    <h2 class="position-absolute text-hv-center h2 fw-bold text-white-50 pageBanner-text">
      contact us
    </h2>
  </header>
  <main>
    <!-- Contact -->
    <section class="container py-9 py-lg-10">
      <div class="row mb-8">
        <!-- 地址 social icon-->
        <div class="col-lg-8">
          <div class="d-flex align-items-center">
            <i class="bi bi-geo-alt-fill h3 text-warning p-3 p-md-4"></i>
            <div>
              <p class="h7 text-warning letter-spacing-md mb-3">OUR STORE</p>
              <p class="h4 fw-bold mb-3">
                <span class="d-none d-md-inline-block">804</span> 高雄市鼓山區美術館路80號
              </p>
            </div>
          </div>
          <div class="mb-3 special-px">
            <p class="text-secondary">
              nature B 是由夫妻共同創辦的品牌，店內商品的共通點為環境永續、 公平交易
              、通過有機認證。 包裝材質運送過程也以符合環保為主要考量， 期望 nature B
              販售的不只是商品更是一種舒適的生活安心感。 在一同陪伴寶寶成長外也為地球盡一份心力。
            </p>
            <!-- social icon & 導航 -->
            <div class="row justify-content-center justify-content-sm-start mb-9 mb-lg-0">
              <div class="col-6 col-md-4 py-1">
                <div
                  class="d-flex justify-content-between pe-2 pe-md-3 border-end border-secondary"
                >
                  <a class="hover-text-warning" href="#">
                    <i class="bi bi-facebook"></i>
                  </a>
                  <a class="hover-text-warning" href="#">
                    <i class="bi bi-instagram"></i>
                  </a>
                  <a class="hover-text-warning" href="#">
                    <i class="bi bi-github"></i>
                  </a>
                  <a class="hover-text-warning" href="#">
                    <i class="bi bi-youtube"></i>
                  </a>
                </div>
              </div>
              <div class="col-4 col-md-8">
                <a
                  class="hover-text-warning align-middle"
                  href="https://goo.gl/maps/oMaFNLXdiGWreoXt7"
                  target="_blank"
                >
                  <span class="me-1 me-md-3">
                    <i class="bi bi-cursor-fill"></i>
                  </span>
                  <span>開啟導航</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <!-- 聯絡資訊 -->
        <div
          class="col-lg-4 d-flex flex-column flex-md-row flex-lg-column
        justify-content-between mb-9 mb-lg-0"
        >
          <div class="mb-6 mb-md-0 mb-lg-7">
            <p class="text-warning mb-1">
              <i class="bi bi-telephone-fill p-2"></i>
              <span class="h7 letter-spacing-md">CALL US</span>
            </p>
            <p class="h4 ps-6 fw-bold">
              <a class="hover-text-warning" target="_blank" href="tel:+0800 543543">0800 543543</a>
            </p>
          </div>
          <div class="mb-6 mb-md-0 mb-lg-7">
            <p class="text-warning mb-1">
              <i class="bi bi-envelope-fill p-2"></i>
              <span class="h7 letter-spacing-md">EMAIL US</span>
            </p>
            <p class="h4 ps-6 fw-bold">
              <a class="hover-text-warning" target="_blank" href="mailto:natureb@gamil.com"
                >natureb@gamil.com</a
              >
            </p>
          </div>
          <div class="mb-6 mb-md-0 mb-lg-7">
            <p class="text-warning mb-1">
              <i class="bi bi-clock-fill p-2"></i>
              <span class="h7 letter-spacing-md">WORKING HOURS</span>
            </p>
            <p class="h4 ps-6 fw-bold">Mon – Fri : 9 am to 6 pm</p>
          </div>
        </div>
      </div>
      <!-- map 、Form -->
      <div class="row g-0 mb-8 mb-lg-10">
        <div class="col-lg-7">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.921862728267!2d120.28436241539377!3d22.656701735587145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e045202c678e7%3A0x1191b60c8e175dbf!2zODA06auY6ZuE5biC6byT5bGx5Y2A576O6KGT6aSo6LevODDomZ8!5e0!3m2!1szh-TW!2stw!4v1626938827807!5m2!1szh-TW!2stw"
            width="100%"
            height="480"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </div>
        <div class="col-lg-5">
          <div
            class="d-flex flex-column justify-content-center
            align-items-center h-100 position-lg-relative"
          >
            <div class="bg-white shadow-xl p-9 p-md-8 p-lg-9 position-lg-absolute contactForm-body">
              <Form v-slot="{ errors }" ref="contactForm" @submit="clickContactForm">
                <div class="mb-3">
                  <label for="name" class="form-label h6 text-secondary">
                    姓名 <span class="text-danger ms-1">*</span>
                  </label>
                  <Field
                    id="name"
                    name="姓名"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors['姓名'] }"
                    placeholder="請輸入姓名"
                    rules="required"
                    v-model="contactForm.user.name"
                  ></Field>
                  <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label h6 text-secondary"
                    >信箱 <span class="text-danger ms-1">*</span>
                  </label>
                  <Field
                    id="email"
                    name="信箱"
                    type="email"
                    class="form-control"
                    :class="{ 'is-invalid': errors['信箱'] }"
                    placeholder="請輸入信箱"
                    rules="email|required"
                    v-model="contactForm.user.email"
                  ></Field>
                  <ErrorMessage name="信箱" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="mb-3">
                  <label for="tel" class="form-label h6 text-secondary"
                    >電話 <span class="h7 text-secondary">( 室內請加區碼 )</span></label
                  >
                  <Field
                    id="tel"
                    name="電話"
                    type="tel"
                    class="form-control"
                    :class="{ 'is-invalid': errors['電話'] }"
                    placeholder="請輸入電話號碼"
                    rules="min:8|max:10"
                    v-model="contactForm.user.tel"
                  ></Field>
                  <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="mb-3">
                  <label for="message" class="form-label h6 text-secondary">
                    留言<span class="text-danger ms-1">*</span></label
                  >
                  <textarea
                    name=""
                    id="message"
                    class="form-control"
                    rules="required"
                    cols="20"
                    rows="5"
                    v-model="contactForm.user.message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  class="btn btn-warning"
                  :disabled="
                    Object.keys(errors).length !== 0 ||
                      contactForm.user.name === '' ||
                      contactForm.user.email === '' ||
                      contactForm.user.message === ''
                  "
                >
                  送出
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <Footer />
</template>
<script>
import Navbar from '@/components/frontend/Navbar.vue';
import Footer from '@/components/frontend/Footer.vue';

export default {
  data() {
    return {
      contactForm: {
        user: {
          name: '',
          email: '',
          tel: '',
          message: '',
        },
      },
    };
  },
  components: {
    Navbar,
    Footer,
  },
  methods: {
    clickContactForm() {
      this.$refs.contactForm.resetForm();
      this.contactForm.user.message = '';
      this.$swal({
        title: '<p class="h4">謝謝您的來信，我們將安排回覆 !</p>',
        icon: 'success',
      });
    },
  },
};
</script>
<style lang="scss">
@import '@/assets/stylesheets/all';

@include media-breakpoint-up(md) {
  .special-px {
    padding-left: 70.08px;
    padding-right: 70.08px;
  }
}

.contactForm {
  height: 380px;
  &-body {
    width: 100%;
  }
}
@include media-breakpoint-up(lg) {
  .contactForm {
    height: 587px;
    &-body {
      left: -10%;
    }
  }
}
</style>
