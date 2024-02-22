import { ref, type Ref } from 'vue';

export default function useToken() {
  const token: Ref<string> = ref('');
  async function getToken() {
    const url = `http://129.226.142.123:3036/token`;
    // let url = `http://127.0.0.1:4002/token`
    // const { data } = await axios.get(url, {
    //   headers: { 'Content-Type': 'application/json;charset=UTF-8', withCredentials: true }
    // });
    const { data } = await uni.request({
      url: url,
      headers: {
        withCredentials: true,
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
    token.value = String(data);
    // localStorage.setItem('token', data);

    console.log('setToken', token.value);
    uni.setStorageSync('token', token.value);
  }
  // onMounted(() => {
  //   //判定是否过期
  //   getToken();
  // });
  return { getToken, token };
}
