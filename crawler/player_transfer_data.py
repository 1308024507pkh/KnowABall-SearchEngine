import MySQLdb
import csv


def connectdb():
    # 打开数据库连接
    db = MySQLdb.connect("localhost", "root", "bzshkdk2264", "dqd", charset='utf8')
    # 使用cursor()方法获取操作游标
    return db


def player_transfer_data_sql(id, transfer_data):
    sql_list = []
    if len(transfer_data) == 2:
        return sql_list
    transfer_data = transfer_data[3:-3].replace("', '", "_").replace("'], ['", "&")
    transfer_records = transfer_data.split("&")
    for transfer_record in transfer_records:
        info = transfer_record.split("_")
        sql = "INSERT INTO PLAYERTRANSFERDATA VALUES(NULL, %s, '%s', '%s', '%s')" % (id, info[0], info[1], info[2])
        sql_list.append(sql)
    return sql_list


def team_player_transfer_data_sql(league, team_id):
    sql_list = []
    filename = 'person_list_' + str(league) + "_" + str(team_id) + '.csv'
    first = True
    with open(filename, encoding='utf-8')as f:
        f_csv = csv.reader(f)
        for row in f_csv:
            if first:
                first = False
                continue
            id = row[0]
            transfer_data = row[4]
            sqls = player_transfer_data_sql(id, transfer_data)
            sql_list.append(sqls)
    return sql_list


def main():
    db = connectdb()
    cursor = db.cursor()
    league_list = [1, 2, 3, 4, 10]
    for league in league_list:
        first = True
        filename = 'team_list_' + str(league) + '.csv'
        with open(filename, encoding='utf-8')as f:
            f_csv = csv.reader(f)
            for row in f_csv:
                if first:
                    first = False
                    continue
                id = row[0]
                sql_list = team_player_transfer_data_sql(league, id)
                for sqls in sql_list:
                    for sql in sqls:
                       try:
                            # 执行sql语句
                            cursor.execute(sql)
                            # 提交到数据库执行
                            db.commit()
                       except:
                            print(sql)
                            # 发生错误时回滚
                            db.rollback()
    db.close()


if __name__ == '__main__':
    main()
