
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
170
171
172
173
174
175
176
177
178
179
180
181
182
183
184
185
186
187
188
189
190
191
192
//兼容loon和qx

//获取cookie重写配置:

//Qx:https://youhui.95516.com/newsign/public/app/index.html url script-request-header https://gitee.com/passerby-b/javascript/raw/master/unipay.js

//Loon:http-request https://youhui.95516.com/newsign/public/app/index.html script-path=https://gitee.com/passerby-b/javascript/raw/master/unipay.js, requires-body=true, timeout=10, tag=云闪付签到

//打开重写后进入云闪付签到页面,提示获得Cookie即可,一定要等签到页面加载完成,获取cookie成功后立刻划掉云闪付后台

//添加MITM hostname:youhui.95516.com


var cookie = ''; //手动获取cookie填写此处

var $tool = tool();
try {
    console.log("云闪付签到脚本开始!");
    var img = "https://is5-ssl.mzstatic.com/image/thumb/Purple114/v4/53/bc/b5/53bcb52a-6c33-67cc-0c70-faf4ffbdb71e/AppIcon-0-0-1x_U007emarketing-0-0-0-6-0-0-85-220.png/230x0w.png";
    if (typeof $request != "undefined") {
        if ($request.url.indexOf("youhui.95516.com/newsign/public/app/index.html") > -1) {
            var Cookie = $request.headers["Cookie"];
            if (!!Cookie) {
                $tool.setkeyval(Cookie, "UniCookie");
                $tool.notify("云闪付签到!", "获得Cookie", Cookie, { img: img });
            }
        }
    }
    else {
        var url = 'https://youhui.95516.com/newsign/api/daily_sign_in';
        var method = 'POST';
        var headers = {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Origin': 'https://youhui.95516.com',
            'Cookie': !!cookie ? cookie : $tool.getkeyval("UniCookie"),
            'Connection': 'keep-alive',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148/sa-sdk-ios  (com.unionpay.chsp) (cordova 4.5.4) (updebug 0) (version 807) (UnionPay/1.0 CloudPay) (clientVersion 137) (language zh_CN)',
            'Referer': 'https://youhui.95516.com/newsign/public/app/index.html',
            'Accept-Language': 'zh-cn'
        };
        var body = '';

        var myRequest = {
            url: url,
            method: method,
            headers: headers,
            body: body
        };

        $tool.post(myRequest, function (e, r, d) {
            console.log(d);
            var obj = JSON.parse(d);
            if (!!obj.signedIn) {
                if (obj.signedIn == true) {
                    var days = 0;
                    for (var item in obj.days) {
                        if (obj.days[item] == 1) {
                            days++;
                        }
                    }
                    $tool.notify("云闪付签到成功!", "首次签到时间:" + obj.startedAt, "已签到:" + days + "天!", { img: img });
                }
                else {
                    $tool.notify("云闪付签到失败!", d, d, { img: img });
                }
            }
            else {
                $tool.notify("云闪付签到失败!", d, d, { img: img });
            }
        })
        
    }

} catch (e) {
    console.log(e);
    $tool.notify("云闪付签到错误!", e, e, { img: img });
}


//loon/quanx通用方法

function tool() {
    var isLoon = typeof $httpClient != "undefined";
    var isQuanX = typeof $task != "undefined";

    var obj = {
        //通知

        notify: function (title, subtitle, message, option) {
            var option_obj = {};
            if (isQuanX) {
                if (!!option) {
                    if (typeof option == "string") option_obj["open-url"] = option;
                    if (!!option.url) option_obj["open-url"] = option.url;
                    if (!!option.img) option_obj["media-url"] = option.img;
                    $notify(title, subtitle, message, option_obj);
                }
                else {
                    $notify(title, subtitle, message);
                }
            }
            if (isLoon) {
                if (!!option) {
                    if (typeof option == "string") option_obj["openUrl"] = option;
                    if (!!option.url) option_obj["openUrl"] = option.url;
                    if (!!option.img) option_obj["mediaUrl"] = option.img;
                    $notification.post(title, subtitle, message, option_obj);
                }
                else {
                    $notification.post(title, subtitle, message);
                }
            }
        },
        //get请求

        get: function (options, callback) {
            if (isQuanX) {
                if (typeof options == "string") options = { url: options }
                options["method"] = "GET"
                $task.fetch(options).then(function (response) {
                    callback(null, adapterStatus(response), response.body);
                }, function (reason) {
                    callback(reason.error, null, null);
                });
            }
            if (isLoon) {
                $httpClient.get(options, function (error, response, body) {
                    callback(error, adapterStatus(response), body);
                })
            }
        },
        //post请求

        post: function (options, callback) {
            if (isQuanX) {
                if (typeof options == "string") options = { url: options }
                options["method"] = "POST"
                $task.fetch(options).then(function (response) {
                    callback(null, adapterStatus(response), response.body);
                }, function (reason) {
                    callback(reason.error, null, null);
                });
            }
            if (isLoon) {
                $httpClient.post(options, function (error, response, body) {
                    callback(error, adapterStatus(response), body);
                })
            }
        },
        //Unicode解码

        unicode: function (str) {
            return unescape(str.replace(/\\u/gi, '%u'));
        },
        //url解码

        decodeurl: function (str) {
            return decodeURIComponent(str);
        },
        //对象转字符串

        json2str: function (obj) {
            return JSON.stringify(obj);
        },
        //字符串转对象

        str2json: function (str) {
            return JSON.parse(str);
        },
        //数据持久化写入

        setkeyval: function (value, key) {
            if (isQuanX) {
                $prefs.setValueForKey(value, key);
            }
            if (isLoon) {
                $persistentStore.write(value, key);
            }
        },
        //数据持久化读取

        getkeyval: function (key) {
            if (isQuanX) {
                return $prefs.valueForKey(key);
            }
            if (isLoon) {
                return $persistentStore.read(key);
            }
        }

    };

    function adapterStatus(response) {
        if (response) {
            if (response.status) {
                response["statusCode"] = response.status;
            } else if (response.statusCode) {
                response["status"] = response.statusCode;
            }
        }
        return response;
    }

    return obj;

};

$done({});
