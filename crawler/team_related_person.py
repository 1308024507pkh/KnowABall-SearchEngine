import MySQLdb
import csv


def connectdb():
    # 打开数据库连接
    db = MySQLdb.connect("localhost", "root", "bzshkdk2264", "dqd", charset='utf8')
    # 使用cursor()方法获取操作游标
    return db


def related_person_sql(id, related_person):
    related_person = related_person[1:-1]
    related_person = related_person.split(", []], [")
    sql_list = []
    for person in related_person:
        person = person.replace(", ['~'], ['~']", "").replace(", []]", "").replace('["', "").replace('"]', "")\
            .replace("['位置', '号码', '姓名', '出场', '进球', '国籍'], [", "").replace("['", "").replace("']", "")
        person_info = person.split(", ")
        person_info[1] = 'NULL' if person_info[1] == '~' else int(person_info[1])
        sql = "INSERT INTO TEAMRELATEDPERSON VALUES(NULL, %s, '%s', %s, \"%s\")" % (id, person_info[0], person_info[1], person_info[2])
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
                url = row[1]
                related_person = row[3]
                sql_list = related_person_sql(id, related_person)
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
