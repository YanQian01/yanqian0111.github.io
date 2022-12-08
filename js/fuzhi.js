/** 监听copy事件 */
document.addEventListener("copy",function(e){
    //复制的内容
    btf.snackbarShow('复制成功，请遵循GPL协议', false, 3000)
  })
  



  var CURSOR;

  Math.lerp = (a, b, n) => (1 - n) * a + n * b;
  
  const getStyle = (el, attr) => {
      try {
          return window.getComputedStyle
              ? window.getComputedStyle(el)[attr]
              : el.currentStyle[attr];
      } catch (e) {}
      return "";
  };
  
  class Cursor {
      constructor() {
          this.pos = {curr: null, prev: null};
          this.pt = [];
          this.create();
          this.init();
          this.render();
      }
  
      move(left, top) {
          this.cursor.style["left"] = `${left}px`;
          this.cursor.style["top"] = `${top}px`;
      }
  
      create() {
          if (!this.cursor) {
              this.cursor = document.createElement("div");
              this.cursor.id = "cursor";
              this.cursor.classList.add("hidden");
              document.body.append(this.cursor);
          }
  
          var el = document.getElementsByTagName('*');
          for (let i = 0; i < el.length; i++)
              if (getStyle(el[i], "cursor") == "pointer")
                  this.pt.push(el[i].outerHTML);
  
          document.body.appendChild((this.scr = document.createElement("style")));
          // 这里改变鼠标指针的颜色 由svg生成,更改fill属性下的颜色即可
          this.scr.innerHTML = `* {cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' width='8px' height='8px'><circle cx='4' cy='4' r='4' opacity='.8' fill='rgb(148, 243, 213)'/></svg>") 4 4, auto}`;
          //this.scr.innerHTML = `* {cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' width='8px' height='8px'><circle cx='4' cy='4' r='4' opacity='.5'/></svg>") 4 4, auto}`;
      }
  
      refresh() {
          this.scr.remove();
          this.cursor.classList.remove("hover");
          this.cursor.classList.remove("active");
          this.pos = {curr: null, prev: null};
          this.pt = [];
  
          this.create();
          this.init();
          this.render();
      }
  
      init() {
          document.onmouseover  = e => this.pt.includes(e.target.outerHTML) && this.cursor.classList.add("hover");
          document.onmouseout   = e => this.pt.includes(e.target.outerHTML) && this.cursor.classList.remove("hover");
          document.onmousemove  = e => {(this.pos.curr == null) && this.move(e.clientX - 8, e.clientY - 8); this.pos.curr = {x: e.clientX - 8, y: e.clientY - 8}; this.cursor.classList.remove("hidden");};
          document.onmouseenter = e => this.cursor.classList.remove("hidden");
          document.onmouseleave = e => this.cursor.classList.add("hidden");
          document.onmousedown  = e => this.cursor.classList.add("active");
          document.onmouseup    = e => this.cursor.classList.remove("active");
      }
  
      render() {
          if (this.pos.prev) {
              this.pos.prev.x = Math.lerp(this.pos.prev.x, this.pos.curr.x, 0.15);
              this.pos.prev.y = Math.lerp(this.pos.prev.y, this.pos.curr.y, 0.15);
              this.move(this.pos.prev.x, this.pos.prev.y);
          } else {
              this.pos.prev = this.pos.curr;
          }
          requestAnimationFrame(() => this.render());
      }
  }
  
  (() => {
      CURSOR = new Cursor();
      // 需要重新获取列表时，使用 CURSOR.refresh()
  })();
  
  
  // 作者: 脑阔疼
  // 链接: https://www.naokuoteng.cn/posts/dc5dc66a.html
  // 来源: 脑阔疼のBlog
  // 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



//首次访问弹窗
if (localStorage.getItem("popWelcomeWindow") != "0") {
  if(document.referrer==undefined||document.referrer.indexOf("yanqianljx.xyz")!=-1||document.referrer.indexOf("yanqianljx.xyz")!=-1){ //改成自己域名，注意是referrer!!! qwq
      Snackbar.show({
          pos: "top-right",
          showAction: false,
          text: '欢迎访问本站！'
      })
  }else{
      Snackbar.show({
              pos: "top-right",
              showAction: false,
              text: `欢迎来自${document.referrer.split("://")[1].split("/")[0]}的童鞋访问本站！`
          })
      localStorage.setItem("popWelcomeWindow", "0");
  }
}
if (sessionStorage.getItem("popCookieWindow") != "0") {
  setTimeout(function () {
      Snackbar.show({
          text: '本站使用Cookie和本地/会话存储保证浏览体验和使用统计',
          pos: 'bottom-right',
          actionText: "查看即食派蒙声明",
          onActionClick: function (element) {
              window.open("/license")
          },
      })
  }, 3000)
}
//不在弹出Cookie提醒
sessionStorage.setItem("popCookieWindow", "0");

//自带上文浏览器提示

function browserTC() {
  btf.snackbarShow("");
  Snackbar.show({
      text: '浏览器版本较低，即食派蒙样式可能错乱',
      actionText: '关闭',
      duration: '6000',
      pos: 'bottom-right'
  });
}
function browserVersion() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
  var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
  var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //Edge浏览器
  var isFirefox = userAgent.indexOf("Firefox") > -1; //Firefox浏览器
  var isOpera = userAgent.indexOf("Opera")>-1 || userAgent.indexOf("OPR")>-1 ; //Opera浏览器
  var isChrome = userAgent.indexOf("Chrome")>-1 && userAgent.indexOf("Safari")>-1 && userAgent.indexOf("Edge")==-1 && userAgent.indexOf("OPR")==-1; //Chrome浏览器
  var isSafari = userAgent.indexOf("Safari")>-1 && userAgent.indexOf("Chrome")==-1 && userAgent.indexOf("Edge")==-1 && userAgent.indexOf("OPR")==-1; //Safari浏览器
  if(isEdge) {
      if(userAgent.split('Edge/')[1].split('.')[0]<90){
          browserTC()
      }
  } else if(isFirefox) {
      if(userAgent.split('Firefox/')[1].split('.')[0]<90){
          browserTC()
      }
  } else if(isOpera) {
      if(userAgent.split('OPR/')[1].split('.')[0]<80){
          browserTC()
      }
  } else if(isChrome) {
      if(userAgent.split('Chrome/')[1].split('.')[0]<90){
          browserTC()
      }
  } else if(isSafari) {
      //不知道Safari哪个版本是该淘汰的老旧版本
  }
}
//2022-10-29修正了一个错误：过期时间应使用toGMTString()，而不是toUTCString()，否则实际过期时间在中国差了8小时
function setCookies(obj, limitTime) {
  let data = new Date(new Date().getTime() + limitTime * 24 * 60 * 60 * 1000).toGMTString()
  for (let i in obj) {
      document.cookie = i + '=' + obj[i] + ';expires=' + data
  }
}
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
      return unescape(arr[2]);
  else
      return null;
}
if(getCookie('browsertc')!=1){
  setCookies({
      browsertc: 1,
  }, 1);
  browserVersion();
}

