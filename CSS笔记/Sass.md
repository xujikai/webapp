## 变量
    $width:100px;

#### > 普通变量
定义之后可以在全局内使用

    $fontSize: 12px;
    body{
        font-size:$fontSize;
    }

#### > 默认变量
仅需在值后面加入!default即可

    $baseLineHeight:1.5 !default;
    body{
        line-height: $baseLineHeight;
    }

sass的默认变量一般用来设置默认值，然后根据需求进行覆盖。<br/>
进行组件化开发非常有用。

    //覆盖默认变量，在默认变量之前
    $baseLineHeight: 2;
    $baseLineHeight: 1.5 !default;
    body{
        line-height: $baseLineHeight;
    }

#### > 全局变量和局部变量

    //定义全局变量(在选择器、函数、混合宏...的外面定义的变量为全局变量)
    $color: orange !default;
    .block {
      color: $color;//调用全局变量
    }
    em {
      $color: red;//定义局部变量
      a {
        color: $color;//调用局部变量
      }
    }
    span {
      color: $color;//调用全局变量
    }

## 嵌套
嵌套层级不宜过深

#### > 选择器嵌套

    nav {
        background: green;
        a {
        color: red;
        }
    }

#### > 属性嵌套
CSS 有一些属性前缀相同，只是后缀不一样，比如：border-top/border-right，与这个类似的还有 margin、padding、font 等属性。

    .box {
      border: {
       top: 1px solid red;
       bottom: 1px solid green;
      }
    }

#### > 伪类嵌套
伪类嵌套和属性嵌套非常类似，只不过他需要借助`&`符号一起配合使用。

    .clearfix{
        &:before,
        &:after {
            content:"";
            display: table;
          }
        &:after {
            clear:both;
            overflow: hidden;
        }
    }

## 混合宏
如果你的整个网站中有几处小样式类似，比如颜色，字体等，在 Sass 可以使用变量来统一处理，那么这种选择还是不错的。
但当你的样式变得越来越复杂，需要重复使用大段的样式时，使用变量就无法达到我们目了。

#### > 声明混合宏

    //不带参数
    @mixin border-radius{
        -webkit-border-radius: 5px;
        border-radius: 5px;
    }

    //带参数
    @mixin border-radius($radius:5px){
        -webkit-border-radius: $radius;
        border-radius: $radius;
    }

    //复杂
    @mixin box-shadow($shadow...) {
      @if length($shadow) >= 1 {
        @include prefixer(box-shadow, $shadow);
      } @else{
        $shadow:0 0 4px rgba(0,0,0,.3);
        @include prefixer(box-shadow, $shadow);
      }
    }

#### > 调用混合宏

    button {
        @include border-radius;
    }

#### > 混合宏的不足
会生成大量的冗余代码

## 扩展与继承
在 Sass 中是通过关键词`@extend`来继承已存在的类样式块，从而实现代码的继承。

    .btn {
      border: 1px solid #ccc;
      padding: 6px 10px;
      font-size: 14px;
    }

    .btn-primary {
      background-color: #f36;
      color: #fff;
      @extend .btn;
    }

    .btn-second {
      background-color: orange;
      color: #fff;
      @extend .btn;
    }

## 占位符
Sass中的占位符功能可以取代以前 CSS 中的基类造成的代码冗余的情形。
因为 %placeholder 声明的代码，如果不被 @extend 调用的话，不会产生任何代码。

    %mt5 {
      margin-top: 5px;
    }
    %pt5{
      padding-top: 5px;
    }

    .btn {
      @extend %mt5;
      @extend %pt5;
    }

    .block {
      @extend %mt5;

      span {
        @extend %pt5;
      }
    }