import MySQLdb
import csv


def connectdb():
    # 打开数据库连接
    db = MySQLdb.connect("localhost", "root", "bzshkdk2264", "dqd", charset='utf8')
    # 使用cursor()方法获取操作游标
    return db


def player_news_titles_sql(id, name, english_name, news_titles):
    news_titles = news_titles.replace('"', "_")
    sql = "INSERT INTO PLAYERNEWSTITLES VALUES(%s, \"%s\", \"%s\", \"%s\")" % (id, name, english_name, news_titles)
    return sql


id_set = set()


def team_player_news_list_sql(league, team_id):
    print(league, team_id)
    sql_list = []
    filename = 'person_news_list_' + str(league) + "_" + str(team_id) + '.csv'
    first = True
    with open(filename, encoding='utf-8')as f:
        f_csv = csv.reader(f)
        for row in f_csv:
            if first:
                first = False
                continue
            id = row[0]
            if id in id_set:
                continue
            id_set.add(id)
            name = row[1]
            english_name = row[2]
            news_titles = row[3]
            sql = player_news_titles_sql(id, name, english_name, news_titles)
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
                sql_list = team_player_news_list_sql(league, id)
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
