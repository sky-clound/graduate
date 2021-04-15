import request from 'umi-request';

export const  getUser = () => {
  console.log(99999)
  const data =  request.get('/api/test')
  .then(function(response) {
    return response
  })
  .catch(function(error) {
    console.log(error);
  });
  return data

}

// 也可将 URL 的参数放到 options.params 里
// request
//   .get('/api/v1/xxx', {
//     params: {
//       id: 1,
//     },
//   })
//   .then(function(response) {
//     console.log(response);
//   })
//   .catch(function(error) {
//     console.log(error);
//   });