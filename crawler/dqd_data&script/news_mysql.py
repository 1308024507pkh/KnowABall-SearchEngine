import MySQLdb
import csv


def connectdb():
    # 打开数据库连接
    db = MySQLdb.connect("localhost", "root", "123456pkh", "dqd", charset='utf8')
    # 关闭数据库连接
    return db


def main():
    db = connectdb()
    cursor = db.cursor()
    league_list = ['英超', '意甲', '西甲', '德甲']
    for league in league_list:
        first = True
        filename = league + '新闻.csv'
        with open(filename, encoding='utf-8')as f:
            f_csv = csv.reader(f)
            for row in f_csv:
                if first:
                    first = False
                    continue
                url = row[0]
                title = row[1]
                author = row[2]
                time = row[3]
                content_list = row[4][2:-2].split("', '")
                tag_list = row[5].replace(", None", "").replace("剑南春", "")[2:-2].split("', '")
                content = ""
                tags = ""
                for cont in content_list:
                    content = content + cont + "\n"
                for tag in tag_list:
                    tags = tags + tag + ","
                tags = tags[:-1]
                id = int(url[-12:-5])
                sql = "INSERT INTO NEWS VALUES (%s, '%s', '%s', '%s', '%s', '%s' )" % (id, url, title, author, content, tags)
                try:
                    # print(sql)
                    # 执行sql语句
                    cursor.execute(sql)
                    # 提交到数据库执行
                    db.commit()
                except:
                    # 发生错误时回滚
                    db.rollback()
    db.close()


if __name__ == '__main__':
    main()