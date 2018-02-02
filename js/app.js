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
 $scope.scrollreached=false;

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
  $scope.loadFn(key)
})


 $scope.loadFn=function(val){
  console.log("loadFn "+val)
  //$scope.listid=0;
 // $scope.interval=$interval(callAtInterval, 1000,val);
}

$scope.onclicktop=function(){
  $("html, body").animate({ scrollTop: 0 }, 600);
  //$("#mydata1").scrollTop()
}


function callAtInterval(val){
  $scope.listid=1;
  $("#mydata"+$scope.listid).fadeIn("slow");
  console.log("callAtInterval "+$scope.listid+" "+val);
  if($scope.listid==(val-1)){
    console.log("clear "+val);
    clearInterval($scope.interval)
  }
  
}

setTimeout(function(){
 console.log("test"+$(document).innerHeight())
 $("#test").css("height",$(document).outerHeight()+"px")
},3000)

$scope.scrollpos=0;

var testId=$interval(pageScroll, 200);
var allow=true;
var showcnt=1;


function pageScroll() {  
  if(allow){

    window.scrollTo($scope.scrollpos,$scope.scrollpos+1);
    $scope.scrollpos+=5;

    $(window).fadeIn("slow", 0.2);

    if($scope.scrollpos>($(document).innerHeight()-1)){
      clearInterval(testId)
       $scope.scrollreached=true;
     //  console.log("scrollreached "+$scope.scrollreached)
    }else{
      //console.log("scrollreached "+$scope)
    }
  }
}


$("#test").mouseover(function(){
 allow=false;
}).mouseout(function(){
 allow=true;
});



});