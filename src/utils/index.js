import { STORAGE_KEY } from '../constants';

const getStoredData = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

const updateStorageData = (updatedData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
};

export { getStoredData, updateStorageData };
