const lrcContent = "[00:00.000] 作词 : 지훈\n[00:01.000] 作曲 : 이승주/황찬희\n[00:15.164]It's a beautiful life\n[00:18.663]난 너의 곁에 있을게\n[00:24.164]It's a beautiful life\n[00:27.414]너의 뒤에 서 있을게\n[00:33.165]Beautiful love 하늘아래\n[00:40.172]너와 있다면\n[00:42.672]숨쉬는것만으로도 좋아\n[00:50.422]It's a beautiful life\n[00:52.672]Beautiful day\n[00:54.922]너의 기억에서 내가 살텐데\n[00:59.421]Beautiful life beautiful day\n[01:04.172]내 곁에서 머물러줘\n[01:08.172]Beautiful my love\n[01:12.672]Beautiful your heart\n[01:16.422]It's a beautiful life\n[01:25.173]It's a beautiful life\n[01:33.922]It's a beautiful life\n[01:37.173]언제나 널 지켜줄게\n[01:42.923]It's a beautiful life\n[01:45.423]내게 기댈수가 있게\n[01:51.673]Beautiful love\n[01:56.423]너의 눈물 너의 미소도\n[02:01.174]곁에서 함께 할 수 있도록\n[02:08.924]It's a beautiful life\n[02:11.424]Beautiful day\n[02:13.174]미치도록 널 사랑했었던 날\n[02:17.923]Beautiful life beautiful day\n[02:22.924]너를 잃고 싶지 않아\n[02:26.674]Beautiful my love\n[02:31.175]Beautiful your heart\n[02:34.924]It's a beautiful life\n[02:37.925]세상에 너와 닮은 추억이\n[02:44.425]또 덩그러니 내게 남겨져있어\n[02:52.925]너와의 기억 너와의 추억\n[03:01.674]It's a sorrowful life\n[03:03.925]Sorrowful day\n[03:05.425]슬픔을 이기지 못하는 내게\n[03:10.175]Sorrowful life sorrowful day\n[03:15.176]내 곁에서 떠나지마\n[03:18.676]추억속에 내가 살지 않도록\n[03:31.676]It's a beautiful life\n";

let lyricArr = [];
let lyric = lrcContent.split("\n");
let reg = /\[\d*:\d*(\.|:)\d*]/g;
for (let i = 0; i < lyric.length; i++) {
    let timeRegArr = lyric[i].match(reg);
    if (!timeRegArr) continue;
    // 获取歌词文本
    let text = lyric[i].replace(timeRegArr, "");
    // 转换歌词对应时间 [01:23.55] -> 83s
    let m = parseInt(timeRegArr[0].match(/\[\d*/i).toString().slice(1));
    // eslint-disable-next-line no-useless-escape
    let s = parseInt(timeRegArr[0].match(/\:\d*/i).toString().slice(1));
    let ms = parseInt(timeRegArr[0].match(/\.\d*/i).toString().slice(1));
    let time = parseInt(m * 60 + s + "." + ms, 10);
    lyricArr.push({ time, text })
}
const lyricBox = document.getElementById("container");
const audio = document.getElementById("audio");
const lyricBoxChildNodes = lyricBox.childNodes;
// 音频时长
const duration = audio.duration;
// 播放时长
let currentTime = 0;
// 音频播放监听
audio.addEventListener("timeupdate", (e) => {
    currentTime = e.target.currentTime;
    getCurrentLrc();
    if (currentTime === duration) {
        audio.play();
    }
});


function getCurrentLrc() {
    const index = lyricArr.findIndex((item, index) => {
        if (index + 1 < lyricArr.length) {
            if (currentTime - 0.5 > item.time && currentTime - 0.5 < lyricArr[index + 1].time) {
                return true
            }
            return false
        }
        return false
    });

    lyricBox.innerText = lyricArr[index] ? lyricArr[index].text : "";
}

function lyricBoxScrollTo(value) {
    lyricBox.scrollTo({
        top: value,
        behavior: "smooth",
    })
}

const handlePlay = () => {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}