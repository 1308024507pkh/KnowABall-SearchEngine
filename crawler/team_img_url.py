import MySQLdb
import csv


def connectdb():
    # 打开数据库连接
    db = MySQLdb.connect("localhost", "root", "password", "dqd", charset='utf8')
    # 使用cursor()方法获取操作游标
    return db


def main():
    db = connectdb()
    cursor = db.cursor()
    league_list = [1, 2, 3, 4, 10]
    for league in league_list:
        first = True
        filename = 'team_img_url_list_' + str(league) + '.csv'
        with open(filename, encoding='utf-8')as f:
            f_csv = csv.reader(f)
            for row in f_csv:
                if first:
                    first = False
                    continue
                team_id = row[0]
                img_url = row[1]
                sql = "INSERT INTO TEAMIMGURL VALUES(NULL, %s, '%s')" % (team_id, img_url)
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
    # print('hh')
    main()