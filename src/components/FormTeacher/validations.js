export const validateFirstName = (firstName) => {
  if (!firstName.length) return "Este campo es obligatorio";
};
export const validateLastName = (lastName) => {
  if (!lastName.length) return "Este campo es obligatorio";
};
export const validateEmail = (email) => {
  if (!email.length) return "Este campo es obligatorio";
};
export const validatePhone = (phone) => {
  if (!phone.length) return "Este campo es obligatorio";
};
export const validatePass = (pass) => {
  let regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  if (!pass.length) return "Este campo es obligatorio";
  //   if (!regex.test(pass)) return 'Debe tener "A,a,8-20,@,$,!,%,*" ';
};
export const validatePassTwo = (passTwo) => {
  if (!passTwo.length) return "Este campo es obligatorio";
};
