

## Description

Приветствую, создал небольшой проэкт по тех заданию и вот описание к нему:



Create a tiny server app based on Node.js. +

The app should implement simple organization user structure management operations.+

The following user roles should be supported:
a. Administrator (top-most user)
b. Boss (any user with at least 1 subordinate)
c. Regular user (user without subordinates)

По одному из вариантов хардкордно создать админа с логином и паролем в базе, который при логине заходит в систему и далее создает Боссов, из enum констант, и каждый босс создает юзера или открыть ендпоинт для простой реестрации юзера .
Передача id.role может быть или в хедере или выниматься из базы,
Для передачи ролей нужно создать отдельный сервис.
Поиск по базе Монго созданых юзеров и босов через find и  агрегатные функции .aggregate( [ {$group :{ _id :, 
доступ по ендпоинтам ограничен UserGuards and TokenInterseptors.

Each user except the Administrator must have a boss (strictly one).
The following REST API endpoints should be exposed:
1. Register user
2. Authenticate as a user
3. Return list of users, taking into account the following:
- administrator should see everyone
- boss should see herself and all subordinates (recursively)
- regular user can see only herself
4. Change user's boss (only boss can do that and only for her subordinates)









