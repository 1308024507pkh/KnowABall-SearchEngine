import MySQLdb
import csv


def connectdb():
    # 打开数据库连接
    db = MySQLdb.connect("localhost", "root", "bzshkdk2264", "dqd", charset='utf8')
    # 使用cursor()方法获取操作游标
    return db


def honor_record_sql(id, honor_record):
    honor_record = honor_record[1:-2]
    honor_records = honor_record.split("], ")
    sql_list = []
    for honor_record in honor_records:
        honor_record = honor_record[1:-1].replace("', '", ",").replace("': ['", "&")
        honor_record = honor_record.split("&")
        print(honor_record)
        if len(honor_record) == 2:
            title = honor_record[0]
            years = honor_record[1]
            sql = "INSERT INTO TEAMHONORRECORD VALUES(NULL, %s, '%s', '%s')" % (id, title, years)
            sql_list.append(sql)
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
                honor_record = row[4]
                sql_list = honor_record_sql(id, honor_record)
                for sql in sql_list:
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
