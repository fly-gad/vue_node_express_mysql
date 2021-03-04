/**
 * @file 表单校验
 * @author svon.me@gmail.com
 */

import _ from 'lodash';

const validateName = 'validate';

const validateFun = function (resolve, reject) {
  return function (valid, error) {
    if (valid) {
      resolve();
    } else {
      reject(error);
    }
  };
};

const validate = async function (callback) {
  const validates = [];
  _.each(this.$children, $comps => {
    if ($comps[validateName] && _.isFunction($comps[validateName])) {
      validates.push(new Promise((resolve, reject) => {
        $comps[validateName](validateFun(resolve, reject));
      }));
    } else {
      validates.push(new Promise((resolve, reject) => {
        validate.call($comps, validateFun(resolve, reject));
      }));
    }
  });
  try {
    await Promise.all(validates);
    callback && callback(true);
  } catch (error) {
    callback && callback(false, error);
  }
};


export default {
  methods: {
    // 数据校验
    validate: function (callback) {
      return validate.call(this, callback);
    },
    validateTest() {
      this.$nextTick(() => {
        this.validatePromise();
      });
    },
    validatePromise() {
      return new Promise((resolve, reject) => {
        this.validate(function (status, error) {
          if (status) {
            resolve();
          } else {
            reject(error);
          }
        });
      });
    }
  }
};