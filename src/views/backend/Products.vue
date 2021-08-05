<template>
  <div class="container py-5">
    <loading :active="isLoading" :z-index="1060"></loading>
    <h2 class="h2 fw-bolder text-center mb-3">產品頁</h2>
    <div class="text-end mt-4">
      <button class="btn btn-primary" type="button" @click="openModal(true)">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">縮圖</th>
          <th width="80">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">特色品</th>
          <th width="100">回饋季</th>
          <th width="100">瑕疵</th>
          <th width="100">是否啟用</th>
          <th width="150">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>
            <img :src="item.imageUrl" style="width:100px;" />
          </td>
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">
            {{ $filters.currency(item.origin_price) }}
          </td>
          <td class="text-right">
            {{ $filters.currency(item.price) }}
          </td>
          <td>
            <span v-if="item.is_featuredProduct" class="text-success">是</span>
            <span v-else class="text-brown-400">否</span>
          </td>
          <td>
            <span v-if="item.is_seasonSale" class="text-success">是</span>
            <span v-else class="text-brown-400">否</span>
          </td>
          <td>
            <span v-if="item.is_defectiveProduct" class="text-success">是</span>
            <span v-else class="text-brown-400">否</span>
          </td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else class="text-brown-400">未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                type="button"
                @click="openModal(false, item)"
              >
                編輯
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                type="button"
                @click="openDelProductModal(item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- ProductModal -->
    <ProductModal
      ref="ProductModal"
      :product="tempProduct"
      :isNew="isNew"
      @update-product="updateProduct"
    />
    <!-- DelModal -->
    <DelModal ref="DelModal" :product="tempProduct" @del-item="delProduct" />
    <!-- 在 HTML 使用動態屬性 v-bind，把外層與內層做串接 -->
    <!-- 口訣前內後外，前為ProductModal.vue的update-product，後為Products.vue的updateProduct方法。
    :product和:isNew也一樣 -->
    <!-- Paginaiton -->
    <Pagination :pages="pagination" @emitPages="getProducts" />
  </div>
</template>
<script>
import ProductModal from '@/components/backend/ProductModal.vue';
import DelModal from '@/components/backend/DelModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {
        imagesUrl: [],
      },
      isNew: false,
      isLoading: false,
      status: {
        fileUploading: false,
      },
      modal: {
        editModal: '',
        delModal: '',
      },
      currentPage: 1,
    };
  },
  components: {
    ProductModal,
    DelModal,
    Pagination,
  },
  inject: ['$httpMessageState'],
  methods: {
    getProducts(page = 1) {
      this.currentPage = page;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.isLoading = true;
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          this.products = response.data.products;
          this.pagination = response.data.pagination;
          this.isLoading = false;
        }
      });
    },
    openModal(isNew, item) {
      // 編輯與新增為同一個Modal，用 isNew區分
      if (isNew) {
        this.tempProduct = {
          imagesUrl: [],
        };
        this.isNew = true;
      } else {
        this.tempProduct = JSON.parse(JSON.stringify(item)); // 深層拷貝
        this.isNew = false;
      }
      const productComponent = this.$refs.ProductModal;
      productComponent.openModal();
    },
    updateProduct(item) {
      this.tempProduct = item;
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = 'post';
      let status = '新增產品';
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
        httpMethod = 'put';
        status = '更新產品';
      }
      const productComponent = this.$refs.ProductModal;
      this.$http[httpMethod](api, { data: this.tempProduct })
        .then((response) => {
          if (response.data.success) {
            this.$httpMessageState(response, status);
            productComponent.hideModal();
            this.getProducts(this.currentPage);
          } else {
            this.$httpMessageState(response, status);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openDelProductModal(item) {
      this.tempProduct = { ...item };
      const delComponent = this.$refs.DelModal;
      delComponent.openModal();
    },
    delProduct() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
      this.isLoading = true;
      this.$http.delete(url).then((response) => {
        this.$httpMessageState(response, '刪除產品');
        const delComponent = this.$refs.DelModal;
        delComponent.hideModal();
        this.getProducts(this.currentPage);
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
