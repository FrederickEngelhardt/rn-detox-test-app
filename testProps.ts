const ButtonScreen = {
  buttonsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
};

const pages = [ 'ButtonScreen', 'InputScreen']

const InputScreen = {
	fields: [
	  {key: 'username', label: 'User Name'},
    {key: 'password', label: 'Password'},
  ]
}

export default {
  ButtonScreen,
  pages,
  InputScreen
}
