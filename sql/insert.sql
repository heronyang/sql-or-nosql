use `cache_test`;
DROP PROCEDURE IF EXISTS dorepeat;
DELIMITER //
CREATE PROCEDURE dorepeat(p1 INT)
BEGIN
    SET @x = 0;
    REPEAT
        SET @x = @x + 1;
        INSERT INTO `cache_test`.`cache` (cid, chunk) VALUES (RAND(), RAND());
        DELETE t FROM `cache_test`.`cache` AS t JOIN (SELECT updated_at AS ts FROM `cache_test`.`cache` ORDER BY ts DESC LIMIT 1 OFFSET 499) tlimit ON t.updated_at < tlimit.ts;
    UNTIL @x > p1 END REPEAT;
END
//
CALL dorepeat(2000)//
