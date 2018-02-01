var app=angular.module("myapp",[]);

app.run(function($rootScope){
  $rootScope.title="Text Animator";
  $rootScope.appId='';
})

app.controller("mycontroller",function($scope,$http,$rootScope, $interval,$timeout){
 $scope.listid=0;
 $scope.totalobj=0;
 $scope.count=0;

 $scope.question=1;
 $scope.solution=2;
 $scope.count=0;
 $scope.cnt=3;

 $http.get("jsondata.json").then(function(response){

  var myObj = {}
  var key = 0;
  for(var i in response.data)
  {
    for(var j in response.data[i])
    {

      if(key !=0)
      {
        myObj[key] = response.data[i][j];
      }
      key++;
    }
  }

  console.log(myObj+" : "+key)
  $scope.mydata=myObj;  
  $rootScope.appId=response.data.appId[0];
 // console.log(response.data);
 $scope.loadFn(key)


})


 $scope.loadFn=function(val){
  console.log("loadFn "+val)
  $scope.listid=0;
  $scope.interval=$interval(callAtInterval, 1000,val);
}


function callAtInterval(val){
  if($scope.listid==val){
    console.log("clear "+val);
    clearInterval($scope.interval)
    /*clearInterval($scope.my_time);*/
    $("#test").css("height",$(document).outerHeight()+"px");
  }
  else{
    console.log("callAtInterval "+$scope.listid+" "+val);
    $scope.listid+=1;
  }
}

$scope.scrollpos=0;
var testId;
/*var testId=$interval(pageScroll, 500);*/
/*$("#test").mouseover(function() {
  console.log("clearInterval")
 
  clearInterval(testId);
   $scope.scrollpos = window.scrollY;
}).mouseout(function() {
  pageScroll();
});
*/

function pageScroll() {  
  console.log("pagescroll")
  // var objDiv = document.body;
  // objDiv.scrollTop = objDiv.scrollTop + 1;  
  window.scrollTo($scope.scrollpos,$scope.scrollpos+1);

$scope.scrollpos+=1;
  // $('p:nth-of-type(1)').html('scrollTop : '+ objDiv.scrollTop);
  // $('p:nth-of-type(2)').html('scrollHeight : ' + objDiv.scrollHeight);
  // if (objDiv.scrollTop == (objDiv.scrollHeight - 100)) {
  //   objDiv.scrollTop = 0;
  // }
}

setTimeout(function()
    {
      $("#test").hover(function(){
        //$(this).css("background-color", "yellow");
        clearInterval(testId)
      }, function(){
        //$(this).css("background-color", "pink");
        testId=$interval(pageScroll, 500);
      });
  //  $("#test").css("height",$(document).outerHeight()+"px");
},1000)


});