# README

# 学習用チャット型アプリケーション

## サンプル画像
(https://gyazo.com/7cbe90d80c75f577146146e2c0cb64c5)

## 環境
- Rails '5.0.7'
- mysql2 '0.3.18~0.6.0' 
- AWS(capistrano,nginx,unicorn)

## App説明
簡易チャットアプリケーション  
メッセージや画像のやりとりができる

## 仕様
- ユーザー登録・グループ登録/編集・削除
- 記事投稿/テキスト・画像（非同期）
- ユーザー検索（インクリメンタルサーチ）
- 自動更新機能

## 使用説明
ユーザー登録後、チャットグループを作成します   
グループ作成後にグループ名を押下するとグループチャットルームへ遷移します  
メッセージフォームからメッセージや画像が送信できます

* Database creation
# ChatSpace DBdesign
## users_table
|Column|Type|Options|
|------|-----|------|
|name|string|null: false, index: true|
|password|string|null: false|
|email|string|null: false|
### Association
- has_many :messages
- has_many :users_groups
- has_many :groups, through: users_groups

## messages_table
|Column|Type|Options|
|------|-----|------|
|image|text||
|body|text||
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## groups_table
|Column|Type|Options|
|------|-----|------|
|name|string||
### Association
- has_many :messages
- has_many :users_groups
- has_many :users, through: users_groups

## users_groups_table
|Column|Type|Options|
|------|-----|------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

------------------------


