
import { reactive } from "vue";

const state = reactive({
    user:null
})
const methode = {
    setUser(payload){
        state.user = payload?payload.user:null
    }
}
export default {
    state,
    methode
}