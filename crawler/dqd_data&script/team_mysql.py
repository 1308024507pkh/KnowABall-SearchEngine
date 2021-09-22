import MySQLdb
import csv


def connectdb():
    # 打开数据库连接
    db = MySQLdb.connect("localhost", "root", "123456pkh", "dqd", charset='utf8')
    # 使用cursor()方法获取操作游标
    return db


def base_info_sql(id, url, base_info):
    base_info = base_info.replace('\"\"', "\'")
    base_info = base_info.replace("{'成立': '", "").replace("', '国家': '", "_").replace("', '城市': '", "_")
    base_info = base_info.replace("', '主场': '", "_").replace("', '容纳': '", "_").replace("人', '电话': '", "_")
    base_info = base_info.replace("', '邮箱': '", "_").replace("', 'team_name': '", "_").replace("', '地址': \"", "_")
    base_info = base_info.replace("', 'english_name': '", "_").replace("', '地址': '", "_").replace("'}", "")
    base_info = base_info.replace('"}', "").split("_")
    base_info[0] = int(base_info[0][0:4])
    if base_info[4] == '':
        base_info[4] = 'NULL'
    else:
        base_info[4] = int(base_info[4])
    sql = "INSERT INTO TEAMBASEINFO VALUES(%s, '%s', %s, '%s', '%s', '%s', %s, '%s', '%s', '%s', '%s', \"%s\")" \
          % (id, url, base_info[0], base_info[1], base_info[2], base_info[3], base_info[4], base_info[5]
             , base_info[6], base_info[7], base_info[8], base_info[9])
    return sql


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
                url = row[1]
                base_info = row[2]
                sql = base_info_sql(id, url, base_info)
                try:
                    # print(sql)
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