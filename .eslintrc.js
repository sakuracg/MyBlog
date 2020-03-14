module.exports = {
    root: true,
    env: {
      node: true
    },
    'extends': [
      'plugin:vue/essential',
      '@vue/standard'
    ],
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-useless-return': ["off"],
      'no-unused-vars': ["off"],
      'template-curly-spacing': ["off"],
      'no-useless-escape': ["off"],
      'no-trailing-spaces': ["off"],
      'no-undef': ["off"]
    },
    parserOptions: {
      parser: 'babel-eslint'
    }
  }
  