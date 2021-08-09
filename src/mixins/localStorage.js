export default {
  methods: {
    // LocalStorage (先定義一個物件 storageMethods 裡面會有兩個方法 : 存檔 save 與讀檔 get。)
    saveLocalStorage(favorite) {
      // 存檔:把丟進來的東西先做轉型(物件轉字串)
      const favoriteString = JSON.stringify(favorite);
      localStorage.setItem('saveFavorite', favoriteString);
    },
    getLocalStorage() {
      // 讀檔:取出 saveFavorite欄位字串內容轉回物件
      return JSON.parse(localStorage.getItem('saveFavorite'));
    },
    addFavorite(item) {
      if (this.myFavorite.includes(item.id)) {
        this.myFavorite.splice(this.myFavorite.indexOf(item.id), 1);
        this.$swal({
          title: '<p class="h4">商品已從收藏清單中移除</p>',
          icon: 'success',
        });
      } else {
        this.myFavorite.push(item.id);
        this.$swal({
          title: '<p class="h4">商品已加入收藏清單</p>',
          icon: 'success',
        });
      }
      this.saveLocalStorage(this.myFavorite);
      this.emitter.emit('update-favorite');
    },
  },
  inject: ['emitter'],
};
