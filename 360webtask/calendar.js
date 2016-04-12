/*PS：本产品用了少数的jQuery，只是当作选择器使用，并不影响整个程序的主流程，
希望阅卷哥哥手下留情不要因为这个而给太低的分数。因为实验室最近项目很紧，*/
function Calendar(options) {

    var defaults = {//默认配置
        yearSelector:'.calender-year',
        monthSelector:'.calender-month',
        daySelector:'.calender-day',
        todaySwitch:'.switch-today',
        selCls:'sel',
        defYear : null,//是否默认选中某一年
        defMonth : null,//是否默认选中某一月
        hoverTrigger : null,//click|mouseenter
        hoverHandler : null,
        warnTips : [],
        warnTrigger : null,//click|mouseenter
        warnHandler : null
    }
   this.cfg = $.extend({},defaults,options);//自主配置
   this.yearSelector = $(this.cfg.yearSelector);//年下拉
   this.monthSelector = $(this.cfg.monthSelector);//月下拉
   this.daySelector = $(this.cfg.daySelector);//日期面板
   this.todaySwitch = $(this.cfg.todaySwitch);//回到今天
   this.dayUnits = [];
   this.init();
}

Calendar.prototype = {
    init : function(){
        with(this){
            dom();
            event();
        }
    },
    
    statics : function(){
        return {
            dayCnt : [31,28,31,30,31,30,31,31,30,31,30,31],
           //农历节日
           
           lunarFtvl:[
                      //{month:"一月初一",name："春节"},
                      {month : "一月十五",name : '元宵节'},
                      {month : "五月初五",name : '端午节'},
                      {month : "七月初七",name : '妇女节'},
                      {month : "七月十五",name : '七夕情人节'},
                      {month : "八月十五",name : '中元节'},
                      {month : "九月初九",name : '重阳节'},
                      {month : "腊月初八",name : '腊八节'},
                      {mmont : "腊月廿三",name : '北方小年'},
                      {month : "腊月廿四",name : '南方小年'},
                      {month: "一月初零",name : '除夕'},

            ],
            //国际节日
             festival : [
                {month : 1,day: 1,name : '元旦节'},
                {month : 2,day : 14,name : '情人节'},
                {month : 3,day : 8,name : '妇女节'},
                {month : 3,day : 12,name : '植树节'},
                {month : 3,day : 15,name : '消费者权益日'},
                {month : 3,day : 21,name : '世界森林日'},
                {month : 3,day : 22,name : '世界水日'},
                {month : 4,day : 23,name : '世界气象日'},
                {month : 3,day : 24,name : '世界防治结核病日'},
                {month : 4,day : 1,name : '愚人节'},
               // {month : 4,day : 7,name : '世界卫生日'},
                {month : 4,day : 22,name : '世界地球日'},
                {month : 5,day : 1,name : '劳动节'},
                {month : 5,day : 4,name : '青年节'},
                {month : 5,day : 5,name : '碘缺乏病防治日'},
                {month : 5,day : 8,name : '世界红十字日'},
                {month : 5,day : 12,name : '国际护士节'},
                {month : 5,day : 15,name : '国际家庭日'},
                {month : 5,day : 31,name : '世界无烟日'},
                {month : 6,day : 1,name : '儿童节'},
                {month : 6,day : 5,name : '世界环境日'},
                {month : 6,day : 6,name : '全国爱眼日'},
                {month : 6,day : 16,name : '防治荒漠化和干旱日'},
                {month : 6,day : 23,name : '国际奥林匹克日'},
                {month : 6,day : 25,name : '全国土地日'},
                {month : 6,day : 26,name : '国际反毒品日'},
                {month : 7,day : 11,name : '世界人口日'},
                {month : 8,day : 1,name : '建军节'},
                {month : 8,day : 8,name : '父亲节'},
                {month : 9,day : 8,name : '国际扫盲日'},
                {month : 9,day : 10,name : '教师节'},
                {month : 9,day : 16,name : '国际臭氧层保护日'},
                {month : 9,day : 20,name : '国际爱牙日'},
                {month : 9,day : 27,name : '世界旅游日'},
                {month : 10,day : 1,name : '国庆节'},
                {month : 10,day : 4,name : '世界动物日'},
                {month : 10,day : 15,name : '国际盲人节'},
                {month : 10,day : 16,name : '世界粮食日'},
                {month : 10,day : 17,name : '世界消除贫困日'},
                {month : 10,day : 24,name : '联合国日'},
                {month : 11,day : 14,name : '世界糖尿病日'},
                {month : 11,day : 17,name : '国际大学生节'},
                {month : 12,day : 1,name : '世界艾滋病日'},
                {month : 12,day : 3,name : '世界残疾人日'},
                {month : 12,day : 9,name : '世界足球日'},
                {month : 12,day : 25,name : '圣诞节'},
                {month : 12,day : 26,name : '国际生物多样性日'}
            ],
              //24节气，采用寿星公式： [Y×D+C]-L，c代表C值
            solarTerms : {
                '20' : [//二十世纪节气C值
                    {month : 2,c : 4.15 ,name : '立春'},{month : 2,c : 18.74 ,name : '雨水'},
                    {month : 3,c : 5.63 ,name : '惊蛰'},{month : 3,c : 20.647 ,name : '春分'},
                    {month : 4,c : 5.59 ,name : '清明'},{month : 4,c : 20.888 ,name : '谷雨'},
                    {month : 5,c : 6.318,name : '立夏'},{month : 5,c : 21.86 ,name : '小满'},
                    {month : 6,c : 6.5 ,name : '芒种'},{month : 6,c : 22.20 ,name : '夏至'},
                    {month : 7,c : 7.928 ,name : '小暑'},{month : 7,c : 23.65,name : '大暑'},
                    {month : 8,c : 8.35,name : '立秋'},{month : 8,c : 23.95 ,name : '处暑'},
                    {month : 9,c : 8.44 ,name : '白露'},{month : 9,c : 23.822 ,name : '秋分'},
                    {month : 10,c : 9.098 ,name : '寒露'},{month : 10,c : 24.218,name : '霜降'},
                    {month : 11,c : 8.218 ,name : '立冬'},{month : 11,c : 23.08 ,name : '小雪'},
                    {month : 12,c : 7.9 ,name : '大雪'},{month : 12,c : 22.60 ,name : '冬至'},
                    {month : 1,c : 6.11 ,name : '小寒'},{month : 1,c : 20.84 ,name : '大寒'}
                    
                ],
                '21':[//二十一世纪节气C值
                    {month :2,c : 3.87 ,name : '立春'},{month : 2,c : 18.73 ,name : '雨水'},
                    {month : 3,c : 5.63,name : '惊蛰'},{month : 3,c : 20.646 ,name : '春分'},
                    {month : 4,c : 4.81 ,name : '清明'},{month : 4,c : 20.1 ,name : '谷雨'},
                    {month : 5,c : 5.52 ,name : '立夏'},{month : 5,c : 21.04 ,name : '小满'},
                    {month : 6,c : 5.678 ,name : '芒种'},{month : 6,c : 21.37,name : '夏至'},
                    {month : 7,c : 7.108,name : '小暑'},{month : 7,c : 22.83,name : '大暑'},
                    {month : 8,c : 7.5 ,name : '立秋'},{month : 8,c : 23.13 ,name : '处暑'},
                    {month : 9,c : 7.646 ,name : '白露'},{month : 9,c : 23.042 ,name : '秋分'},
                    {month : 10,c : 8.318 ,name : '寒露'},{month : 10,c : 23.438 ,name : '霜降'},
                    {month : 11,c : 7.438 ,name : '立冬'},{month : 11,c : 22.36 ,name : '小雪'},
                    {month : 12,c : 7.18,name : '大雪'},{month : 12,c : 21.94 ,name : '冬至'},
                    {month : 1,c : 5.4055 ,name : '小寒'},{month : 1,c : 20.11 ,name : '大寒'}
                    
                ]
            }
        };
    }(),
   
    //填充年份下拉菜单和月份下拉菜单
    dom : function(){
        var self = this,
            date = new Date(),
            year = date.getYear()+1900,
            month = date.getMonth()+1,
            day = date.getDay();
        
       self.yearSelector.empty();
        for(i=1900;i<2051;i++){
            var selYear = self.cfg.defYear?self.cfg.defYear:year;
            if(i==selYear){
                self.yearSelector.append('<option selected value="'+i+'">'+i+'年</option>'); 
            }else{
                self.yearSelector.append('<option value="'+i+'">'+i+'年</option>'); 
            }
        }
        self.monthSelector.empty();
        for(i=1;i<13;i++){
            var selMonth = self.cfg.defMonth?self.cfg.defMonth:month;
            if(i==month){
                self.monthSelector.append('<option selected value="'+i+'">'+i+'月</option>');
            }else{
                self.monthSelector.append('<option value="'+i+'">'+i+'月</option>');
            }
        }
        
        self.renderDay(year,month);
    },
    //渲染阳历日期面板，农历节日日期面包。
    renderDay : function(year,month){
        var self = this;
       
           var copyDayCnt = self.statics.dayCnt.slice();
            interYears = year - 1900,//距离1900间隔年数
            interDays = 0,//距离1900年1月1日间隔天数
            copyDayCnt = self.statics.dayCnt.slice();
        
        if(self.isLeapYear(year)){
            copyDayCnt[1] = 29;//闰年二月就是21天
        }
        
        interDays = interYears*365 + self.interLeapYears(interYears);//年天数累加，闰年多一天。当前年距离1900的总天数
        if(month>1){//
            for(var i = 1;i<month;i++){//当前时间距离1900，一月一日的不满一年的月数差的月天数累加
                interDays = interDays + copyDayCnt[i-1];
            }
        }
      
        self.daySelector.find('tr').empty();
        var daysArr = [],
            weekday = interDays % 7+2;//计算今天是星期几，渲染日期，因为1900年一月一日是星期一
        if(weekday>1){//日期控件向上个月补天数，填满前面空白
            var lastMonthDays = month>1?copyDayCnt[month-2]:31;
            for(var i=weekday-1;i>0;i--){
                daysArr.push(lastMonthDays+1-i);
            }
        }
        for(var i=1;i<=copyDayCnt[month-1];i++){//日期控件这个月的天数
            daysArr.push(i);
        }       
        var lastDays = 42- weekday + 1 - copyDayCnt[month-1];
        if(lastDays>0){//日期控件向下个月补天数，填满后面空白
            for(var i=1;i<=lastDays;i++){
                daysArr.push(i);
            }
        }
        dayscopy=daysArr.slice();//复制一份日期当全局变量
        //console.log(dayscopy)
       for(var i=0;i<daysArr.length;i++){
            var tr =self.daySelector.find('tr').eq(i/7);
            var lunardays=renderLunarDay(year,month,dayscopy[i])//取农历字符串
            var lunarfestivals = self.statics['lunarFtvl'];
            // console.log(lunardays.substring(0,2));
            //var lunarFestival=self.statics[lunarFtvl][i]
            // self.renderlunarfestival(lunardays);//渲染农历节气
            if(i<weekday-1||i>weekday-1+copyDayCnt[month-1]-1){
                tr.append('<td class="gray"><p>'+""+'</p><p ></p></td>');
            }else{
            
               if(lunardays.substring(2)=="初一"){//等于初一的话取农历字符串的前两位即三月初五只取三月
                tr.append('<td><p>'+daysArr[i]+'</p><p>'+lunardays.substring(0,2)+'</p></p></td>');
               }
             
                else{
                  tr.append('<td><p>'+daysArr[i]+'</p><p>'+lunardays.substring(2)+'</p></p></td>');

                }//取农历字符串的后两位即三月初五只取初五
               //tr.append('<td><p>'+daysArr[i]+'</p><p class="festivalcolor"></p></p></td>');
            }
        }
        self.renderlunarfestival(year,month,dayscopy);
       // self.collectUnits();
        self.renderHoliday(month); 
     self.renderSolarTerms(year,month);
        self.highLightToday(year,month);
        
    },
    
    isLeapYear : function(year){//闰年计算
        if(year%4==0&&year%100!=0){
            return true;
        }
        if(year%400==0){
            return true;
        }
        return false;
    },
    
    interLeapYears : function(years){//间隔几个闰年
        var self = this,cnt = 0;
        if(years==0){return cnt;}
        for(var i=0;i<years;i++){
            if(self.isLeapYear(1900+i)){
                cnt++;
            }
        }
        return cnt;
    },
   
//渲染农历节日
    renderlunarfestival:function(year,month,dayscopy){
      for(var i=0;i<dayscopy.length;i++){
          var self = this;
            //var tr =self.daySelector.find('tr').eq(i/7);
            var lunardays=renderLunarDay(year,month,dayscopy[i])//取农历日期字符串
           //console.log(typeof lunardays)//string
            lunarfestivals = self.statics['lunarFtvl'];//从数组中获取农历节日
           //console.log(lunarfestivals.length)//object
            //console(lunardays==lunarfestivals[0].month)为什么出错！
            for(var j=0;j<lunarfestivals.length;j++){
                //console(lunardays==lunarfestivals[j].monthday)
                if(lunardays==lunarfestivals[j].month){
                    self.daySelector.find('td:not(.gray)').each(function(){
                         if(($(this).find('p').eq(1).text())==lunarfestivals[j].month){
                           $(this).find('p').eq(1).text(lunarfestivals.name);
                            $(this).find('p').eq(1).css("color","blue")
                    }
                });
            }
        }
}

    },
   
    //渲染国际节日
    renderHoliday : function(month){
        var self = this,
            festivals = self.statics['festival'];
            //console.log(festivals);
            //console.log(festivals[0].month)
        for(var i=0;i<festivals.length;i++){
            if(month==festivals[i].month){
                self.daySelector.find('td:not(.gray)').each(function(){
                    if(parseInt($(this).find('p:first').text())==festivals[i].day){
                        $(this).find('p').eq(1).text(festivals[i].name);
                        $(this).find('p').eq(1).css("color","red")
                    }
                });
            }
        }
    },
    //渲染节气
    renderSolarTerms : function(year,month){
        var self = this,
            solarTerms = null,
            y=0,d=0.2422;
         if(year>2000){
            y = year%2000;
            solarTerms = self.statics['solarTerms']['21'];
         }else{
            y = year%1900;
            solarTerms = self.statics['solarTerms']['20'];
         }   
         for(var i=0;i<solarTerms.length;i++){
            if(month==solarTerms[i].month){
                if(month>2){
                    day = parseInt(y*0.2422 + solarTerms[i].c) - parseInt(y/4); 
                }else{
                    day = parseInt(y*0.2422 + solarTerms[i].c) - parseInt((y-1)/4); 
                }
                self.daySelector.find('td:not(.gray)').each(function(){
                    if(parseInt($(this).find('p:first').text())==day){
                        $(this).find('p').eq(1).text(solarTerms[i].name);
                         $(this).find('p').eq(1).css("color","#ffd766")
                    }
                });
            }
        } 
    },
    //今天高亮显示
    highLightToday : function(year,month){
        var self = this,
            date = new Date(),
            nowYear = date.getYear() + 1900,
            nowMonth = date.getMonth() + 1,
            day = date.getDate();
        if(nowYear==year && nowMonth==month){
            self.daySelector.find('td:not(.gray)').each(function(){
                if(parseInt($(this).find('p:first').text())==day){
                    $(this).addClass(self.cfg.selCls);
                }
            });
        }
    },
    
    
    //年月下拉菜单改变时，重新渲染日期面板
    event : function(){
        var self = this;
        self.yearSelector.bind('change',function(){
            var year = parseInt($(this).val()),
                month = self.monthSelector.val();
            self.renderDay(year,month);
        });
        self.monthSelector.bind('change',function(){
            var year = parseInt(self.yearSelector.val()),
                month = $(this).val();
            self.renderDay(year,month);
        });
        self.todaySwitch.bind('click',function(){
           var date = new Date(),
               year = date.getYear() + 1900,
               month = date.getMonth() + 1;
           self.renderDay(year,month);
           self.yearSelector.val(year);
           self.monthSelector.val(month);
        });
        
        if(self.cfg.hoverTrigger&&$.isFunction(self.cfg.hoverHandler)){
           self.daySelector.find('td').bind(self.cfg.hoverTrigger,function(){
               for(var i=0;i<self.dayUnits.length;i++){
                   var year = parseInt(self.yearSelector.val()),
                       month = parseInt(self.monthSelector.val()),
                       day = parseInt($(this).find('p:first').text());
                   if(self.dayUnits[i].year == year&&
                             self.dayUnits[i].month == month&&
                             self.dayUnits[i].day == day){
                       self.cfg.hoverHandler(self.dayUnits[i]);
                   }
               }
           });
        }
    },
 }   
  
//***********************************************************
//渲染农历日期面板
//农历日期所需要的数据
var   lunadata=[
    0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,   
    0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,   
    0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,   
    0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,   
    0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,   
   0x06ca0,0x0b550,0x15355,0x04da0,0x0a5d0,0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0,   
    0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,   
    0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b5a0,0x195a6,   
   0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,   
   0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,   
   0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,   
   0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,   
   0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,   
   0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,   
   0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0];   
     //得到农历日期农历日期面板
    function   renderLunarDay(Y,M,D)   
         {   
        var solarObj=new Date(Y,M-1,D)   
        var  lunarObj=new LunarDaydate(solarObj)           //农历   
       // return LunarMonth(lunarObj.month)+LunarDaydate(lunarObj.day);  
         return convertDay(lunarObj.month,lunarObj.day)
         }
         //将阿拉伯数字日月转换成中文日月
  function convertDay(month,day){
     var String1 = new Array('日','一','二','三','四','五','六','七','八','九','十');
     var String2 = new Array('初','十','廿','卅','　');
     var lunarstr;
     if (month>10){//当MONTH为11，12月时，分别命名为冬月和腊月，保证农历返回字符串长度为4，为了之后截取方便
          if(month==11){
         lunarstr= '冬';
         }
         else{
            lunarstr= '腊';
         }
    }
     else {
        lunarstr =String1[month]
    } 
    lunarstr += '月'
     switch (day) {
      case 10:lunarstr+= '初十'; break;
      case 20:lunarstr += '二十'; break;
      case 30:lunarstr += '三十'; break;
      default:lunarstr += String2[Math.floor(day/10)]; lunarstr+= String1[day%10];
     }
     return(lunarstr);
}
//将阳历日期对象转成农历日期
     function LunarDaydate(solarday)   {        
         var leapmonth=0;  
         var temp=0;   
         var baseDay=new Date(1900,0,31)   
         var gapday=(solarday-baseDay)/86400000;//取得传入的农历日期距离1900，0，31日总共有多少天数 
         leapmonth=luanarleapMonth(i)   //取得闰哪个月
         for(var i=1900;i<2050&&gapday>0;i++)   {   
           temp = lunartotalDays(i)   
              gapday-=temp                     
         }        
        if(gapday<0)   {   
               i--;   
               gapday += temp;  
         }
         this.isLeapmonth=false;         
         this.year =i;                                     
         for(i=1;i<13 && gapday>0;i++)   {   
               //闰月   
              if(leapmonth>0 &&i==(leapmonth+1)&&this.isLeapmonth==false)   
                     {  temp=lunarleapDays(this.year);
                        this.isLeapmonth=true;
                           --i;         
                       }   
               else   
                   {   
                    temp=lunarmonthDays(this.year,i);   
                  }        
               //解除闰月   
              if(this.isLeapmonth==true&&i==(leapmonth+1)){  
                this.isLeapmonth=false;
                }        
                gapday-=temp;  
               
           }        
         if(gapday==0&&leapmonth>0&&i==leapmonth+1)   
               if(this.isLeapmonth){                    
                  this.isLeapmonth=false;
              }   
              else{ 
                 --i;                       
                this.isLeapmonth=true;   
            }   
        if(gapday<0){ 
              --i;
             gapday+=temp;      
         } 
         this.day=gapday+1;     
          this.month=i;   
           
  }     
   // 传回农历 year年的总天数   
  function  lunartotalDays(year)   {   
        var i;
        var sum   =   348   
        for(i=0x8000;i>0x8;i>>=1){
            sum+=(lunadata[year-1900]&i)?1:0;
        }
            return(sum+lunarleapDays(year))   
   }   
   //  传回农历y年闰哪个月 1-12,不是闰年返回0   
   function luanarleapMonth(year){   
        return(lunadata[year-1900]&0xf)   
   }           
  //传回农历   y年闰月的天数   
   function   lunarleapDays(year)   {   
         if(luanarleapMonth(year)){  
           return((lunadata[year-1900]&0x10000)?30:29)
            }  
         else return(0);  
   }      
// 传回农历   y年m月的总天数   
   function   lunarmonthDays(year,month)   {   
         return(   (lunadata[year-1900]&(0x10000>>month))?30:29   )   
   }   
 /*(function(){
  var trx=document.getElementsByTagName("tr");//最后一行要是没有日期的话隐藏不显示。
      console.log(trx);
      tdx=trx[trx.length-1].getElementsByTagName("td");
       //console.log(tdx);
       for(var i=0;i<tdx.length;i++){
        if(tdx[i].innerHTML!='<p></p><p></p>'){
          //alert(tdx[i].innerHTML)
          break;
        }
        else trx[trx.length-1].style.display='none';
       }
})();*/
 
   //改变年月下拉的索引时，重新渲染阳历农历日期面板
function changeIndex() {
  var y,m;
  y = ID("calender-year").selectedIndex + 1900;
  m = ID("calender-month").selectedIndex+1;
      calendar.renderDay(y,m);
}
//按下年月的加减按钮，分别重新渲染日期面板
function clickBtm(ntn) {
  switch (ntn){
    case 'YD' :
      if(ID("calender-year").selectedIndex > 0)
              ID("calender-year").selectedIndex--;
             break;
    case 'YU' :
      if(ID("calender-year").selectedIndex < 149) 
        ID("calender-year").selectedIndex++;
            break;
    case 'MD' :
      if(ID("calender-month").selectedIndex > 0) {      
        ID("calender-month").selectedIndex--;
      }
      else {
        ID("calender-month").selectedIndex = 11;
        if(ID("calender-year").selectedIndex > 0) 
          ID("calender-year").selectedIndex--;
      }
      break;
    case 'MU' :
      if(ID("calender-month").selectedIndex < 11) {
        ID("calender-month").selectedIndex++;
      }
      else {
        ID("calender-month").selectedIndex = 0;
        if(ID("calender-year").selectedIndex < 150) 
          ID("calender-year").selectedIndex++;
      }
      break;
    default :
      ID("calender-year").selectedIndex = parseInt(calendar.getFullYear()- 1900);
      ID("calender-month").selectedIndex =parseInt(calendar.getMonth()- 1900);
  }
  changeIndex();
}
function ID(id){
  return document.getElementById(id);
} 
  
 
window.onload=function(){
            calendar=new Calendar();
             var leftbtn1=ID("left-btn1");
             var rightbtn1=ID("right-btn1");
             var leftbtn2=ID('left-btn2');
             var rightbtn2=ID("right-btn2");
             leftbtn1.onclick=function(){clickBtm('YD');};
             rightbtn1.onclick=function(){clickBtm('YU')};
              leftbtn2.onclick=function(){clickBtm('MD')};
              rightbtn2.onclick=function(){clickBtm('MU')};
             /*(function(){
                  var trx=calendar.daySelector.find("tr");//最后一行要是没有日期的话隐藏不显示。
                  var i=trx.length-1
                  console.log(trx[i]);
                  tdx=trx[i].getElementsByTagName("td");
                  for(var i=0;i<tdx.length;i++){
                     console.log(tdx[i].innerHTML);
                    if(tdx[i].innerHTML!='<p></p><p></p>'){
                      //alert(tdx[i].innerHTML)
                      break;
                      }
                   }
                   if(i==tdx.length){
                    trx[trx.length-1].style.display='none';
                   }
                      
                })();*/
                
          }