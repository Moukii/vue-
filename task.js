// 1.存取localstorage中的数据
var store = {
    save(key,value){
        localStorage.setItem(key,JSON.stringify(value));
    },
    fecth(key){
        return JSON.parse(localStorage.getItem(key)) || [];
    }
}

// 2.使用localstorage可将下列list注释掉
// var list = [
//     {
//         title: "观看世界杯",
//         isChecked: false,  //没有被选择中,任务没有完成
//     },
//     {
//         title: "阿根廷大战法国",
//         isChecked: true,
//     }
// ];

//3. 用下列的list得到数据
var list = store.fecth("list-key");

 new Vue({
     el:".main",
     data: {
         list: list,
         todo: "",
         editorTodos: "" , //记录正在编辑的数据
         beforeTitle:""
     },
    //  4.利用watch来监控list是数据属性，当属性对应的值发送变化时会执行函数
    // 浅监控监控到数组list中的一个对象的宏观变化，无法监控到list中一个对象里面的某个属性的拜年话
    watch:{
      /*  list: function(){
            store.save("list-key",this.list);
        }*/
        list:{
            handler:function(){      //深监控
                 store.save("list-key",this.list);
                },
           deep:true    //深度监控
        }
    },
     computed:{     //缓存待完成的任务个数
        noCheckLength: function(){
            return this.list.filter(function(item){
                return !item.isChecked
        }).length
         }
     },
     methods:{
         addTodo(ev){  //添加任务
             
                 this.list.push({
                     title: this.todo,
                     isChecked:false
                 });
             this.todo="";
         },
         deleteTodo(todo){
             var index = this.list.indexOf(todo);
             this.list.splice(index,1);
         },
         editorTodo(todo){
             //将之前的编辑内容保存下来
             this.beforeTitle=todo.title;
             this.editorTodos=todo;
         },
         //编辑完成
         editored(todo){
             this.editorTodos=" ";
         },
         cancelTodo(todo){      //取消编辑
              todo.title = this.beforeTitle;
              this.beforeTitle=" ";

              //让div显示，input隐藏
              this.editorTodos = " ";
         }
     },
     //双向绑定？？
     directives:{
         "focus": {
            //  update用于点击任务列表输入数据时更新元素
             update(el,binding){
                 console.log(binding.value);
                if(binding.value){
                      el.focus();
                }
             },
        
         }
     }
 })
