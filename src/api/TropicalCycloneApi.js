import Api from '@/api/Api'

export default {
  get_all() {
    return Api().get('tropicalcyclone/')
  },
  get(params) {
    return Api().get('tropicalcyclone/'+ params.id, params)
  },
  create(params) {
    return Api().post('tropicalcyclone/', params)
  },
  update(params) {
    return Api().post('tropicalcyclone/'+ params.id, params)
  },
  delete(params) {
    return Api().delete('tropicalcyclone/'+ params.id, params)
  },

}
