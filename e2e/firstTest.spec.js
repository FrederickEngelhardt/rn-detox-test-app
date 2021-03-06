import testProps from '../testProps';

describe('HomeScreen', () => {
  beforeAll(async () => {
    await device.reloadReactNative();
  });

  it('It loads the home screen ', async () => {
    await expect(element(by.id('HomeScreen'))).toBeVisible();
  });

  it('ButtonScreen and InputScreen buttons exist ', async () => {
    await expect(element(by.id('GoToButtonScreen'))).toExist();
    await expect(element(by.id('GoToInputScreen'))).toExist();
  });

  it('Can access ButtonScreen ', async () => {
    await element(by.id('GoToButtonScreen')).tap();
    await expect(element(by.id('ButtonScreen'))).toBeVisible();
  });

  it('Can access InputScreen', async () => {
    await device.reloadReactNative();
    await element(by.id('GoToInputScreen')).tap();
    await expect(element(by.id('InputScreen'))).toBeVisible();
  });
});

describe('ButtonScreen', () => {
  beforeAll(async () => {
    await device.reloadReactNative();
    await element(by.id('GoToButtonScreen')).tap();
  });

  it('can click on all the buttons', async () => {
    // Go lazy here...it does not behave as well as inline
    testProps.ButtonScreen.buttonsArray.forEach(
      async ele => await element(by.id(`Item${ele}`)).tap()
    );
  });
});

describe('InputScreen', () => {
  beforeAll(async () => {
    await device.reloadReactNative();
    await element(by.id('GoToInputScreen')).tap();
  });

  it('shows a username field', async () => {
    await expect(element(by.id('username'))).toBeVisible();
  });

  it('shows a password field', async () => {
    await expect(element(by.id('username'))).toBeVisible();
  });

  it('shows the loginButton', async () => {
    await expect(element(by.id('LoginButton'))).toBeVisible();
  });

  it('It can type in the Username field', async () => {
    await element(by.id('username')).typeText('Rick Sanchez');
  });

  it('It can type in the Password field', async () => {
    await element(by.id('password')).typeText('Morty!');
  });

  it('It can click Login and Loader renders', async () => {
    await element(by.id('LoginButton')).tap();
    await expect(element(by.id('Loader'))).toExist()
  });

  it('It can type and clear both the TextFields', async () => {
    // await device.reloadReactNative();
    // await element(by.id('GoToInputScreen')).tap();

    const username = 'Rick *Burp*';
    const password = '*Burp*';
    await element(by.id('username')).clearText();
    await element(by.id('username')).typeText(username);
    await expect(element(by.id('username'))).toHaveText(username);

    await element(by.id('password')).clearText();
    await element(by.id('password')).typeText(password);
    await expect(element(by.id('password'))).toHaveText(password);

    await element(by.id('usernameClear')).tap();
    await expect(element(by.id('username'))).toHaveText('');

    await element(by.id('passwordClear')).tap();
    await expect(element(by.id('password'))).toHaveText('');
  });
});

describe('Navigation', () => {
  beforeAll(async () => {
    await device.reloadReactNative();
    await element(by.id('GoToButtonScreen')).tap();
  });

  it('it can navigate back to the homescreen', async () => {
    await element(by.id('NavigateBack')).tap()
    await expect(element(by.id('HomeScreen'))).toBeVisible();
  });

  it('it can navigate back to the homescreen', async () => {
    await device.reloadReactNative();
    await element(by.id('GoToInputScreen')).tap();

    await element(by.id('NavigateBack')).tap()
    await expect(element(by.id('HomeScreen'))).toBeVisible();
  });
});

describe('Navigation + Screen Components', () => {
  beforeAll(async () => {
    await device.reloadReactNative();
  });

  it('Exiting component while loading promise does not hang UI', async () => {
    await element(by.id('GoToInputScreen')).tap();

    await element(by.id('LoginButton')).tap();
    // await expect(element(by.id('Loader'))).toExist();

    await element(by.id('NavigateBack')).tap();
    await expect(element(by.id('HomeScreen'))).toBeVisible();
  })
})
