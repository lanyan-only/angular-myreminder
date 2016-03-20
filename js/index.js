var reminder=angular.module("reminder",[]);

reminder.filter("search",function(){
	return function(data,key){
	    var	shuju=function(items){
            for (var i = 0; i < items.length; i++) {
               if(items[i].name.indexOf(key)!=-1){
               	return true;
               }
            }
            return false;
		}

		var r=[];
		for (var i = 0; i < data.length; i++) {
			if(data[i].name.indexOf(key)!=-1){
				r.push(data[i]);
			}
			if(shuju(data[i].items)){
				r.push(data[i]);
			
			}
		}
		return r;
	}
})
reminder.controller('rdCtrl', ['$scope', 
	function($scope){
	var d=localStorage.data;
	    $scope.shijianliebiao=d?JSON.parse(d):[];
		

	    $scope.colors=["purple","green","blue","yellow","brown","pink","orange"];
	    $scope.addshi=function(){
	       	var data={
	       		name:"新列表"+($scope.shijianliebiao.length+1),
	       		color:$scope.colors[$scope.shijianliebiao.length%7],
	       		items:[]
	       	}
	       	$scope.shijianliebiao.push(data);
	        localStorage.data=JSON.stringify($scope.shijianliebiao);
	    }
		 $scope.clistindex=0;

		 //angular.copy 深拷贝
        //已完成个数
		  $scope.countDone=function(){
	   	   var lis=$scope.shijianliebiao[$scope.clistindex].items;
	   	   var r=0;
	   	   for (var i = 0; i < lis.length; i++) {
	   	   	if(lis[i].isDone){
	   	   		r+=1;
	   	   	}
	   	   };
	   	   return r;
	   }
	   $scope.showshijian=function(index){
	      $scope.clistindex=index;
	   }
	    $scope.deleteitem=function(){
	        var r=[];
	         for (var i = 0; i < $scope.shijianliebiao.length; i++) {
	          if(i!=$scope.clistindex){
	             r.push($scope.shijianliebiao[i]);
	          }
	          
	        }
	        $scope.shijianliebiao=r;
	        $scope.clistindex=0;
	        localStorage.data=JSON.stringify($scope.shijianliebiao);
	        $scope.colors[($scope.shijianliebiao.length+1)%7];
	    }
	    $scope.clear=function(){
	       localStorage.clear();
	       location.reload();
	    }
	    $scope.zz=function(ev){
	      ev.stopPropagation();
	    }
	   $scope.addtodo=function(){
	    var cu=$scope.shijianliebiao[$scope.clistindex];
	    var data={};
	     cu.items.push(data);
	     $scope.currenttodo=data;
	     localStorage.data=JSON.stringify($scope.shijianliebiao);
	    }
	    $scope.deletetodo=function(index){
	      var r=[];
	      var cu=$scope.shijianliebiao[$scope.clistindex];
	      for (var i = 0; i < cu.items.length; i++) {
	         if(i!=index){
	          r.push(cu.items[i]);
	         }
	      }
	      $scope.shijianliebiao[$scope.clistindex].items=r;
	      localStorage.data=JSON.stringify($scope.shijianliebiao);
	    }
	    $scope.save=function(){
	      localStorage.data=JSON.stringify($scope.shijianliebiao);
	    }

	   //点击li设置表框
	   $scope.setcurrenttodo=function(value){
	   	$scope.currenttodo=value;
	   }

	   //选项显示与关闭
        $scope.isshow=false;
        $scope.cancle = function(){
		$scope.isshow = false;
	    }
	   //提醒
	   $scope.tixing='搜索所有提醒';
       document.querySelector("#tixing").onfocus=function(){
       	document.querySelector("#tiContent").style.display="none";
       };
       document.querySelector("#tixing").onblur=function(){
       	document.querySelector("#tiContent").style.display="block";
       }
       //选项
       var option=document.querySelector("#options-detail");
       document.querySelector(".choose").onclick=function(){
       	   if(option.style.display==="none"){
        	  option.style.display="block";
            }else{
       	     option.style.display="none";
           }
       }


}])

 
