<template>
  <Navbar />
  <header class="position-relative">
    <img
      class="bg-mask-60 img-cover pageBanner w-100"
      src="@/assets/stylesheets/images/faq.jpg"
      alt="商品banner"
    />
    <h2 class="position-absolute text-hv-center h2 fw-bold text-white-50 pageBanner-text">
      f.a.q
    </h2>
  </header>
  <div class="container py-7 py-md-9 window-vh100">
    <h3 class="h3 fw-bold text-center mb-4 mb-md-6">常見問題</h3>
    <div class="accordion" id="accordionExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button
            class="accordion-button fw-bold"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            #1. 要如何訂購 ?
          </button>
        </h2>
        <div
          id="collapseOne"
          class="accordion-collapse collapse show"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <p>訂購步驟</p>
            <p>
              選取喜愛的商品 → 將商品加入購物車 → 點選右上角購物車的 icon 進入結帳頁面 →
              （若有折扣碼要先輸入）前往結帳 → 填寫收件資料 → 送出訂單 → 確認結帳進行付款 →
              要抵達訂單完成頁面才算完成購買喔！
            </p>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
          <button
            class="accordion-button collapsed fw-bold"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            #2. 有哪些付款方式 ?
          </button>
        </h2>
        <div
          id="collapseTwo"
          class="accordion-collapse collapse"
          aria-labelledby="headingTwo"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <p>信用卡 、 貨到付款 、ATM 轉帳。</p>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingThree">
          <button
            class="accordion-button collapsed fw-bold"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
          >
            #3. 要如何取消訂單 ?
          </button>
        </h2>
        <div
          id="collapseThree"
          class="accordion-collapse collapse"
          aria-labelledby="headingThree"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <p>若您的訂單狀態為 : 未付款，請洽客服專線 0800-543543 由客服為您服務。</p>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingFore">
          <button
            class="accordion-button collapsed  fw-bold"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseFore"
            aria-expanded="false"
            aria-controls="collapseFore"
          >
            #4. 甚麼是優惠碼 ?
          </button>
        </h2>
        <div
          id="collapseFore"
          class="accordion-collapse collapse"
          aria-labelledby="headingFore"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <p>優惠碼是 natureB 線上購物專屬的折扣優惠，在節尚時可以使用來折抵消費金額。</p>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingFive">
          <button
            class="accordion-button collapsed  fw-bold"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseFive"
            aria-expanded="false"
            aria-controls="collapseFive"
          >
            #5. 折扣碼有沒有使用期限 ?
          </button>
        </h2>
        <div
          id="collapseFive"
          class="accordion-collapse collapse"
          aria-labelledby="headingFive"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <p>折扣代碼之使用期限，依 natureB 活動之公告規定為準，逾期失效，恕不補發。</p>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingSix">
          <button
            class="accordion-button collapsed  fw-bold"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseSix"
            aria-expanded="false"
            aria-controls="collapseSix"
          >
            #6. 如收到商品有缺少該怎麼辦 ?
          </button>
        </h2>
        <div
          id="collapseSix"
          class="accordion-collapse collapse"
          aria-labelledby="headingSix"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <p>
              如收到商品後有缺少，請於兩天內打客服專線 0800-543543
              由客服為您立即做處理，逾期恕不受理。
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>
<script>
import Navbar from '@/components/frontend/Navbar.vue';
import Footer from '@/components/frontend/Footer.vue';

export default {
  components: {
    Navbar,
    Footer,
  },
};
</script>
