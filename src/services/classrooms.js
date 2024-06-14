const url = import.meta.env.VITE_REACT_API_URL;

export function getClassroomsByBlock(id) {
  let token = localStorage.getItem("token");
  return fetch(url + `classrooms/block/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    mode: "no-cors",
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

export function getSuggestsClassrooms(dataSugg) {
  let token = localStorage.getItem("token");
  let responseFetch = {};
  return fetch(url + "classrooms/reservation/suggest", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    mode: "no-cors",
    body: JSON.stringify(dataSugg),
  })
    .then((response) => {
      let status = response.status;
      responseFetch = { ...responseFetch, status: status };
      return response.json();
    })
    .then((data) => {
      responseFetch = { ...responseFetch, data: data };
      return responseFetch;
    });
}

export function getClassroomsForDeleteList() {
  let token = localStorage.getItem("token");
  return fetch(url + "classrooms/statistics/list", {
    headers: { Authorization: `Bearer ${token}` },
    mode: "no-cors",
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

export function deleteEnvironment(environment) {
  let token = localStorage.getItem("token");
  return fetch(url + `classrooms/delete/${environment}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
    mode: "no-cors",
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

export function getStatusClassroms() {
  let token = localStorage.getItem("token");
  return fetch(url + "classrooms/statuses", {
    headers: { Authorization: `Bearer ${token}` },
    mode: "no-cors",
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

export function getClassromsTypes() {
  let token = localStorage.getItem("token");
  return fetch(url + "classrooms/types", {
    headers: { Authorization: `Bearer ${token}` },
    mode: "no-cors",
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

export function getStatusBlock() {
  let token = localStorage.getItem("token");
  return fetch(url + "classrooms/statuses", {
    headers: { Authorization: `Bearer ${token}` },
    mode: "no-cors",
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

export function storeBlock(block) {
  let token = localStorage.getItem("token");
  let responseFetch = {};
  return fetch(url + "blocks", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    mode: "no-cors",
    body: JSON.stringify(block),
  })
    .then((response) => {
      responseFetch = { ...responseFetch, status: response.status };
      return response.json();
    })
    .then((data) => {
      responseFetch = { ...responseFetch, data: data };
      return responseFetch;
    })
    .catch((err) => console.error(err));
}
