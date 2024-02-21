import axios from 'axios';
import { ref } from 'vue';

export default function useToken() {
  let token = ref('');
  async function getToken() {
    let url = `http://129.226.142.123:3036/token`;
    // let url = `http://127.0.0.1:4002/token`
    let { data } = await axios.get(url, {
      headers: { 'Content-Type': 'application/json;charset=UTF-8', withCredentials: true }
    });
    token = data;
    localStorage.setItem('token', data);
  }
  // onMounted(() => {
  //   //判定是否过期
  //   getToken();
  // });
  return { getToken, token };
}
