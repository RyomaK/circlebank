# サークルバンク
## task

- [x] サーバー作成  
- [x] db設計(最初はモック) 
- [x] ログイン機能 
- [ ] API設計 ->けんちゃん

## WebApi
## loginしている時
### GET```/api/{大学}/circle/{circle_name}```
```json
{
    "Circle": {
        "id": 2,
        "name": "fly speck",
        "url_name": "flyspeck",
        "number": 100,
        "gender_ratio": "1:1",
        "image": "1",
        "introduction": "テニス",
        "message_for_fresh": "いつでもきてねえええ",
        "delegete_name": "大野",
        "delegete_contact": "arashi@mail.com",
        "campus": "京田辺/今出川",
        "excite": 9,
        "fee": 3000,
        "university": "同志社大学"
    },
    "events": [
        {
            "id": 1,
            "name": "ほわ音でー",
            "image": "img/users/default.png",
            "agenda": "2017-02-14T00:00:00Z",
            "place": "a",
            "detail": "f",
            "capacity": 10,
            "fee": 10
        },
        {
            "id": 2,
            "name": "fsa",
            "image": "img/users/default.png",
            "agenda": "2017-02-14T00:00:00Z",
            "place": "fsa",
            "detail": "fdsa",
            "capacity": 1,
            "fee": 1
        }
    ],
    "tags": [
        {
            "id": 3,
            "name": "京田辺"
        },
        {
            "id": 4,
            "name": "今出川"
        }
    ]
}
```  
### GET```/api/{大学}/tag```  
大学毎のtag一覧  
```json
[
    {
        "id": 1,
        "name": "バスケットボール"
    },
    {
        "id": 2,
        "name": "アットホーム"
    },
    {
        "id": 3,
        "name": "京田辺"
    },
    {
        "id": 3,
        "name": "京田辺"
    },
    {
        "id": 4,
        "name": "今出川"
    }
]
```
### GET```/api/{大学}/tag/{id}```  
idを持っているサークル一覧
```json
[
    {
        "id": 1,
        "name": "hands up",
        "url_name": "handsup",
        "number": 30,
        "gender_ratio": "1:1",
        "image": "1",
        "introduction": "アットホームなバスケットボールサークルです",
        "message_for_fresh": "いつでもきてね",
        "delegete_name": "田中",
        "delegete_contact": "tanaka@mail.com",
        "campus": "京田辺",
        "excite": 3,
        "fee": 5000,
        "university": "同志社大学"
    },
    {
        "id": 2,
        "name": "fly speck",
        "url_name": "flyspeck",
        "number": 100,
        "gender_ratio": "1:1",
        "image": "1",
        "introduction": "テニス",
        "message_for_fresh": "いつでもきてねえええ",
        "delegete_name": "大野",
        "delegete_contact": "arashi@mail.com",
        "campus": "京田辺/今出川",
        "excite": 9,
        "fee": 3000,
        "university": "同志社大学"
    }
]
```
### GET```/api/{univ}/circle/{id}/{event_id}```
イベント詳細
```json
{
    "id": 1,
    "name": "ほわ音でー",
    "image": "img/users/default.png",
    "agenda": "2017-02-14T00:00:00Z",
    "place": "a",
    "detail": "f",
    "capacity": 10,
    "fee": 10
}
```

### POST```/api/event```
- event_id
userにイベントを追加
### DELETE```/api/event```
- event_id
userのイベント消去

## loginしていない
401　と not authorized

## そのた
### GET```/login```
Oauthログイン
### POST```/logout```
ログアウト
### GET```/signup```
Oauthは通るがDBにデータが登録されていない時
mail,avatar,name
### POST```/signup```
db登録（未実装）

# API サーバー
## POST /login
ログイン
- mail
- password


### Response
#### 成功
/にリダイレクト

#### 失敗
```json
{
    "code": "406",
    "message" "error login"
}
```

##  POST logout
logout
    
#### 成功
/にリダイレクと

## POST /signup

登録
- university
- name
- mail
- sex
- department
- subject
- password

### Response
#### 成功
```json
{
    "code":"201"
    "message":"OK"
}
```
#### 失敗
```json

{
    "code": "40９",
    "message" "already mail"
}

```

## GET /api/user
user情報の表示

### Response
#### 成功
```json
{
    "User": {
        "id": 2,
        "university": "同志社大学",
        "name": "ケンタ",
        "gender": "tsukuni1@gmail.com",
        "mail": "img/users/2.png",
        "password": "男",
        "image": "理工学部",
        "year": 2015,
        "department": "機械システム学科",
        "subject": "$2a$10$dg/iWh6zeFBEfuL.kDE3MO/xygMGyTYOypo9XsjV5BBHwv1kH9T0y"
    },
    "events": [
        {
            "id": 1,
            "name": "ほわ音でー",
            "image": "img/users/default.png",
            "agenda": "2017-02-14T00:00:00Z",
            "place": "a",
            "detail": "f",
            "capacity": 10,
            "fee": 10
        }
    ]
}
```

#### 失敗
```json

{
    "code": "406",
    "message" "error login"
}
```

## POST /api/user

updateする
- mail
- name
- password
- newpassword


### Response
#### 成功
```json

```
___成功した場合cookieに新しくJwtを付与するから，また"Bearer (JWT)"を付与してほしい___


#### 失敗
```json
```

## POST /api/user/upload

画像アップロードする
- image


### Response
#### 成功
```json

```

#### 失敗
```json
```


## Get ```api/user/like```
```json
{
    "circle": [
        {
            "id": 1,
            "name": "hands up",
            "url_name": "handsup",
            "number": 30,
            "gender_ratio": "1:1",
            "image": "1",
            "introduction": "アットホームなバスケットボールサークルです",
            "message_for_fresh": "いつでもきてね",
            "delegete_name": "田中",
            "delegete_contact": "tanaka@mail.com",
            "campus": "京田辺",
            "excite": 3,
            "fee": 5000,
            "university": "同志社大学"
        }
    ]
}
```

## POST```api/user/like```
- circle_id ...　お気に入りするサークルのid
```json
{
    "code": 200,
    "message": "regist like"
}
```

## DELETE ```api/user/like```
- circle_id ...　削除するサークルのid
```json
{
    "code": 200,
    "message": "delete like"
}
```

## GET ```api/{univ}/circle/{circle_name}/comment```

```json
{
    "Circle": {
        "id": 2,
        "name": "fly speck",
        "url_name": "flyspeck",
        "number": 100,
        "gender_ratio": "1:1",
        "image": "1",
        "introduction": "テニス",
        "message_for_fresh": "いつでもきてねえええ",
        "delegete_name": "大野",
        "delegete_contact": "arashi@mail.com",
        "campus": "京田辺/今出川",
        "excite": 9,
        "fee": 3000,
        "university": "同志社大学"
    },
    "comment": [
        {
            "id": 1,
            "name": "栗栖",
            "gender": "男",
            "point": 4,
            "university": "良い",
            "created_at": "2017-02-14T00:00:00Z"
        }
    ]
}

```

##

## POST ```api/{univ}/circle/{circle_name}/comment```
- circle_id
- point(1~5?)
- text

## DELETE ```api/{univ}/circle/{circle_name}/comment```


## GET ```admin/{univ}/circle```
```json
[
    {
        "id": 1,
        "name": "hands up",
        "url_name": "handsup",
        "number": 30,
        "gender_ratio": "1:1",
        "image": "1",
        "introduction": "アットホームなバスケットボールサークルです",
        "message_for_fresh": "いつでもきてね",
        "delegete_name": "田中",
        "delegete_contact": "tanaka@mail.com",
        "campus": "京田辺",
        "excite": 3,
        "fee": 5000,
        "university": "同志社大学"
    },
    {
        "id": 2,
        "name": "fly speck",
        "url_name": "flyspeck",
        "number": 100,
        "gender_ratio": "1:1",
        "image": "1",
        "introduction": "テニス",
        "message_for_fresh": "いつでもきてねえええ",
        "delegete_name": "大野",
        "delegete_contact": "arashi@mail.com",
        "campus": "京田辺/今出川",
        "excite": 9,
        "fee": 3000,
        "university": "同志社大学"
    }
]
```

## GET ```admin/{univ}/circle```
___ query ___
?page=1~
無限スクロールの際に必要
サークるのid順になれべてある

```json
[
    {
        "id": 1,
        "name": "hands up",
        "url_name": "handsup",
        "number": 30,
        "gender_ratio": "1:1",
        "image": "1",
        "introduction": "アットホームなバスケットボールサークルです",
        "message_for_fresh": "いつでもきてね",
        "delegete_name": "田中",
        "delegete_contact": "tanaka@mail.com",
        "campus": "京田辺",
        "excite": 3,
        "fee": 5000,
        "university": "同志社大学"
    },
    {
        "id": 2,
        "name": "fly speck",
        "url_name": "flyspeck",
        "number": 100,
        "gender_ratio": "1:1",
        "image": "1",
        "introduction": "テニス",
        "message_for_fresh": "いつでもきてねえええ",
        "delegete_name": "大野",
        "delegete_contact": "arashi@mail.com",
        "campus": "京田辺/今出川",
        "excite": 9,
        "fee": 3000,
        "university": "同志社大学"
    }
]
```

## GET ```admin/{univ}/circle/event```
___ query ___
?page=1~
無限スクロールの際に必要
日付順になれべてある

```json
[
    {
        "id": 3,
        "name": "fsa",
        "image": "img/users/default.png",
        "agenda": "2017-02-14T00:00:00Z",
        "place": "fsa",
        "detail": "fdsa",
        "capacity": 1,
        "fee": 1,
        "circle_id": 2,
        "circle_name": "fly speck"
    },
    {
        "id": 1,
        "name": "ほわ音でー",
        "image": "img/users/default.png",
        "agenda": "2017-02-14T15:41:30Z",
        "place": "a",
        "detail": "f",
        "capacity": 10,
        "fee": 10,
        "circle_id": 2,
        "circle_name": "fly speck"
    },
    {
        "id": 2,
        "name": "ホワイトデー",
        "image": "img/users/default.png",
        "agenda": "2017-02-15T00:00:00Z",
        "place": "fsad",
        "detail": "fds",
        "capacity": 0,
        "fee": 0,
        "circle_id": 1,
        "circle_name": "hands up"
    }
]
```

## GET ```admin/{univ}/circle/{circle_name}```
```json
{
    "Circle": {
        "id": 1,
        "name": "hands up",
        "url_name": "handsup",
        "number": 30,
        "gender_ratio": "1:1",
        "image": "1",
        "introduction": "アットホームなバスケットボールサークルです",
        "message_for_fresh": "いつでもきてね",
        "delegete_name": "田中",
        "delegete_contact": "tanaka@mail.com",
        "campus": "京田辺",
        "excite": 3,
        "fee": 5000,
        "university": "同志社大学"
    },
    "events": [
        {
            "id": 2,
            "name": "ホワイトデー",
            "image": "img/users/default.png",
            "agenda": "2017-02-15T00:00:00Z",
            "place": "fsad",
            "detail": "fds",
            "capacity": 0,
            "fee": 0
        }
    ],
    "tags": [
        {
            "id": 1,
            "name": "バスケットボール"
        },
        {
            "id": 2,
            "name": "アットホーム"
        },
        {
            "id": 3,
            "name": "京田辺"
        }
    ]
}
```

ex...
[api設計](https://hackmd.io/KYBg7AZgxgjDAmBaAnAFgEwUamBWGiARpAByIBsJJs6M5I6JAhkA?view)
