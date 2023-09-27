import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const emailEl = formEl.elements.email;
const messageEl = formEl.elements.message;

const storageKey = 'feedback-form-state';
const defaultValues = { email: '', message: '' };

const getValues = key => localStorage.getItem(key);

const setValues = (key, data) =>
  localStorage.setItem(key, JSON.stringify(data));

const getObj = data => {
  try {
    return JSON.parse(data);
  } catch ({ message }) {
    console.log(
      '%c%s',
      'color: violet; font: 1.2rem/1 Tahoma;',
      `Error: ${message}`
    );
  }
};

const formData = getValues(storageKey);

if (!formData) {
  setValues(storageKey, defaultValues);
}

if (formData) {
  const { email, message } = getObj(formData);

  emailEl.value = email;
  messageEl.value = message;
}

const formHandler = throttle(({ target: { name, value } }) => {
  const json = getValues(storageKey);
  const data = getObj(json);

  setValues(storageKey, { ...data, [name]: value });
}, 100);

formEl.addEventListener('input', formHandler);
