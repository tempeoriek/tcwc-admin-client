import Api from '@/api/Api'

export default {
  getAllData() {
    return Api().get('menu/')
  }
}
