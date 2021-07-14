const {phone} = require('phone');

const mixins = {
  methods: {
    hasWhiteSpacesOnly(val) {
      return val.replace(/\s/g, '').length || 'Field is empty'
    },
    phoneValid(val) {
      return phone(val, {country: 'KE'}).isValid || 'Invalid Phone Number'
    }
  }

}
export default mixins

// +1(817) 569-8900
