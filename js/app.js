var app=angular.module("myapp",[]);

app.run(function($rootScope){
	$rootScope.title="Text Animator";
	$rootScope.appId='';
})

app.controller("mycontroller",function($scope,$http,$rootScope, $interval,$timeout){
	$scope.mydata="mydata";
     $scope.listid=0;
    $scope.totalobj=0;
    
	$http.get("data.json").then(function(response){
		console.log(response.data);
		$scope.mydata=response.data;
		$rootScope.appId=$scope.mydata.appId;
        $scope.cnt=0;
        for(i in $scope.mydata){
            $scope.cnt+=1;
        }
        $scope.loadFn($scope.cnt);
        
	})
    
   
    $scope.loadFn=function(val){
         $scope.listid=-1;
        $scope.interval=$interval(callAtInterval, 1000,val);
}

    function callAtInterval(val){
        if($scope.listid==val){
            console.log("clear "+val);
            clearInterval($scope.interval)
        }
       else{
           
           //console.log("callAtInterval "+$scope.listid+" "+$scope.cnt);
            $scope.listid+=1;

           console.log("#listid"+$scope.listid)
       }
    }
    
    $scope.my_time=$interval(pageScroll, 25);
    
    $("#textpart").mouseover(function() {
    clearInterval($scope.my_time);
  }).mouseout(function() {
    pageScroll();
  });
    
    function pageScroll() {  
        console.log("pagescroll")
	var objDiv = document.getElementById("textpart");
  objDiv.scrollTop = objDiv.scrollTop + 1;  
  $('p:nth-of-type(1)').html('scrollTop : '+ objDiv.scrollTop);
  $('p:nth-of-type(2)').html('scrollHeight : ' + objDiv.scrollHeight);
  if (objDiv.scrollTop == (objDiv.scrollHeight - 100)) {
    objDiv.scrollTop = 0;
  }
        
  
}
  
})