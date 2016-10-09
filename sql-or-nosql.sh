#!/bin/sh
password=`cat password`
mysql -u root -p$password < init.sql
time mysql -u root -p$password < insert.sql
mysql -u root -p$password < deinit.sql
