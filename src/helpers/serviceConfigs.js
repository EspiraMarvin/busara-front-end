export const configs = {
   my_client_id: 'zVs3J7FZupB3TLPskQOy1xHLwYTRkzUSf2rdTDCu',
   my_client_secret: 'Zv19oWmm416sTyjWT5Sx2r1gRwjWrXU3P5dWledQpYjxEvavS58SPtz03M8wvsgajaVLhcimmJIUUYUDad06V6HQosmPoj3TPRNjg7bgniQlooIwyFWfz8KfkM5Tdh7R',
   my_username: 'espiramarvin@gmail.com',
   my_password: '123secret',
   grant_type: 'password'
}

export const appendEditForm = function(form) {
  let formData = new FormData();

  for (let key in form) {
    formData.append(key, form[key]);
  }

  formData.append('_method', 'put');

  return formData;
};

export const appendForm = function(form) {
  let formData = new FormData();

  for (let key in form) {
    formData.append(key, form[key]);
  }

  return formData;
};
