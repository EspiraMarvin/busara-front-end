/* eslint-disable no-mixed-operators */
const required = (propertyType) => (v) => v && v.length > 0 || `${propertyType} field is required`;

const confirmPassword = (propertyType, password) => (v) => v && v === password || `${propertyType} must be same as entered password`;

const minimum = (propertyType, min) => (v) => v && v.length >= min || `${propertyType} must be at least ${min} characters`;

const check = () => (v) => v === true || 'You must agree to continue!';

const emailFormat = () => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return (v) => v && regex.test(v) || 'Must be a valid email address';
};

export default {
  required,
  confirmPassword,
  minimum,
  check,
  emailFormat,
};
