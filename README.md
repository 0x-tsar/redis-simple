## <h1>Redis Process</h1>

$ `redis-server` runs the local server
$ `redis-cli` opens terminal to use from terminal

---

- set name ANYNAME
- get name RETURNS NAME VALUE
- keys \* GETS ALL KEYS
- exists name
- flushall DELETES ALL FILES
- ttl name GETS THE EXPIRATION TIME FOR A VARIABLE
- expire name 10 EXPIRES IN 10 SECONDS
- setex name 10 gustavo SETS VALUE WITH EXPIRATION DATE
- lpush brothers john tommy arthur SETS AN ARRAY
- lrange brothers 0 -1 LISTS ITEMS FROM THE ARRAY, FROM INDEX 0 TO -1 (ALL OF THEM)
- rpush WORS THE SAME WAY BUT ADDS TO THE END
- lpop friends REMOVES FIRST ITEM LEFT TO THE ARRAY
- rpop THE SAME THING BUT FOR RIGHT
- SADD hobbies "weight liffting" ADDS SETS, QUOTES FOR HAVING MORE THAN ONE WORD
- smembers hobbies TO SEE ALLS SETS
- srem hobbies "weight liffting" REMOVE ITEM FROM SET
- hset person name gustavo ADDING HASHES
- hget person name GETTING HASHES
- hgetall
- hdel person DELETE HASH
- hexists person name

95% things used in Redis are just strings and expirations, so as simple as that!
