const url = import.meta.env.VITE_REACT_API_URL;

export function getUserNotifications(person_id) {
  let responseFetch = {};
  return fetch(url + `notifications/inbox/${person_id}`)
    .then((response) => {
      responseFetch = { ...responseFetch, status: response.status };
      return response.json();
    })
    .then((data) => {
      responseFetch = { ...responseFetch, data: data };
      return responseFetch;
    })
    .catch((err) => {
      console.error(err);
      responseFetch = { status: 500, data: [] };
      return responseFetch;
    });
}

export function getSingleNotification(person_id, notification_id) {
  let responseFetch = {};
  return fetch(url + `notifications/inbox/${person_id}/${notification_id}`)
    .then((response) => {
      responseFetch = { ...responseFetch, status: response.status };
      return response.json();
    })
    .then((data) => {
      responseFetch = { ...responseFetch, data: data };
      return responseFetch;
    })
    .catch((err) => {
      console.error(err);
      responseFetch = { status: 500, data: {} };
      return responseFetch;
    });
}
