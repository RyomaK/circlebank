# サークルバンク
## task

- [x] サーバー作成  
- [x] db設計(最初はモック) 
- [x] ログイン機能 
- [ ] API設計 ->けんちゃん

## WebApi
## loginしている時
### GET```/api/{大学}/circle/{id}```  
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
mail,avatar,name返す
### POST```/signup```
db登録（未実装）

ex...
[api設計](https://hackmd.io/KYBg7AZgxgjDAmBaAnAFgEwUamBWGiARpAByIBsJJs6M5I6JAhkA)
