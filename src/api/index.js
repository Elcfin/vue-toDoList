import instance from './axios'

const postRequest = (url, data) => {
  return instance({
    url,
    data,
    method: 'POST'
  })
}

const getRequest = (url) => {
  return instance({
    url,
    method: 'GET'
  })
}

export function addNewItem(data) {
  return postRequest('/addNewItem', data)
}

export function deleteItem(data) {
  return postRequest('/deleteItem', data)
}

export function updateItem(findCondition, newContent) {
  const data = {
    findCondition,
    newContent
  }
  return postRequest('/updateItem', data)
}

export function findItem(data) {
  return postRequest('/findItem', data)
}

export function getItems() {
  return getRequest('/getItems')
}