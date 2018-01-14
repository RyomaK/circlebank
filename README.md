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
### GET```/api/{大学}/tag/{id}```  
idを持っているサークル一覧
### GET```/api/{univ}/circle/{id}/{event_id}```
イベント詳細（未実装）

## loginしていない
401　と not authorized

## そのた
### GET```/auth/login/{provider}```
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
    "id": 2,
    "university": "1",
    "name": "つくに",
    "mail": "tsukuni1@gmail.com",
    "image": "",
    "sex": "1",
    "department": "理工学部",
    "subject": "機械システム学科",
    "password": "$2a$10$dg/iWh6zeFBEfuL.kDE3MO/xygMGyTYOypo9XsjV5BBHwv1kH9T0y"
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

ex...
[api設計](https://hackmd.io/KYBg7AZgxgjDAmBaAnAFgEwUamBWGiARpAByIBsJJs6M5I6JAhkA?view)
