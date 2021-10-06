- webpack4 react redux axios
- 本地数据 mock
- 模拟谷歌灭霸

``` js

	npm i
	npm run dev
	npm run build

```
Google的灭霸彩蛋的技术原理
响指的动画

其实不复杂，是很多帧PNG图片拼一起的，然后逐帧画到Canvas上。 两幅图片：响指动画图，时间宝石动画图 声音文件：响指的，时间宝石恢复的，变沙子的声音

内容卡片变成沙子逐渐消失动画

首先它把卡片用 html2canvas（ https://html2canvas.hertzen.com/ ） 画到Canvas上； 然后它创建32个Canvas，把卡片的每一个像素随机复制到这32个Canvas中的一个上面， 这样每一个Canvas就随机分布了很多点，但拼在一起是完整的； 这32个Canvas动画之前是放在一起的； 再对每一个Canvas设置一个旋转动画，每一个Cavans旋转的轴和角度也是随机的，也有一点规律（这个我还没想明白啥规律）； 播放动画的时候用渐隐动画隐藏原始的卡片，让32个Canvas旋转，并逐渐消失， 因为每个Canvas上都只有一些小点而且在向不同的方向扩散，所以感觉上就像沙化了。 时间宝石恢复就简单了，播放音效，把隐藏的卡片都显示出来就好了。
