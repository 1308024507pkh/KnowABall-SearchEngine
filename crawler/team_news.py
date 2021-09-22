import MySQLdb
import csv


def connectdb():
    # 打开数据库连接
    db = MySQLdb.connect("localhost", "root", "bzshkdk2264", "dqd", charset='utf8')
    # 使用cursor()方法获取操作游标
    return db


def main():
    db = connectdb()
    cursor = db.cursor()
    league_list = [1, 2, 3, 4, 10]
    for league in league_list:
        first = True
        filename = 'team_news_list_' + str(league) + '.csv'
        with open(filename, encoding='utf-8')as f:
            f_csv = csv.reader(f)
            for row in f_csv:
                if first:
                    first = False
                    continue
                id = row[0]
                name = row[1]
                english_name = row[2]
                news_titles = row[3]
                news_urls = row[4]
                news_img_urls = row[5]
                news_titles = news_titles.replace('"', "\'")
                sql = "INSERT INTO TEAMNEWS VALUES(NULL, %s, \"%s\", \"%s\", \"%s\", \"%s\", \"%s\")" \
                      % (id, name, english_name, news_titles, news_urls, news_img_urls)
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
