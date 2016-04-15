function $(id) {
			return typeof id==='string'?document.getElementById(id):id;
		}
		window.onload=function(){
			//轮播图
			var obj=document.getElementById('flash');
			var index=0;
			var left=$('left');
		
			var right=$('right');
            var elements=$("pic").getElementsByTagName('li');
            var num=$("num").getElementsByTagName('li');
			obj.timer=setInterval(run,1000);
			function run(){
				for(var i=0;i<elements.length;i++){
               	   elements[i].style.display="none";
               	   num[i].className='';
               }
               
              
               /*if(left.onclick!=null){
               	   index--;
               }
               else if(right.onclick!=null){
               	   index++;
               }*/
               
               	   index++;
               
               if(index>elements.length-1){
               	   index=0;
               }
              else if(index<0){
               	   index=elements.length-1;
               }
          
               	 
               
              elements[index].style.display="block";
              num[index].className='active';
			}
			obj.onmouseover=function(){
				clearInterval(obj.timer);
			}

           obj.onmouseout=function(){
           clearInterval(obj.timer);
				obj.timer=setInterval(run,2000);
			//}
			
			}
			
			left.onclick=function(){
                 index--;
                   if(index<0){
               	   index=elements.length-1;
               }
                   for(var i=0;i<elements.length;i++){
               	   elements[i].style.display="none";
               	   num[i].className='';
               }
                elements[index].style.display="block";
                num[index].className='active';
                //run();

			}
			right.onclick=function(){
                  index++;
                   if(index>elements.length-1){
               	   index=0;
               }
                   
                   for(var i=0;i<elements.length;i++){
               	   elements[i].style.display="none";
               	   num[i].className='';
               }
                elements[index].style.display="block";
                num[index].className='active';
                //run();


			}
			for(var n=0;n<num.length;n++){
                num[n].id=n;//给每个对象覆一个id值
            
          
				num[n].onmouseover=function(){
					       //[index=n;alert(index);]index 写在这里永远是四。
					       clearInterval(obj.timer);
                           for(var j=0;j<num.length;j++){
                        	elements[j].style.display="none";
                            num[j].className='';
                             }

                      this.className='active';
                    
                      elements[this.id].style.display="block";//这里不能用num[n]了，因为时间发生在循环结束后。
                      index=this.id;

				}
			}
			//选项卡
		var xuanxiang=document.getElementById('xuanxiang');
		var list=xuanxiang.getElementsByTagName('li');
		var divs=xuanxiang.getElementsByTagName('div');
		for (var i = 0;i<list.length;  i++) {
         
            list[i].id=i;
			list[i].onmouseover=function(){
				for (var j= 0;j<divs.length; j++)
               {  
               	divs[j].className='ka';
               	//alert(this);window
                divs[this.id].className='active1';

            }
		};
			

	}
	//一键分享
	var share1=document.getElementById("share");
	    	share1.onmouseover=function(){
          
                  move(0);

	    	}
	   


	    	share1.onmouseout=function(){
	    		move(-210);

              }
	    	var timer=null;
	    	function move(target){
                
                clearInterval(timer);
            timer=setInterval(function(){
                     var left=parseInt(getStyle(share1, 'left'));
                 
                     var speed=((target-left)/5);
                     speed=speed>0?Math.ceil(speed):Math.floor(speed);
                     if(left==target){
                     	clearInterval(timer);
                     }
                     else{
                     	
                     	share1.style.left=left+speed+"px";
                     }
                    
                },30);
         }
         function getStyle(element, attr) {
	    var value;
	   if (typeof window.getComputedStyle != 'undefined') {//W3C
		value = window.getComputedStyle(element, null)[attr];
	    } else if (typeof element.currentStyle != 'undefined') {//IE
		value = element.currentStyle[attr];
	  }
	   return value;
}
//实时显示时间
function getDate(){
  	var d=new Date();
	var day=d.getDate();
	var month=d.getMonth() + 1;
	var year=d.getFullYear();
	var hour=d.getHours();
	var minutes=d.getMinutes();
	var str=""+year+"年"+month+"月"+day+"日"+hour+"点"+minutes+"分";
	var div=document.getElementById("box11");   //在网页中显示  
   		if(typeof div.textContent=="string"){  
    		div.textContent=str;  
   		} 
   		else{  
    		div.innerText=str;  
   			}  
}
window.setInterval(getDate,1000);  
			
			}
		