import MySQLdb
import csv


def connectdb():
    # 打开数据库连接
    db = MySQLdb.connect("localhost", "root", "bzshkdk2264", "dqd", charset='utf8')
    # 关闭数据库连接
    return db


def main():
    db = connectdb()
    cursor = db.cursor()
    id_set = set()
    league_list = ['英超', '意甲', '西甲', '德甲']
    for league in league_list:
        first = True
        filename = league + '新闻2.csv'
        with open(filename, encoding='utf-8')as f:
            f_csv = csv.reader(f)
            for row in f_csv:
                if first:
                    first = False
                    continue
                article_id = row[0]
                if article_id in id_set:
                    continue
                url = row[1]
                title = row[2]
                author = row[3]
                time = '2021-' + row[4]
                content_list = row[5][2:-2].split("', '")
                tag_list = row[6].replace(", None", "").replace("剑南春", "")[2:-2].split("', '")
                img_url = row[7]
                content = ""
                tags = ""
                for cont in content_list:
                    content = content + cont + "\n"
                for tag in tag_list:
                    tags = tags + tag + ","
                content = content.replace("\"", "\'")
                tags = tags[:-1]
                sql = "INSERT INTO NEWS2 VALUES (NULL, %s, '%s', '%s', '%s', '%s', \"%s\", '%s', '%s')"\
                    % (article_id, url, title, author, time, content, tags, img_url)
                try:
                    # 执行sql语句
                    cursor.execute(sql)
                    # 提交到数据库执行
                    db.commit()
                    id_set.add(article_id)
                except:
                    print(sql)
                    # 发生错误时回滚
                    db.rollback()
    db.close()


if __name__ == '__main__':
    main()
