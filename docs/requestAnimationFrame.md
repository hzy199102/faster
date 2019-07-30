requestAnimationFrame 深入调研
demo: test/requestAnimationFrame

1.  前言
    在 Web 应用中，实现动画效果的方法比较多，JavaScript 中可以通过定时器 setTimeout 来实现，css3 可以使用 transition 和 animation 来实现，html5 中的 canvas 也可以实现。除此之外，html5 还提供一个专门用于请求动画的 API，即 requestAnimationFrame（rAF），顾名思义就是 “请求动画帧”。

2.  屏幕绘制频率
    即图像在屏幕上更新的速度，也即屏幕上的图像每秒钟出现的次数，它的单位是赫兹(Hz)。 对于一般笔记本电脑，这个频率大概是 60Hz
    当你对着电脑屏幕什么也不做的情况下，显示器也会以每秒 60 次的频率正在不断的更新屏幕上的图像。为什么你感觉不到这个变化？ 那是因为人的眼睛有视觉停留效应，即前一副画面留在大脑的印象还没消失，紧接着后一副画面就跟上来了，这中间只间隔了 16.7ms(1000/60≈16.7)， 所以会让你误以为屏幕上的图像是静止不动的。而屏幕给你的这种感觉是对的，试想一下，如果刷新频率变成 1 次/秒，屏幕上的图像就会出现严重的闪烁，这样就很容易引起眼睛疲劳、酸痛和头晕目眩等症状。

3.  CSS 动画原理
    60Hz 的屏幕每 16.7ms 绘制一次，如果在屏幕每次绘制前，将元素的位置向左移动一个像素，即 1px，这样一来，屏幕每次绘制出来的图像位置都比前一个要差 1px，你就会看到图像在移动；而由于人眼的视觉停留效应，当前位置的图像停留在大脑的印象还没消失，紧接着图像又被移到了下一个位置，这样你所看到的效果就是，图像在流畅的移动。这就是视觉效果上形成的动画。

4.  setTimeout
    setTimeout 其实就是通过设置一个间隔时间来不断的改变图像的位置，从而达到动画效果的。但我们会发现，利用 seTimeout 实现的动画在某些低端机上会出现卡顿、抖动的现象。 这种现象的产生有两个原因：

    1. setTimeout 的执行时间并不是确定的。在 JavaScript 中， setTimeout 任务被放进了异步队列中，只有当主线程上的任务执行完以后，才会去检查该队列里的任务是否需要开始执行，
       所以 setTimeout 的实际执行时机一般要比其设定的时间晚一些。
    2. 刷新频率受 屏幕分辨率 和 屏幕尺寸 的影响，不同设备的屏幕绘制频率可能会不同，而 setTimeout 只能设置一个固定的时间间隔，这个时间不一定和屏幕的刷新时间相同。

    以上两种情况都会导致 setTimeout 的执行步调和屏幕的刷新步调不一致，从而引起丢帧现象。 那为什么步调不一致就会引起丢帧呢？
    setTimeout 的执行只是在内存中对元素属性进行改变，这个变化必须要等到屏幕下次绘制时才会被更新到屏幕上。如果两者的步调不一致，就可能会导致中间某一帧的操作被跨越过去，而直接更新下一帧的元素。假设屏幕每隔 16.7ms 刷新一次，而 setTimeout 每隔 10ms 设置图像向左移动 1px， 就会出现如下绘制过程（表格）：

    第 0 ms：屏幕未绘制， 等待中，setTimeout 也未执行，等待中；
    第 10 ms：屏幕未绘制，等待中，setTimeout 开始执行并设置元素属性 left=1px；
    第 16.7 ms：屏幕开始绘制，屏幕上的元素向左移动了 1px， setTimeout 未执行，继续等待中；
    第 20 ms：屏幕未绘制，等待中，setTimeout 开始执行并设置 left=2px;
    第 30 ms：屏幕未绘制，等待中，setTimeout 开始执行并设置 left=3px;
    第 33.4 ms：屏幕开始绘制，屏幕上的元素向左移动了 3px， setTimeout 未执行，继续等待中；
    ...
    从上面的绘制过程中可以看出，屏幕没有更新 left=2px 的那一帧画面，元素直接从 left=1px 的位置跳到了 left=3px 的的位置，这就是丢帧现象，这种现象就会引起动画卡顿。

5.  rAF
    与 setTimeout 相比，rAF 最大的优势是 由系统来决定回调函数的执行时机。具体一点讲就是，系统每次绘制之前会主动调用 rAF 中的回调函数，如果系统绘制率是 60Hz，那么回调函数就每 16.7ms 被执行一次，如果绘制频率是 75Hz，那么这个间隔时间就变成了 1000/75=13.3ms。换句话说就是，rAF 的执行步伐跟着系统的绘制频率走。它能保证回调函数在屏幕每一次的绘制间隔中只被执行一次，这样就不会引起丢帧现象，也不会导致动画出现卡顿的问题。

    var progress = 0;

    //回调函数
    function render() {
    progress += 1; //修改图像的位置

        if (progress < 100) {
               //在动画没有结束前，递归渲染
               window.requestAnimationFrame(render);
        }

    }

    //第一帧渲染
    window.requestAnimationFrame(render);

    rAF 还有以下两个优势：

    1. CPU 节能：使用 setTimeout 实现的动画，当页面被隐藏或最小化时，setTimeout 仍然在后台执行动画任务，由于此时页面处于不可见或不可用状态，刷新动画是没有意义的，而且还浪费 CPU 资源。
       而 rAF 则完全不同，当页面处理未激活的状态下，该页面的屏幕绘制任务也会被系统暂停，因此跟着系统步伐走的 rAF 也会停止渲染，当页面被激活时，动画就从上次停留的地方继续执行，有效节省了 CPU 开销。
    2. 函数节流：在高频率事件(resize,scroll 等)中，为了防止在一个刷新间隔内发生多次函数执行，使用 rAF 可保证每个绘制间隔内，函数只被执行一次，这样既能保证流畅性，
       也能更好的节省函数执行的开销。一个绘制间隔内函数执行多次时没有意义的，因为显示器每 16.7ms 绘制一次，多次绘制并不会在屏幕上体现出来。

6.  raf 优雅降级
    参考：https://github.com/darius/requestAnimationFrame【darius / requestAnimationFrame】
    if (!Date.now)
    Date.now = function() { return new Date().getTime(); };

    (function() {
    'use strict';

    var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
    var vp = vendors[i];
    window.requestAnimationFrame = window[vp+'RequestAnimationFrame'];
    window.cancelAnimationFrame = (window[vp+'CancelAnimationFrame']
    || window[vp+'CancelRequestAnimationFrame']);
    }
    if (/iP(ad|hone|od).\*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
    || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
    var lastTime = 0;
    window.requestAnimationFrame = function(callback) {
    var now = Date.now();
    var nextTime = Math.max(lastTime + 16, now);
    return setTimeout(function() { callback(lastTime = nextTime); },
    nextTime - now);
    };
    window.cancelAnimationFrame = clearTimeout;
    }
    }());

7.  raf 案例
    开发者经常用来检测耗时较长任务的黑客手段
    (function detectLongFrame() {
    var lastFrameTime = Date.now();
    requestAnimationFrame(function() {
    var currentFrameTime = Date.now();

        if (currentFrameTime - lastFrameTime > 50) {
        // Report long frame here...
        }

        detectLongFrame(currentFrameTime);

    });
    }());
    此代码以无限循环的 requestAnimationFrame 开头，并记录每次迭代所花费的时间。 如果当前时间距离前次时间超过 50 毫秒，则会认为原因在于存在耗时较长的任务。
    虽然大部分情况下此代码都行得通，但其也有不少缺点：

    此代码会给每个帧增加开销。
    此代码会阻止空闲块。
    此代码会严重消耗电池续航时间。
    性能测量代码最重要的规则是不应降低性能。

8.  在 scroll 或者 resize 下结合使用：
    经过测试完全没必要这样写，因为 scroll 已经是 60HZ 的频度操作，没必要在使用 window.requestAnimationFrame
    \$(window).scroll(e => {
    window.requestAnimationFrame(timestamp => {
    animation(timestamp);
    });
    // window.requestAnimationFrame(timestamp => {
    // animation(timestamp);
    // });
    });
