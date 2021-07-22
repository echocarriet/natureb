import eventBus from '@/methods/eventBus';

export default function (response, title = '更新') {
  // ToastMessages.vue做了監聽push-message，這邊下方做資料處理，判斷成功就推資料到它監聽的事件(push-message)中
  // style 可自行設定toastMessage 的呈現顏色
  if (response.data.success) {
    eventBus.emit('push-message', {
      style: 'success',
      title: `${title}成功`,
    });
  } else {
    // 有些訊息是字串，有些則是陣列，在此統一格式
    const message = typeof response.data.message === 'string' ? [response.data.message] : response.data.message;
    eventBus.emit('push-message', {
      style: 'danger',
      title: `${title}失敗`,
      content: message.join('、'),
    });
  }
}
