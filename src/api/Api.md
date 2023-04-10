# 知乎日报APP：API接口

## 接口说明

baseUrl: <http://news-at.zhihu.com/api/4/>

### 1、启动界面图像获取

> URL: <http://news-at.zhihu.com/api/4/start-image/1080*1776>

- start-image 后为图像分辨率，接受如下格式

  - 20*432
  - 480*728
  - 720*1184
  - 1080*1776

- 响应实例

```js
{
    text: "© Fido Dido",
    img: "http://p2.zhimg.com/10/7b/107bb4894b46d75a892da6fa80ef504a.jpg"
}
text : 供显示的图片版权信息
img : 图像的 URL
```

### 2、最新消息

> URL: <http://news-at.zhihu.com/api/4/news/latest>

- 响应实例

```js
{
    date: "20140523",
    stories: [
        {
            title: "中国古代家具发展到今天有两个高峰，一个两宋一个明末（多图）",
            ga_prefix: "052321",
            images: [
                "http://p1.zhimg.com/45/b9/45b9f057fc1957ed2c946814342c0f02.jpg"
            ],
            type: 0,
            id: 3930445
        },
    ...
    ],
    top_stories: [
        {
            title: "商场和很多人家里，竹制家具越来越多（多图）",
            image: "http://p2.zhimg.com/9a/15/9a1570bb9e5fa53ae9fb9269a56ee019.jpg",
            ga_prefix: "052315",
            type: 0,
            id: 3930883
        },
    ...
    ]
}
```

- date : 日期
- stories : 当日新闻

  - `title` : 新闻标题
  - `images` : 图像地址（官方 API 使用数组形式。目前暂未有使用多张图片的情形出现，**曾见无** `images` **属性的情况**，请在使用中注意 ）
  - `ga_prefix` : 供 Google Analytics 使用
  - `type` : 作用未知
  - `id` : `url` 与 `share_url` 中最后的数字（应为内容的 id）
  - `multipic` : 消息是否包含多张图片（仅出现在包含多图的新闻中）
  - `top_stories` : 界面顶部 ViewPager 滚动显示的显示内容（子项格式同上）

### 3、消息内容获取与离线下载

> URL: <http://news-at.zhihu.com/api/4/news/3892357>

使用在 最新消息 中获得的 id，拼接在 <http://news-at.zhihu.com/api/4/news/> 后，得到对应消息 JSON 格式的内容

- 响应实例

```js
{
    body: "<div class="main-wrap content-wrap">...</div>",
    image_source: "Angel Abril Ruiz / CC BY",
    title: "卖衣服的新手段：把耐用品变成「不停买新的」",
    image: "http://p4.zhimg.com/30/59/30594279d368534c6c2f91b2c00c7806.jpg",
    share_url: "http://daily.zhihu.com/story/3892357",
    js: [ ],
    ga_prefix: "050615",
    type: 0,
    id: 3892357,
    css: [
        "http://news.at.zhihu.com/css/news_qa.6.css?v=b390f"
    ]
}
```

- body : HTML 格式的新闻
- image-source : 图片的内容提供方。为了避免被起诉非法使用图片，在显示图片时最好附上其版权信息。
- title : 新闻标题
- mage : 获得的图片同 最新消息 获得的图片分辨率不同。这里获得的是在文章浏览界面中使用的大图。
- share_url : 供在线查看内容与分享至 SNS 用的 URL
- js : 供手机端的 WebView(UIWebView) 使用
- ga_prefix : 供 Google Analytics 使用
- type : 新闻的类型
- id : 新闻的 id
- css : 供手机端的 WebView(UIWebView) 使用

### 4、过往消息

> URL: <http://news.at.zhihu.com/api/4/news/before/20131119>

- 若果需要查询 11 月 18 日的消息，before 后的数字应为 20131119
知乎日报的生日为 2013 年 5 月 19 日，若 before 后数字小于 20130520 ，只会接收到空消息
输入的今日之后的日期仍然获得今日内容，但是格式不同于最新消息的 JSON 格式

- 响应实例

```js
{
    date: "20131118",
    stories: [
        {
            title: "深夜食堂 · 我的张曼妮",
            ga_prefix: "111822",
            images: [
                "http://p4.zhimg.com/7b/c8/7bc8ef5947b069513c51e4b9521b5c82.jpg"
            ],
            type: 0,
            id: 1747159
        },
    ...
    ]
}
```

### 5、新闻额外信息

> URL: <http://news-at.zhihu.com/api/4/story-extra/#{id>}

- 输入新闻的ID，获取对应新闻的额外信息，如评论数量，所获的『赞』的数量。

- 响应实例

```js
{
    "long_comments": 0,
    "popularity": 161,
    "short_comments": 19,
    "comments": 19,
}
```

- long_comments : 长评论总数
- popularity : 点赞总数
- short_comments : 短评论总数
- comments : 评论总数

### 6、新闻对应长评论查看

> URL: <http://news-at.zhihu.com/api/4/story/4232852/long-comments>

- 使用在 最新消息 中获得的 id，在 <http://news-at.zhihu.com/api/4/story/#{id}/long-comments> 中将 id 替换为对应的 id，得到长评论 JSON 格式的内容

- 响应实例

```js
{
    "comments": [
        {
            "author": "EleganceWorld",
            "id": 545442,
            "content": "上海到济南，无尽的猪排盖饭… （后略）",
            "likes": 0,
            "time": 1413589303,
            "avatar": "http://pic2.zhimg.com/1f76e6a25_im.jpg"
        },
        ...
    ]
}
```

- comments : 长评论列表，形式为数组

  - `author` : 评论作者
  - `id` : 评论者的唯一标识符
  - `content` : 评论的内容
  - `likes` : 评论所获『赞』的数量
  - `time` : 评论时间
  - `avatar` : 用户头像图片的地址

### 7、新闻对应短评论查看

> URL: <http://news-at.zhihu.com/api/4/story/4232852/short-comments>

- 使用在 最新消息 中获得的 id，在 <http://news-at.zhihu.com/api/4/story/#{id}/short-comments> 中将 id 替换为对应的 id，得到短评论 JSON 格式的内容

- 响应实例

```js
{
    "comments": [
        {
            "author": "Xiaole说",
            "id": 545721,
            "content": "就吃了个花生米，呵呵",
            "likes": 0,
            "time": 1413600071,
            "avatar": "http://pic1.zhimg.com/c41f035ab_im.jpg"
        },
        ...
    ]
}
```

### 8、主题日报列表查看

> URL: <http://news-at.zhihu.com/api/4/themes>

- 响应实例

```js
{
    "limit": 1000,
    "subscribed": [ ],
    "others": [
        {
            "color": 8307764,
            "thumbnail": "http://pic4.zhimg.com/2c38a96e84b5cc8331a901920a87ea71.jpg",
            "description": "内容由知乎用户推荐，海纳主题百万，趣味上天入地",
            "id": 12,
            "name": "用户推荐日报"
        },
        ...
    ]
}
```

- `limit` : 返回数目之限制（仅为猜测）
- `subscribed` : 已订阅条目
- `others` : 其他条目  
  - `color` : 颜色，作用未知
  - `thumbnail` : 供显示的图片地址
  - `description` : 主题日报的介绍
  - `id` : 该主题日报的编号
  - `name` : 供显示的主题日报名称

### 9、主题日报内容查看

> URL: <http://news-at.zhihu.com/api/4/theme/11>

- 使用在 主题日报列表查看 中获得需要查看的主题日报的 id，拼接在 <http://news-at.zhihu.com/api/4/theme/> 后，得到对应主题日报 JSON 格式的内容

- 响应实例

```js
{
    stories: [
        {
            images: [
                "http://pic1.zhimg.com/84dadf360399e0de406c133153fc4ab8_t.jpg"
            ],
            type: 0,
            id: 4239728,
            title: "前苏联监狱纹身百科图鉴"
        },
        ...
    ],
    description: "为你发现最有趣的新鲜事，建议在 WiFi 下查看",
    background: "http://pic1.zhimg.com/a5128188ed788005ad50840a42079c41.jpg",
    color: 8307764,
    name: "不许无聊",
    image: "http://pic3.zhimg.com/da1fcaf6a02d1223d130d5b106e828b9.jpg",
    editors: [
        {
            url: "http://www.zhihu.com/people/wezeit",
            bio: "微在 Wezeit 主编",
            id: 70,
            avatar: "http://pic4.zhimg.com/068311926_m.jpg",
            name: "益康糯米"
        },
        ...
    ],
    image_source: ""
}
```

- `stories` : 该主题日报中的文章列表
  - `images` : 图像地址（其类型为数组。请留意在代码中处理无该属性与数组长度为 0 的情况）
  - `type` : 类型，作用未知
  - `title` : 消息的标题

- `description` : 该主题日报的介绍
- `background` : 该主题日报的背景图片（大图）
- `color` : 颜色，作用未知
- `name` : 该主题日报的名称
- `image` : 背景图片的小图版本
- `editors` : 该主题日报的编辑（『用户推荐日报』中此项的指是一个空数组，在 App 中的主编栏显示为『许多人』，点击后访问该主题日报的介绍页面，请留意）  
  - `url` : 主编的知乎用户主页
  - `bio` : 主编的个人简介
  - `id` : 数据库中的唯一表示符
  - `avatar` : 主编的头像
  - `name` : 主编的姓名
  - `image_source` : 图像的版权信息

### 10、热门消息

> URL: <http://news-at.zhihu.com/api/3/news/hot>

- 响应实例

```js
{
    recent: [
        {
            news_id: 3748552,
            url: "http://daily.zhihu.com/api/2/news/3748552",
            thumbnail: "http://p3.zhimg.com/67/6a/676a8337efec71a100eea6130482091b.jpg",
            title: "长得漂亮能力出众性格单纯的姑娘为什么会没有男朋友？"
        },
    ...
    ]
}
```

- 大体同前面介绍的 API 类似，唯一需要注意的是：欲获得图片地址，不再使用 image 而是 thumbnail 属性
- url 属性可直接使用。请注意，url 中的 api 属性为 2，是较老版本。

### 11、栏目总览

> URL: <http://news-at.zhihu.com/api/3/sections>

- 响应实例

```js
{
    data: [
        {
            id: 1,
            thumbnail: "http://p2.zhimg.com/10/b8/10b8193dd6a3404d31b2c50e1e232c87.jpg",
            name: "深夜食堂",
            description: "睡前宵夜，用别人的故事下酒"
        },
    ...
    ]
}
```

- thumbnail 获取图像的地址

### 12、栏目具体消息查看

> URL: <http://news-at.zhihu.com/api/3/section/1>

- URL 最后的数字见『栏目总览』中相应栏目的 id 属性

- 响应实例

```js
{
    news: [
        {
            date: "20140522",
            display_date: "5 月 22 日"
        },
    ...
    ],
    name: "深夜食堂",
    timestamp: 1398780001
}
```
