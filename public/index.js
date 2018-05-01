/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "This is your info: ",
      student: {
        first_name: "Richard",
        last_name: "Gang",
        email: "richard@email.com",
        phone_number: "1112223333",
        bio: "Up and coming underground rapper.",
        linkedin_url: "www.linkedin.com/in/richard-gang",
        twitter_handle: "www.twitter.com/richard-gang",
        personal_url: "www.richard-gang.com",
        resume_url: "www.richard-gang-resume.com",
        github_url: "www.github.com/richard-gang",
        photo: "www.richard-gang-photo.com"
      },

    };
  },
  created: function() {},
  methods: {},
  computed: {}
};

var UpdatePage = {
  template: "#update-page",
  data: function() {
    return {
      editStudentFirstName: "",
      editStudentLastName: "",
      editStudentEmail: "",
      editStudentPhoneNumber: "",
      editStudentBio: "",
      editStudentLinkedinUrl: "",
      editStudentTwitterHandle: "",
      editStudentPersonalUrl: "",
      editStudentResumeUrl: "",
      editStudentGithubUrl: "",
      editStudentPhoto: "",
    };
  },
  created: function() {},
  methods: {
    updateStudent: function(inputStudent) {
      console.log(" update", inputStudent);
      var params = {};
      if (this.editStudentFirstName) {
        params.first_name = this.editStudentFirstName;
      }
      if (this.editStudentLastName) {
        params.last_name = this.editStudentBio;
      }
      if (this.editStudentEmail) {
        params.email = this.editStudentEmail;
      }
      if (this.editStudentPhoneNumber) {
        params.phone_number = this.editStudentPhoneNumber;
      }
      if (this.editStudentBio) {
        params.bio = this.editStudentBio;
      }
      if (this.editStudentLinkedinUrl) {
        params.linkedin_url = this.editStudentLinkedinUrl;
      }
      if (this.editStudentTwitterHandle) {
        params.twitter_handle = this.editStudentTwitterHandle;
      }
      if (this.editStudentPersonalUrl) {
        params.personal_url = this.editStudentPersonalUrl;
      }
      if (this.editStudentResumeUrl) {
        params.resume_url = this.editStudentResumeUrl;
      }
      if (this.editStudentGithubUrl) {
        params.github_url = this.editStudentGithubUrl;
      }
      if (this.editStudentPhoto) {
        params.photo = this.editStudentPhoto;
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
    { path: "/login", component: LoginPage },
    { path: "/update", component: UpdatePage }
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
