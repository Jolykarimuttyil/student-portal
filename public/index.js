/* global Vue, VueRouter, axios */

var UpdatePage = {
  template: "#update-page",
  data: function() {
    return {
      message: "Joe!",

      command: "Get going !",

      message1: "It's Richgang"
    };
  },
  created: function() {},
  methods: {
    updateStudent: function(inputStudent) {
      console.log("gonna update", inputStudent);
      var params = {};
      if (this.editStudentFirstName) {
        params.name = this.editStudentFirstName;
      }
      if (this.editStudentLastName) {
        params.bio = this.editStudentBio;
      }
      if (this.editStudentEmail) {
        params.bio = this.editStudentEmail;
      }
      if (this.editStudentPhoneNumber) {
        params.bio = this.editStudentPhoneNumber;
      }
      if (this.editStudentBio) {
        params.bio = this.editStudentBio;
      }
      if (this.editStudentLinkedinUrl) {
        params.bio = this.editStudentLinkedinUrl;
      }
      if (this.editStudentTwitterHandle) {
        params.bio = this.editStudentTwitterHandle;
      }
      if (this.editStudentPersonalUrl) {
        params.bio = this.editStudentPersonalUrl;
      }
      if (this.editStudentResumeUrl) {
        params.bio = this.editStudentResumeUrl;
      }
      if (this.editStudentGithubUrl) {
        params.bio = this.editStudentGithubUrl;
      }
      if (this.editStudentPhoto) {
        params.bio = this.editStudentPhoto;
      }
      axios.patch("/v1/student/" + inputStudent.id, params).then(
        function(response) {
          inputStudent.FirstName = response.data.FirstName;
          inputStudent.LastName = response.data.LastName;
          inputStudent.Email = response.data.Email;
          inputStudent.PhoneNumber = response.data.PhoneNumber;
          inputStudent.bio = response.data.bio;
          inputStudent.LinkedinUrl = response.data.LinkedinUrl;
          inputStudent.TwitterHandle = response.data.TwitterHandle;
          inputStudent.PersonalUrl = response.data.PersonalUrl;
          inputStudent.ResumeUrl = response.data.ResumeUrl;
          inputStudent.GithubUrl = response.data.GithubUrl;
          inputStudent.Photo = response.data.Photo;
          this.editStudentFirstName = "";
          this.editStudentLastName = "";
          this.editStudentEmail = "";
          this.editStudentPhoneNumber = "";
          this.editStudentBio = "";
          this.editStudentLinkedinUrl = "";
          this.editStudentTwitterHandle = "";
          this.editStudentPersonalUrl = "";
          this.editStudentResumeUrl = "";
          this.editStudentGithubUrl = "";
          this.editStudentPhoto = "";
        }.bind(this)
      );
    }
  },
  computed: {}
};

var LoginPage = {
  template: "#login-page",
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        auth: { email: this.email, password: this.password }
      };
      axios
        .post("/user_token", params)
        .then(function(response) {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          router.push("/");
        })
        .catch(
          function(error) {
            this.errors = ["Invalid email or password."];
            this.email = "";
            this.password = "";
          }.bind(this)
        );
    }
  }
};

var router = new VueRouter({
  routes: [
    { path: "/", component: HomePage },
    { path: "/login", component: LoginPage }
  ],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router,
  created: function() {
    var jwt = localStorage.getItem("jwt");
    if (jwt) {
      axios.defaults.headers.common["Authorization"] = jwt;
    }
  }
});
