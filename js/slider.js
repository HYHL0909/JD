class Slider{
    constructor(id){
        this.box=document.querySelector(id)
        this.picBox=this.box.querySelector("ul")
        this.indexBox=this.box.querySelector(".index-box")
        this.sliderWidth=this.box.clientWidth

        this.index=1

        this.animated=false
        this.Sliders=this.picBox.children.length


        this.init()
    }
    init(){
        console.log("slider")

        // 动态初始化小圆点
        this.initPoint()
        this.copyPic()
        this.leftRight()

    }

    // 动态初始化小圆点
    initPoint(){

        const num=this.picBox.children.length;//获取小圆点的个数

        let frg=document.createDocumentFragment();

        for(let i=0;i<num;i++){
            let li=document.createElement("li")
            li.setAttribute("data-index",i+1)
            if(i==0){
                li.className="active";
            }
            frg.appendChild(li)

        }
        this.indexBox.children[0].style.width=num*10*2+"px";
        this.indexBox.children[0].appendChild(frg)
    

        this.indexBox.children[0].addEventListener("click",(e)=>{
            console.log("point")
            let pointIndex=(e.target).getAttribute("data-index")

            let offset= (pointIndex-this.index)*this.sliderWidth
            this.index=pointIndex
            this.move(offset)
           

        })
        



    }

    // 企业级轮播图


    // 生成辅助图
    copyPic(){
        // 克隆第一个和最后页面
        const first=this.picBox.firstElementChild.cloneNode(true)
        const last=this.picBox.lastElementChild.cloneNode(true)

        // 将第一个和最后一个页面分别添加到最后一个页面后面和第一个页面前面
        this.picBox.appendChild(first)
        this.picBox.insertBefore(last,this.picBox.firstElementChild)

        // 这样的话会导致第一张图显示的是原本在最后的一张图，因此我们如此解决
        // 也可以在第一张图的left设置为-宽度，就是low了点
        this.picBox.style.width=this.sliderWidth*this.picBox.children.length+"px";
        this.picBox.style.left=-1*this.sliderWidth+"px";


    }

    //重点
    animate(offset){
        const time=1000//整个图片需要移动1s
        const rate=100 //我们稍微移动1次是0.1秒
        let speed =offset/(time/rate) //速度是每次移动的位移
        let goal=parseFloat(this.picBox.style.left)-offset

        this.animated=true

        let animate=setInterval(
            ()=>{

            if(this.picBox.style.left==goal||Math.abs(Math.abs(parseFloat(this.picBox.style.left))-Math.abs(goal))< Math.abs(speed))
            
            {
                this.picBox.style.left==goal
                clearInterval(animate)
                this.animated=false

                if(parseFloat(this.picBox.style.left)==0){

                    //狸猫换太子，将第一个的第五换成第五个的第五，这里的五就是图片的个数
                    this.picBox.style.left=-this.sliders*this.sliderWidth+"px"

                }else if(parseFloat(this.picBox.style.left)==-(this.sliders)*this.sliderWidth){
                    this.picBox.style.left=-this.sliderWidth+"px"

                }

            }else{
                this.picBox.style.left=parseFloat(this.picBox.style.left)-speed+"px"

            }
        },rate)
        
    }
    move(offset){
        this.animate(offset)

        //还要就是小圆点也是跟着图片的切换一起动的
        //实现逻辑就是将发光的小圆点的classname改成"active""
        const num=this.indexBox.children[0].children.length

        for(let i=0;i<num;i++){
            this.indexBox.children[0].children[i].className=""
        }
        this.indexBox.children[0].children[this.index-1].className="active"


    }

    

    //左右轮播切换的功能,点击轮换键获得图片
    leftRight(){
        this.box.querySelector(".left-box").addEventListener("click",()=>{
            console.log("left");
         
            
            //如果向右按超出了，则
            if(this.animated){
                return
            }
            if(this.index-1<1){

                this.index=this.Sliders
            }else{
                this.index--
            }
            console.log(this.index)
            this.move(-this.sliderWidth)
        })

        this.box.querySelector(".right-box").addEventListener("click",()=>{
            console.log("right")
            console.log(this.sliderWidth)//590

            if(this.animated){
                return
            }
            if(this.index+1>this.Sliders){
                this.index=1
            }else{
                this.index++
            }

            this.move(this.sliderWidth)
        })


    }



}