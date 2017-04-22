
## 变量
以@符号开头。格式：@变量名:变量值;

    @width:100px;

    body{
        width:@width;
    }

## 混合
带参数<br/>
不带参数

## 匹配模式

    .triangle(top,@w:5px,@c:#eee){
        border-width:@w;
        border-color:@c transparent transparent transparent;
        border-style:solid dashed dashed dashed;
    }
    .triangle(bottom,@w:5px,@c:#eee){
        border-width:@w;
        border-color:transparent transparent @c transparent;
        border-style:dashed dashed solid dashed;
    }
    .triangle(left,@w:5px,@c:#eee){
        border-width:@w;
        border-color:transparent @c transparent transparent;
        border-style:dashed solid dashed dashed;
    }
    .triangle(right,@w:5px,@c:#eee){
        border-width:@w;
        border-color:transparent transparent transparent @c;
        border-style:dashed dashed dashed solid;
    }
    .triangle(@_,@w:5px,@c:#eee){
        width:0;
        height:0;
        overflow:hidden;
    }
    .div{
        .triangle(left,100px,#FFF);
    }

## 运算
支持加减乘除，只要一个值带单位即可。

## 嵌套规则
不要嵌套过多的层级，影响效率。

    li{
        width:100px;
        height:100px;

        a{
            color:red;
            &:hover{//&代表上一层级
                color:green;
            }
        }
    }

## 避免编译、!important

    .test{
        width:~'calc(300px-30px)';
    }