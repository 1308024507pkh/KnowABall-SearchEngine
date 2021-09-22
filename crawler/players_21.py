import MySQLdb
import csv


def connectdb():
    # 打开数据库连接
    db = MySQLdb.connect("localhost", "root", "pwd", "dqd", charset='utf8')
    # 关闭数据库连接
    return db


def main():
    db = connectdb()
    cursor = db.cursor()
    league_list = ['English Premier League', 'German 1. Bundesliga', 'Spain Primera Division',
                   'Italian Serie A', 'French Ligue 1']
    filename = 'players_21.csv'
    first = True
    with open(filename, encoding='utf-8')as f:
        f_csv = csv.reader(f)
        for row in f_csv:
            if first:
                first = False
                continue
            if row[10] not in league_list:
                continue
            english_name = row[2]
            url = row[1]
            international_reputation = int(row[18])
            weak_foot = int(row[19])
            skill_moves = int(row[20])
            age = int(row[4])

            number = int(row[27])
            player_tags = row[25]
            player_tags = player_tags.replace("#", "").replace('Crosser', '传中专家').replace('Strength', '力量球员')\
                .replace('Complete Midfielder', '全能中场').replace('Aerial Threat', '空霸').replace('Distance Shooter', '远射高手')\
                .replace('Speedster', '疾速子弹').replace('Complete Defender', '全能后卫').replace('Playmaker', '进攻组织者')\
                .replace('Poacher', '偷猎者').replace('Dribbler', '盘带专家').replace('Acrobat', '花式技巧')\
                .replace('Complete Forward', '全能前锋').replace('FK Specialist', '任意球专家').replace('Tackling', '清道夫')\
                .replace('Tactician', '有创意的前场指挥官').replace('Clinical Finisher', '终结者').replace('Engine', '进攻发起者')
            player_traits = row[45]
            player_traits = player_traits.replace(" (AI)", "").replace('Injury Prone', '玻璃人').replace('Saves with Feet', '用脚扑救')\
                .replace('Power Free-Kick', '重炮手').replace('Long Throw-in', '长距离界外球').replace('Leadership', '领导力')\
                .replace('Rushes Out Of Goal', '频繁出击').replace('Power Header', '大力头球').replace('Team Player', '团队球员')\
                .replace('Giant Throw-in', '大力界外球').replace('Solid Player', '坚毅球员').replace('GK Long Throw', '掷球能手')\
                .replace('Long Shot Taker', '远射手').replace('Finesse Shot', '搓射').replace('One Club Player', '忠诚球员')\
                .replace('Flair', '天赋选手').replace('Comes For Crosses', '拦截传中').replace('Chip Shot', '挑射')\
                .replace('Cautious With Crosses', '谨慎拦截').replace('Technical Dribbler', '技术盘带')\
                .replace('Dives Into Tackles', '喜欢跳水').replace('Speed Dribbler', '高速盘带').replace('Playmaker', '大师')\
                .replace('Outside Foot Shot', '外脚背射门').replace('Long Passer', '长传手').replace('Early Crosser', '45度斜吊传中')
            sql = 'SELECT * FROM PLAYERBASEINFO WHERE ENGLISHNAME = "%s"' % english_name
            cursor.execute(sql)
            info = cursor.fetchall()
            chosen_player = None
            if len(info) == 0:
                continue
            if len(info) > 1:
                for player in info:
                    if player[9] is None:
                        continue
                    if int(player[9]) == number:
                        chosen_player = player
                        break
            else:
                chosen_player = info[0]
            if chosen_player is None:
                print(len(info), info)
                continue
            sql2 = "INSERT INTO PLAYERFIFADATA VALUES(NULL, %s, '%s', %s, %s, %s, '%s', '%s')" \
                   % (chosen_player[0], url, international_reputation, weak_foot, skill_moves, player_tags, player_traits)
            try:
                # 执行sql语句
                cursor.execute(sql2)
                # 提交到数据库执行
                db.commit()
            except:
                print(sql2)
                # 发生错误时回滚
                db.rollback()
    db.close()


def main2():
    filename = 'players_21.csv'
    first = True
    db = connectdb()
    cursor = db.cursor()
    league_list = ['English Premier League', 'German 1. Bundesliga', 'Spain Primera Division',
                   'Italian Serie A', 'French Ligue 1']
    with open(filename, encoding='utf-8')as f:
        f_csv = csv.reader(f)
        tags = set()
        for row in f_csv:
            if first:
                first = False
                continue
            if row[10] not in league_list:
                continue
            english_name = row[2]
            height = int(row[6])
            url = row[1]
            international_reputation = int(row[18])
            weak_foot = int(row[19])
            skill_moves = int(row[20])
            player_tags = row[25]
            player_traits = row[45]
            player_traits = player_traits.replace(" (AI)", "").split(", ")
            sql = 'SELECT * FROM PLAYERBASEINFO WHERE ENGLISHNAME = "%s"' % english_name
            cursor.execute(sql)
            info = cursor.fetchall()
            chosen_player = None
            if len(info) == 0:
                continue
            if len(info) > 1:
                if info[0][9] == info[1][9] and info[0][8] == info[1][8]:
                    print(info)


if __name__ == '__main__':
    main()
    # main2()
