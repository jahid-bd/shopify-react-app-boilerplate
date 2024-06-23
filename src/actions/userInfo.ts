import request from '@/services/api-service/apiRequest';

async function getUserInfo() {
  return request.api('user-info').then((response) => response.data);
}
export { getUserInfo };
