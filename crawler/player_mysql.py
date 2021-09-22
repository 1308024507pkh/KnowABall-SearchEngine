import MySQLdb
import csv


def connectdb():
    # 打开数据库连接
    db = MySQLdb.connect("localhost", "root", "bzshkdk2264", "dqd", charset='utf8')
    # 使用cursor()方法获取操作游标
    return db


def player_base_info_sql(team_id, id, url, base_info, capability_data):
    sql_list = []
    base_info = base_info[1:-2].replace("\"", "\'").replace("'俱乐部': '", "").replace("', '国   籍': '", "_")
    base_info = base_info.replace("', '身   高': '", "_").replace("CM', '位   置': '", "_")
    base_info = base_info.replace("', '年   龄': '", "_").replace("岁', '体   重': '", "_")
    base_info = base_info.replace("KG', '号   码': '", "_").replace("号', '生   日': '", "_")
    base_info = base_info.replace("', '惯用脚': '", "_").replace("', '中文名': '", "_")
    base_info = base_info.replace("', '英文名': '", "_").replace("左右脚", 'NULL').replace("左脚", 'True').replace("右脚", 'False')
    base_info = base_info.replace("_____", "_NULL_NULL_NULL_NULL_").replace("____", "_NULL_NULL_NULL_").replace("___", "_NULL_NULL_").replace("__", '_NULL_')
    base_info = base_info.split("_")
    for info in base_info:
        if len(info) == 0:
            info = 'NULL'
    if len(capability_data) == 2:
        capability_data = ['NULL', 'NULL', 'NULL', 'NULL', 'NULL', 'NULL', 'NULL']
    else:
        capability_data = capability_data[10:-2].replace("', '速度': '", "_").replace("', '力量': '", "_")
        capability_data = capability_data.replace("', '防守': '", "_").replace("', '盘带': '", "_")
        capability_data = capability_data.replace("', '传球': '", "_").replace("', '射门': '", "_")
        capability_data = capability_data.replace("', '扑救': '", "_").replace("', '位置': '", "_")
        capability_data = capability_data.replace("', '开球': '", "_").replace("', '反应': '", "_")
        capability_data = capability_data.replace("', '手型': '", "_")
        capability_data = capability_data.split("_")
    sql = "INSERT INTO PLAYERBASEINFO VALUES (%s, %s, '%s', '%s', '%s', '%s', %s, %s, %s, %s, '%s', %s, " \
          "\"%s\", \"%s\", %s, %s, %s, %s, %s, %s, %s)" % (id, team_id, url, base_info[0], base_info[1], base_info[3],\
                                                       base_info[2], base_info[5], base_info[4], base_info[6],\
                                                       base_info[7], base_info[8], base_info[9], base_info[10],\
                                                       capability_data[0], capability_data[1], capability_data[2],\
                                                       capability_data[3], capability_data[4], capability_data[5],\
                                                       capability_data[6])
    return sql


def team_player_base_info_sql(league, team_id):
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
            url = row[1]
            base_info = row[2]
            capability_data = row[6]
            sql = player_base_info_sql(team_id, id, url, base_info, capability_data)
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
                sql_list = team_player_base_info_sql(league, id)
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
