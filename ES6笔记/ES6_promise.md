## Promise的含义
Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。

### > Promise对象有以下两个特点。
1. 对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：Pending（进行中）、Resolved（已完成，又称 Fulfilled）和Rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。<br/>
Promise对象的状态改变，只有两种可能：从Pending变为Resolved和从Pending变为Rejected。<br/>
只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。<br/>
如果改变已经发生了，就算你再对Promise对象添加回调函数，也会立即得到这个结果。<br/>
这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

### > Promise缺点
1. 无法取消Promise，一旦新建它就会立即执行，无法中途取消。
2. 如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
3. 当处于Pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

## 基本用法

### > 异步加载图片
	function loadImageAsync(url) {
	  return new Promise(function(resolve, reject) {
	    var image = new Image();
	
	    image.onload = function() {
	      resolve(image);
	    };
	
	    image.onerror = function() {
	      reject(new Error('Could not load image at ' + url));
	    };
	
	    image.src = url;
	  });
	}

### > Promise对象实现的Ajax操作
	var getJSON = function(url) {
	  var promise = new Promise(function(resolve, reject){
	    var client = new XMLHttpRequest();
	    client.open("GET", url);
	    client.onreadystatechange = handler;
	    client.responseType = "json";
	    client.setRequestHeader("Accept", "application/json");
	    client.send();
	
	    function handler() {
	      if (this.readyState !== 4) {
	        return;
	      }
	      if (this.status === 200) {
	        resolve(this.response);
	      } else {
	        reject(new Error(this.statusText));
	      }
	    };
	  });
	
	  return promise;
	};
	
	getJSON("/posts.json").then(function(json) {
	  console.log('Contents: ' + json);
	}, function(error) {
	  console.error('出错了', error);
	});