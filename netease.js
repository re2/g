/******************************************
 * @name 网易云音乐
 * @description 解锁会员歌曲、音质
 * @channel https://t.me/yqc_123
 * @version 1.1.0
 * @update 2024-11-21
******************************************
脚本声明:
1. 本脚本仅用于学习研究，禁止用于商业用途
2. 本脚本不保证准确性、可靠性、完整性和及时性
3. 任何个人或组织均可无需经过通知而自由使用
4. 作者对任何脚本问题概不负责，包括由此产生的任何损失
5. 如果任何单位或个人认为该脚本可能涉嫌侵犯其权利，应及时通知并提供身份证明、所有权证明，我将在收到认证文件确认后删除
6. 请勿将本脚本用于商业用途，由此引起的问题与作者无关
7. 本脚本及其更新版权归作者所有
******************************************
hostname = interface*.music.163.com
^https?:\/\/(?:ipv4|interface\d?)\.music\.163\.com\/e?api\/(mine\/(collect|rn)\/header\/info|v\d\/user\/detail\/\d+|vipnewcenter\/app\/resource\/newaccountpage|music-vip-membership\/(client|front)\/vip\/info|batch|playlist\/privilege|search\/complex\/page|v\d\/(discovery\/recommend\/songs|playlist\/detail)) url request-header (\r\n)x-aeapi:.+(\r\n) request-header $1x-aeapi: false$2
^https?:\/\/interface\d?\.music\.163\.com\/e?api\/vip\/cashier\/tspopup\/get url reject-200
^https?:\/\/interface\d?\.music\.163\.com\/e?api\/(mine\/(collect|rn)\/header\/info|v\d\/user\/detail\/\d+|vipnewcenter\/app\/resource\/newaccountpage|music-vip-membership\/(client|front)\/vip\/info|batch|playlist\/privilege|search\/complex\/page|v\d\/(discovery\/recommend\/songs|playlist\/detail)) url script-response-body https://raw.githubusercontent.com/Yuheng0101/X/main/Scripts/NeteaseCloudMusic/netease.js
^https?:\/\/interface\d?\.music\.163\.com\/e?api\/(song\/enhance\/player\/url\/v\d|vipauth\/app\/auth\/query) url script-analyze-echo-response https://raw.githubusercontent.com/Yuheng0101/X/main/Scripts/NeteaseCloudMusic/netease.js
******************************************/