export default class ApiService {
  //user
  static NewUser(body) {
    return fetch("http://127.0.0.1:8000/ta/info/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  // tab
  static NewTab(body) {
    return fetch("http://127.0.0.1:8000/ta/tab/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static UpdateTab(tab_id, body) {
    return fetch(`http://127.0.0.1:8000/ta/tab/${tab_id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static DeleteTab(tab_id) {
    return fetch(`http://127.0.0.1:8000/ta/tab/${tab_id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
