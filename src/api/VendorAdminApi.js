import Api from '@/api/Api'

export default {
  get() {
    return Api().get('admin/')
  }
}
