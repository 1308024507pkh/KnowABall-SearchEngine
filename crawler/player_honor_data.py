import MySQLdb
import csv
import requests

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64'
                  ') AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36',
}

def connectdb():
    # 打开数据库连接
    db = MySQLdb.connect("localhost", "root", "bzshkdk2264", "dqd", charset='utf8')
    # 使用cursor()方法获取操作游标
    return db


def player_honor_data_sql(id, match_data):
    sql_list = []
    if len(match_data) == 2:
        return sql_list
    match_data = match_data[3:-4].replace("\"", "'").replace("_'], ['", "&&").replace("', '", "||")
    match_records = match_data.split("&&")
    del(match_records[0])
    for match_record in match_records:
        info = match_record.replace("~", "NULL").split("||")
        sql = "INSERT INTO PLAYERHONORRECORD VALUES(NULL, %s, \"%s\", \"%s\")" \
              % (id, info[0], info[1])
        sql_list.append(sql)
    return sql_list


def team_player_match_data_sql(league, team_id):
    print(league, team_id)
    sql_list = []
    filename = 'honor_record_list_' + str(league) + "_" + str(team_id) + '.csv'
    first = True
    with open(filename, encoding='utf-8')as f:
        f_csv = csv.reader(f)
        for row in f_csv:
            if first:
                first = False
                continue
            id = row[0]
            honor_data = row[1]
            sqls = player_honor_data_sql(id, honor_data)
            sql_list.append(sqls)
    return sql_list


def get_team_list(competition_id):
    url = 'https://dongqiudi.com/data/' + str(competition_id)
    team_id_list = []
    response = requests.get(url, headers=headers)  # 提交请求
    if response.status_code == 200:
        response.encoding = 'utf-8'
    if response.status_code == 404:
        return None
    teams = response.text.split("team_id:")
    for i in range(1, len(teams)):
        team_id_list.append(int(teams[i][1:9]))
    return team_id_list


def main():
    db = connectdb()
    cursor = db.cursor()
    league_list = [1, 2, 3, 4, 10]
    for league in league_list:
        team_list = get_team_list(league)
        for id in team_list:
            sql_list = team_player_match_data_sql(league, id)
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
