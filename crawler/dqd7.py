import requests
from bs4 import BeautifulSoup
import json
import re
import pandas as pd

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64'
                  ') AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36',
}


def get_person_info(person_id):
    url = "https://dongqiudi.com/player/" + str(person_id) + ".html"
    response = requests.get(url, headers=headers)  # 提交请求
    if response.status_code == 200:
        response.encoding = 'utf-8'
    if response.status_code == 404:
        return None
    player_infos = {"url": url}

    soup = BeautifulSoup(response.text, 'lxml')
    player_content = soup.find(name="div", class_="player-con")
    info_left = player_content.find(name="div", class_="info-left")

    # 解析基本信息
    base_info = {}
    for item in info_left.find_all(name='li'):
        children = item.contents
        if len(children) == 2:
            base_info[children[0].string.rstrip("：")] = children[1]
        else:
            base_info[children[0].string.rstrip("：")] = ""

    china_name = info_left.find(name="p", class_="china-name")
    if china_name:
        base_info["中文名"] = china_name.contents[0]

    english_name = info_left.find(name="p", class_="en-name")
    if english_name:
        base_info["英文名"] = english_name.string
    player_infos["base_info"] = base_info

    # 解析比赛信息
    list_ = []
    player_left = player_content.find(name='div', class_='player-left')
    player_data = player_left.find(name="div", class_="player-data")
    match_data = player_data.find(name="div", class_="match-data")
    match_data_con = match_data.find(name='div', class_="league-con-wrap")
    print(match_data_con)
    try:
        table = match_data_con.div.div
        for row in table.find_all(name="p"):
            #     print(row)
            l = []
            for item in row.find_all(name="span"):
                l.append(item.string)
            list_.append(l)
    except:
        pass

    player_infos["match_data"] = list_

    return player_infos


def get_person_list(team_id):
    url = 'https://dongqiudi.com/team/' + str(team_id) + '.html'
    person_id_list = []
    response = requests.get(url, headers=headers)  # 提交请求
    if response.status_code == 200:
        response.encoding = 'utf-8'
    if response.status_code == 404:
        return None
    players = response.text.split("person_id:")
    for i in range(1, len(players)):
        person_id_list.append(int(players[i][1:9]))
    print('person_id_list for ' + str(team_id) + ": " + str(person_id_list))
    return person_id_list


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
    competition_id_list = [1, 2, 3, 4, 10]
    for competition_id in competition_id_list:
        team_id_list = get_team_list(competition_id)
        for team_id in team_id_list:
            person_id_list = get_person_list(team_id)
            person_url_list = list()
            person_match_data_list = list()
            for person_id in person_id_list:
                person_info = get_person_info(person_id)
                person_url_list.append(person_info["url"])
                person_match_data_list.append(person_info["match_data"])
            result = pd.DataFrame({
                "id": person_id_list,
                "url": person_url_list,
                "match_data": person_match_data_list
            })
            result.to_csv('person_match_data_list_' + str(competition_id) + '_' + str(team_id) + '.csv', index=False)


if __name__ == '__main__':
    main()
