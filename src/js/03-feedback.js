import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const emailEl = formEl.elements.email;
const messageEl = formEl.elements.message;

const KEY = 'feedback-form-state';
let data = {};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);

    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (err) {
    console.error('Get state error: ', err);
  }
};

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.error('Set state error: ', err);
  }
};
const deleteData = key => {
  localStorage.removeItem(key);
};

const savedData = load(KEY);

if (savedData) {
  data = { ...savedData };
  const { email = '', message = '' } = data;
  emailEl.value = email;
  messageEl.value = message;
}

const formHandler = e => {
  const { name, value } = e.target;

  data = { ...data, [name]: value };

  save(KEY, data);
};

const submitHandler = e => {
  e.preventDefault();

  formEl.reset();

  let massage;
  const test = load(KEY);

  if (!test) {
    return;
  }

  massage = test;

  console.log(massage);

  deleteData(KEY);
};

formEl.addEventListener('input', formHandler);
formEl.addEventListener('submit', submitHandler);
