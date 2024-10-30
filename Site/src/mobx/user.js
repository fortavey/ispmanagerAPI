import { makeObservable, action, observable } from "mobx";
import url from "../data/url";

class User {
  user = "";
  access = 0;

  setUser = async () => {
    await fetch(url.getUser)
      .then((res) => res.json())
      .then((data) => {
        this.user = data.data.user_login;
        this.setAccess(data.data.user_login);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  setAccess = (value) => {
    switch (value) {
      case "fort":
        this.access = 100;
        break;
      case "sunnyn1k":
        this.access = 90;
        break;
      case "mary":
        this.access = 91;
        break;
      case "Kasta14":
        this.access = 45;
        break;
      case "alimalinina":
        this.access = 45;
        break;
      case "nasloma91":
        this.access = 45;
        break;
    }
  };

  constructor(user, access, setUser, setAccess) {
    makeObservable(this, {
      user: observable,
      access: observable,
      setUser: action,
      setAccess: action,
    });
  }
}

const user = new User();

export default user;
