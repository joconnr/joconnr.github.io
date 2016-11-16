(function () {

angular.module('data',['ui.router']);

angular.module('data')
.config(function () {
  console.log("data config fired.");
})
.run(function () {
  console.log("data run fired.");
});

})();