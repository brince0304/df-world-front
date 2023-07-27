import axios from 'axios';

export default async function putAvatar(formData: FormData) {
  return await axios.put('/users/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
