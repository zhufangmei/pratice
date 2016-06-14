window.onload=function(){
	//选项卡
		var fu=$('xuanxiang');
		var list=fu.getElementsByTagName('li');
		var divs=fu.getElementsByTagName('div');
		for (var i = 0;i<list.length;  i++) {
         
            list[i].id=i;
			list[i].onmouseover=function(){
				for (var j= 0;j<divs.length; j++)
               {  
               	divs[j].style.display="none";
               	//alert(this);window
               	//console.log(this.id)
               	list[j].style.borderBottom="1px solid #ccc";
               	this.style.borderBottom=0;
                divs[this.id].style.display="block";

            }
		};
			

	}
	//轮播器
	function $(id) {
			return typeof id==='string'?document.getElementById(id):id;
		}
		
			//轮播
			var obj=$('flash');

			var index=0;
			var left=$('left');
			var right=$('right');
			//console.log($("num"))
            var elements=$("pic").getElementsByTagName('li');
            var num=$("num").getElementsByTagName('li');
			obj.timer=setInterval(run,1000);
			//console.log(obj.timer=="function")
			function run(){
				for(var i=0;i<elements.length;i++){
               	   elements[i].style.display="none";
               	   num[i].className='';
               }        
               	   index++;
               
               if(index>elements.length-1){
               	   index=0;
               }
              else if(index<0){
               	   index=elements.length-1;
               }
              elements[index].style.display="block";
              num[index].className='active1';
			}
			obj.onmouseover=function(){
				clearInterval(obj.timer);
			}
           obj.onmouseout=function(){
           clearInterval(obj.timer);
				obj.timer=setInterval(run,1000);		
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
                num[index].className='active1';
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
                num[index].className='active1';
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

                      this.className='active1';
                    
                      elements[this.id].style.display="block";//这里不能用num[n]了，因为时间发生在循环结束后。
                      index=this.id;

				}
			}
		
		var floornav=$("floor-nav");
		var lis=floornav.getElementsByTagName("li");
		//console.log(lis)
		//var c=1
		floornav.style.display="none";

		window.onscroll=function(e){//谷歌和opera下为什么会有闪烁
			console.log(document.body.scrollTop)
			//e.preventDefault();
			//console.log(document.body.scrollTop)
			//为什么这句变成全局变量就不行了
			var Btop=document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop;
			if(Btop<20){
				floornav.style.display="none";
		}
         //
			else if(Btop>=20&&Btop<1000){
				floornav.style.display="block";
				for(var i=0;i<lis.length;i++){
					lis[i].style.backgroundColor="";
				}
				lis[0].style.backgroundColor="#b3d529";
				
				if(Btop>=850){

					floornav.style.top=Btop-100+"px";
					//alert(floornav.style.top)//为什么取不到值
				}
				
		}
		else if(Btop>=1000&&Btop<1600){
			floornav.style.top=Btop-100+"px";
			for(var i=0;i<lis.length;i++){
					lis[i].style.backgroundColor="";
				}
				lis[1].style.backgroundColor="#b3d529";
			
		}
		else if(Btop>=1600&&Btop<2000){
			floornav.style.top=Btop-100+"px";
			for(var i=0;i<lis.length;i++){
					lis[i].style.backgroundColor="";
				}
				lis[2].style.backgroundColor="#b3d529";
			
		}
		else if(Btop>=2000&&Btop<2400){
			floornav.style.top=Btop-100+"px";
			for(var i=0;i<lis.length;i++){
					lis[i].style.backgroundColor="";
				}
				lis[3].style.backgroundColor="#b3d529";
			
		}
		else if(Btop>=2400&&Btop<2800){
			floornav.style.top=Btop-100+"px";
			for(var i=0;i<lis.length;i++){
					lis[i].style.backgroundColor="";
				}
				lis[4].style.backgroundColor="#b3d529";
			
		}
		else if(Btop>=2800&&Btop<3200){
			floornav.style.top=Btop-100+"px";
			for(var i=0;i<lis.length;i++){
					lis[i].style.backgroundColor="";
				}
				lis[5].style.backgroundColor="#b3d529";
			
		}
		else if(Btop>=3200&&Btop<3600){
			floornav.style.top=Btop-100+"px";
			for(var i=0;i<lis.length;i++){
					lis[i].style.backgroundColor="";
				}
				lis[5].style.backgroundColor="#b3d529";
			
		}
		else if(Btop>=3600&&Btop<3800){
			floornav.style.top=Btop-100+"px";
			for(var i=0;i<lis.length;i++){
					lis[i].style.backgroundColor="";
				}
				lis[6].style.backgroundColor="#b3d529";
			
		}
		else if(Btop>=3800&&Btop<3900){
			floornav.style.top=Btop-100+"px";
			for(var i=0;i<lis.length;i++){
					lis[i].style.backgroundColor="";
				}
				lis[7].style.backgroundColor="#b3d529";
			
		}
		else if(Btop>=3900){
			floornav.style.top=Btop-100+"px";
			for(var i=0;i<lis.length;i++){
					lis[i].style.backgroundColor="";
				}
				lis[8].style.backgroundColor="#b3d529";
			
		}
		}
		//var Btop1=document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop
		//为什么识别不了
		lis[0].onclick=function(){
			
			if(document.documentElement.scrollTop){
				floornav.style.top=900-100+"px";
				document.documentElement.scrollTop=600;
			}
			else{
				floornav.style.top=900-100+"px";
				document.body.scrollTop=600;
			}
			
			
		}
		lis[1].onclick=function(){
			if(document.documentElement.scrollTop){
				document.documentElement.scrollTop=1500;
			}
			else{
				document.body.scrollTop=1500;

			}
			}
		lis[2].onclick=function(){
			if(document.documentElement.scrollTop){
				document.documentElement.scrollTop=1900;
			}
			else{
				document.body.scrollTop=1900;
			}
			
		}
       lis[3].onclick=function(){
       	if(document.documentElement.scrollTop){
				document.documentElement.scrollTop=2300;
			}
			else{
				document.body.scrollTop=2300;
			}
			
		}
		lis[4].onclick=function(){
			if(document.documentElement.scrollTop){
				document.documentElement.scrollTop=2700;
			}
			else{
				document.body.scrollTop=2700;
			}
			
		}
		lis[5].onclick=function(){
			if(document.documentElement.scrollTop){
				document.documentElement.scrollTop=3100;
			}
			else{
				document.body.scrollTop=3100;
			}
			}
		lis[6].onclick=function(){
			if(document.documentElement.scrollTop){
				document.documentElement.scrollTop=3600;
			}
			else{
				document.body.scrollTop=3600;
			}
			
		}
		lis[7].onclick=function(){
			if(document.documentElement.scrollTop){
				document.documentElement.scrollTop=3800;
			}
			else{
				document.body.scrollTop=3800;
			}
			
		}
		lis[8].onclick=function(){
			if(document.documentElement.scrollTop){
				document.documentElement.scrollTop=4000;
			}
			else{
				document.body.scrollTop=4000;
			}
			
		}
		lis[9].onclick=function(){
			var timer2=setInterval(function(){
				if(document.documentElement.scrollTop){
					if(document.documentElement.scrollTop>0){
                 	document.documentElement.scrollTop-=400
                 }
                 	else{
                   clearInterval(timer2);
                 }
			}
			else{
				if(document.body.scrollTop>0){
                 	document.body.scrollTop-=300
                 }
                 	else{
                   clearInterval(timer2);
                 }
			}
                 
			},50)
		}
		
		window.onbeforeunload = function() {   
			//var Btop2=document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop;
          // Btop2=0;//为什么这样写不行
           //alert( document.body.scrollTop)
           if(document.documentElement.scrollTop){
				document.documentElement.scrollTop=0;
			}
			else{
				document.body.scrollTop=0;
			}

       }  
	   
}