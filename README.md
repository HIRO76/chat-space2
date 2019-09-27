# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

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

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
