#!/bin/bash

mariadb-dump --protocol=tcp -h db --password=$DB_PASSWORD $DB_NAME > /tmp/db_backup/dump_db_`date +%d-%m-%Y"_"%H_%M_%S`.sql
echo "Backup dump_db_`date +%d-%m-%Y"_"%H_%M_%S`.sql saved to db_backup\"