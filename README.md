# サークルバンク
## task

- [x] サーバー作成  
- [x] db設計(最初はモック) 
- [x] ログイン機能 
- [ ] API設計 ->けんちゃん

## WebApi

### GET```/api/{大学}/circle/{id}```  
### GET```/api/{大学}/tag```  
大学毎のtag一覧  
### GET```/api/{大学}/tag/{id}```  
idを持っているサークル一覧
### GET```/api/login/{provider}```  
- login　している
 cookie
- login していない
 login:""
 
### GET```/api/{univ}/circle/{id}/{event_id}```
- login　している
 イベント情報
- login していない
 空のイベント情報
 
### POST```/api/login```
ログインするときにデータ送信
### POST```/api/logout```
ログアウト
### POST```/api/signup```
登録

ex...
[api設計](https://hackmd.io/KYBg7AZgxgjDAmBaAnAFgEwUamBWGiARpAByIBsJJs6M5I6JAhkA)
